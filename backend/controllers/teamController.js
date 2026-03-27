const Team = require('../models/Team');

const createTeam = async (req, res) => {
  const { name, badge } = req.body;

  try {
    const teamExists = await Team.findOne({ name });
    if (teamExists) {
      return res.status(400).json({ message: 'Team name already taken' });
    }

    const team = await Team.create({
      name,
      captain: req.user._id,
      members: [req.user._id],
      badge,
    });

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyTeams = async (req, res) => {
  try {
    const teams = await Team.find({ members: req.user._id });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const inviteMember = async (req, res) => {
    // Simplified invite: just add member by ID for now
    const { teamId, userId } = req.body;
    try {
        const team = await Team.findById(teamId);
        if(!team) return res.status(404).json({message: 'Team not found'});

        if(team.captain.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: 'Only captain can invite'});
        }

        if(!team.members.includes(userId)) {
            team.members.push(userId);
            await team.save();
        }
        res.json(team);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = { createTeam, getMyTeams, inviteMember };
