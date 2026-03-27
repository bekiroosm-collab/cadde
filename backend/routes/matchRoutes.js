const express = require('express');
const router = express.Router();
const { createMatch, getMatches, getMatchById, joinMatch, leaveMatch } = require('../controllers/matchController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getMatches)
  .post(protect, createMatch);

router.route('/:id')
  .get(getMatchById);

router.route('/:id/join')
  .post(protect, joinMatch);

router.route('/:id/leave')
  .post(protect, leaveMatch);

module.exports = router;
