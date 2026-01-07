const express = require('express');
const router = express.Router();
const teamLoginController = require('../../controllers/teams/teamLoginController');
const setPasswordController = require('../../controllers/teams/setPasswordController');

// ✅ THIS MUST EXIST
router.put('/set-password', setPasswordController.setPassword);

// ✅ THIS MUST EXIST
router.post('/login', teamLoginController.teamLogin);

module.exports = router;
