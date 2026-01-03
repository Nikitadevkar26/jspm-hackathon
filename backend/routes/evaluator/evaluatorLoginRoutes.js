const express = require("express");
const router = express.Router();
const controller = require("../../controllers/evaluator/evaluatorLoginController");

/* ===============================
   EVALUATOR LOGIN ROUTE
================================ */
router.post("/login", controller.loginEvaluator);

module.exports = router;
