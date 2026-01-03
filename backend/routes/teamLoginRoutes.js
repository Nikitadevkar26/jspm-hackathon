const express = require('express');
const router = express.Router();
const teamLoginController = require('../controllers/teamLoginController');

// ✅ THIS MUST EXIST
router.post('/login', teamLoginController.teamLogin);

module.exports = router;
