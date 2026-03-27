const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    name: { type: String, required: true },
    lat: { type: Number },
    lng: { type: Number },
  },
  price: {
    type: Number,
    required: true,
  },
  maxPlayers: {
    type: Number,
    required: true,
    default: 14,
  },
  players: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['confirmed', 'pending'], default: 'confirmed' },
    joinedAt: { type: Date, default: Date.now }
  }],
  status: {
    type: String,
    enum: ['open', 'full', 'completed', 'cancelled'],
    default: 'open',
  },
}, {
  timestamps: true,
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
