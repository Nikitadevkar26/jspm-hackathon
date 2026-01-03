// backend/routes/teamDetailRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/teamDetailController");

router.get("/:teamId", controller.getTeamProfile);

module.exports = router;
