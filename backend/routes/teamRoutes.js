const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const upload = require('../middleware/upload');

// @route   POST /api/teams/register
// @desc    Register a team with members + upload images
// @access  Public
router.post(
  '/register',
  upload.fields([
    { name: 'paymentProof', maxCount: 1 },
    { name: 'idProofs', maxCount: 10 }
  ]),
  teamController.submitRegistration
);

module.exports = router;
