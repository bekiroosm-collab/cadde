const Match = require('../models/Match');

const createMatch = async (req, res) => {
  const { title, date, location, price, maxPlayers } = req.body;

  try {
    const match = new Match({
      organizer: req.user._id,
      title,
      date,
      location,
      price,
      maxPlayers,
      players: [{ user: req.user._id }], // Organizer joins automatically
    });

    const createdMatch = await match.save();
    res.status(201).json(createdMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMatches = async (req, res) => {
  try {
    const matches = await Match.find({}).populate('organizer', 'name avatar').sort({ date: 1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id).populate('players.user', 'name position avatar rating');
    if (match) {
      res.json(match);
    } else {
      res.status(404).json({ message: 'Match not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const joinMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    if (match.status !== 'open') {
      return res.status(400).json({ message: 'Match is not open' });
    }

    const alreadyJoined = match.players.find(p => p.user.toString() === req.user._id.toString());
    if (alreadyJoined) {
      return res.status(400).json({ message: 'User already joined' });
    }

    if (match.players.length >= match.maxPlayers) {
      return res.status(400).json({ message: 'Match is full' });
    }

    match.players.push({ user: req.user._id });

    if (match.players.length >= match.maxPlayers) {
      match.status = 'full';
    }

    await match.save();
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const leaveMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    match.players = match.players.filter(p => p.user.toString() !== req.user._id.toString());

    if (match.players.length < match.maxPlayers) {
        match.status = 'open';
    }

    await match.save();
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createMatch, getMatches, getMatchById, joinMatch, leaveMatch };
