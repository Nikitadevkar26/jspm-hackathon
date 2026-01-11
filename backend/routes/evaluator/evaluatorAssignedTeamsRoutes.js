const express = require("express");
const router = express.Router();

const evaluatorAuth = require("../../src/middleware/evaluatorAuthMiddleware");
const {
  getAssignedTeams
} = require("../../controllers/evaluator/evaluatorAssignedTeamsController");

/**
 * GET /api/evaluators/assigned-teams
 */
router.get(
  "/assigned-teams",
  evaluatorAuth,
  getAssignedTeams
);

module.exports = router;
