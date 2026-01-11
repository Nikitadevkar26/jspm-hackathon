const express = require("express");
const router = express.Router();

const evaluatorAuth = require("../../src/middleware/evaluatorAuthMiddleware");
const {
  getEvaluatorProfile
} = require("../../controllers/evaluator/evaluatorDashboardProfileController");

/**
 * GET /api/evaluators/profile
 */
router.get("/", evaluatorAuth, getEvaluatorProfile);

module.exports = router;
