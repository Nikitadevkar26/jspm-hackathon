const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/assignmentController");
const verifyAdminToken = require("../../middleware/authMiddleware");

// Apply middleware to all routes in this router
router.use(verifyAdminToken);

/* ================================
   ASSIGN / RE-ASSIGN EVALUATOR
================================ */
router.post("/", controller.assignEvaluator);

module.exports = router;
