const express = require('express');
const router = express.Router();
const { createTeam, getMyTeams, inviteMember } = require('../controllers/teamController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create', protect, createTeam);
router.get('/myteams', protect, getMyTeams);
router.post('/invite', protect, inviteMember);

module.exports = router;
