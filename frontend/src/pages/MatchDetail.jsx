import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { MapPin, Calendar, Clock, DollarSign, UserPlus, UserMinus, Shield } from 'lucide-react';
import Chat from '../components/Chat';

const MatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMatch = async () => {
    try {
      const res = await axios.get(`/match/${id}`);
      setMatch(res.data);
    } catch (error) {
      console.error("Error fetching match", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatch();
  }, [id]);

  const handleJoin = async () => {
    try {
        await axios.post(`/match/${id}/join`);
        fetchMatch(); // Refresh data
    } catch (error) {
        alert(error.response?.data?.message || "Error joining match");
    }
  };

  const handleLeave = async () => {
    try {
        await axios.post(`/match/${id}/leave`);
        fetchMatch();
    } catch (error) {
        alert(error.response?.data?.message || "Error leaving match");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!match) return <div className="p-4">Match not found</div>;

  const isJoined = match.players.some(p => p.user?._id === user._id);
  const isFull = match.status === 'full';
  const matchDate = new Date(match.date);

  return (
    <div className="p-4 pt-6 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">{match.title}</h1>
        <div className="flex flex-col gap-2 text-sm text-gray-400">
            <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                {matchDate.toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary" />
                {matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                {match.location.name}
            </div>
             <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-secondary" />
                <span className="text-secondary font-bold">{match.price}₺ per person</span>
            </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
             <h3 className="font-bold text-lg">Squad ({match.players.length}/{match.maxPlayers})</h3>
             {isJoined ? (
                 <button onClick={handleLeave} className="text-xs bg-red-500/10 text-red-500 px-3 py-1 rounded-full border border-red-500/20 flex items-center gap-1">
                     <UserMinus size={12} /> Leave
                 </button>
             ) : (
                 !isFull && (
                    <button onClick={handleJoin} className="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full border border-secondary/20 flex items-center gap-1">
                        <UserPlus size={12} /> Join
                    </button>
                 )
             )}
        </div>

        <div className="grid grid-cols-4 gap-3">
            {match.players.map((p, i) => (
                <div key={i} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden border border-gray-700 mb-1">
                         {p.user?.avatar ? <img src={p.user.avatar} className="w-full h-full" /> : <div className="w-full h-full flex items-center justify-center text-gray-500"><Shield size={20} /></div>}
                    </div>
                    <span className="text-xs text-center text-gray-300 truncate w-full">{p.user?.name}</span>
                    <span className="text-[10px] text-gray-500">{p.user?.position}</span>
                </div>
            ))}
            {[...Array(match.maxPlayers - match.players.length)].map((_, i) => (
                <div key={`empty-${i}`} className="flex flex-col items-center opacity-30">
                     <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-600 mb-1"></div>
                     <span className="text-xs text-gray-500">Empty</span>
                </div>
            ))}
        </div>
      </div>

      {/* Chat Section */}
      {isJoined && (
          <div className="mt-8">
              <h3 className="font-bold text-lg mb-3">Team Chat</h3>
              <Chat matchId={match._id} />
          </div>
      )}
    </div>
  );
};

export default MatchDetail;
