// backend/routes/teamDetailRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../../controllers/teams/teamDetailController");

// Route to get team profile by teamId

router.get("/:teamId", controller.getTeamProfile);

module.exports = router;
