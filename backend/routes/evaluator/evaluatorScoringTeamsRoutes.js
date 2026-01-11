const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authMiddleware");
const controller = require("../../controllers/evaluator/evaluatorScoringTeamsController");

router.get("/scoring-details", auth, controller.getScoringDetails);
router.post("/submit-score", auth, controller.submitScore);

module.exports = router;
