const express = require('express');
const router = express.Router();
const teamRegistrationController = require('../../controllers/teams/teamRegistrationController');
const upload = require('../../middleware/upload');

// @route   POST /api/teams/register
// @desc    Register a team with members + upload images
// @access  Public
router.post(
  '/register',
  upload.fields([
    { name: 'paymentProof', maxCount: 1 },
    { name: 'idProofs', maxCount: 10 }
  ]),
  teamRegistrationController.submitRegistration
);

module.exports = router;
