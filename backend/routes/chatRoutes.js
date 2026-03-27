const express = require('express');
const router = express.Router();
const { getMatchMessages, sendMessage } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:matchId', protect, getMatchMessages);
router.post('/', protect, sendMessage);

module.exports = router;
