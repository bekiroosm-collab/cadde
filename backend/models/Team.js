const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  badge: {
    type: String, // URL to badge image
    default: '',
  },
}, {
  timestamps: true,
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
