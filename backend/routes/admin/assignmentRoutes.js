const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/assignmentController");

/* ================================
   ASSIGN / RE-ASSIGN EVALUATOR
================================ */
router.post("/", controller.assignEvaluator);

module.exports = router;
