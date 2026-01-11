const express = require("express");
const router = express.Router();

const evaluatorAuth = require("../../src/middleware/evaluatorAuthMiddleware");
const {
  getEvaluatorDashboardContent
} = require("../../controllers/evaluator/evaluatorDashboardContentController");

/**
 * GET /api/evaluators/dashboard
 */
router.get("/dashboard", evaluatorAuth, getEvaluatorDashboardContent);

module.exports = router;
