import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Send } from 'lucide-react';
import io from 'socket.io-client';
import axios from 'axios';

const Chat = ({ matchId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Connect to socket
    const SOCKET_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
    socketRef.current = io(SOCKET_URL);

    socketRef.current.emit('joinMatch', matchId);

    socketRef.current.on('newMessage', (message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    });

    // Fetch initial messages
    const fetchMessages = async () => {
        try {
            const res = await axios.get(`/chat/${matchId}`);
            setMessages(res.data);
            scrollToBottom();
        } catch (error) {
            console.error("Error fetching messages", error);
        }
    };
    fetchMessages();

    return () => {
      socketRef.current.emit('leaveMatch', matchId);
      socketRef.current.disconnect();
    };
  }, [matchId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
        // Send to API (which will emit socket event)
        await axios.post('/chat', { matchId, message: newMessage });
        setNewMessage('');
    } catch (error) {
        console.error("Failed to send message", error);
    }
  };

  return (
    <div className="flex flex-col h-[400px] bg-dark border border-gray-800 rounded-xl overflow-hidden">
      <div className="p-3 bg-black/50 border-b border-gray-800">
        <h3 className="font-semibold text-sm text-gray-300">Match Chat</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {messages.map((msg, index) => {
            const isMe = msg.user._id === user._id;
            return (
                <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] p-3 rounded-xl text-sm ${
                        isMe
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-gray-800 text-gray-200 rounded-tl-none'
                    }`}>
                        {!isMe && <div className="text-xs text-primary mb-1">{msg.user.name}</div>}
                        {msg.message}
                    </div>
                </div>
            )
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 bg-black/50 border-t border-gray-800 flex gap-2">
        <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
        />
        <button type="submit" className="p-2 bg-primary text-white rounded-lg hover:bg-purple-700">
            <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
