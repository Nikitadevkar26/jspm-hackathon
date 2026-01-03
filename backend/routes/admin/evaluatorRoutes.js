const express = require("express");
const router = express.Router();

const evaluatorController = require("../../controllers/admin/evaluatorController");
const sendEvaluatorEmail = require("../../controllers/admin/evaluatorEmailController");
const verifyAdminToken = require("../../middleware/authMiddleware");

// Apply middleware to all routes in this router
router.use(verifyAdminToken);

/* ================================
   GET ALL EVALUATORS
================================ */
router.get("/", evaluatorController.getAllEvaluators);

/* ================================
   GET SINGLE EVALUATOR
================================ */
router.get("/:id", evaluatorController.getEvaluatorById);

/* ================================
   UPDATE EVALUATOR STATUS
================================ */
router.put("/:id/status", evaluatorController.updateEvaluatorStatus);

/* ================================
   SEND EVALUATOR EMAIL ✅ FIXED
================================ */
router.post("/:id/send-email", sendEvaluatorEmail);

module.exports = router;
