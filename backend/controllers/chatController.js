const Chat = require('../models/Chat');

const getMatchMessages = async (req, res) => {
  try {
    const messages = await Chat.find({ match: req.params.matchId })
      .populate('user', 'name avatar')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendMessage = async (req, res) => {
  const { matchId, message } = req.body;
  try {
    const chat = await Chat.create({
      match: matchId,
      user: req.user._id,
      message,
    });

    const fullChat = await Chat.findById(chat._id).populate('user', 'name avatar');

    const io = req.app.get('io');
    io.to(matchId).emit('newMessage', fullChat);

    res.status(201).json(fullChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMatchMessages, sendMessage };
