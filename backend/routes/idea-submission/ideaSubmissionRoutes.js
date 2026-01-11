// src/routes/ideaSubmissionRoutes.js
const express = require("express");
const router = express.Router();

const ideaSubmissionController = require(
  "../../controllers/ideaSubmission/ideaSubmissionController"
);

/* ================================
   SUBMIT IDEA
   POST /api/idea-submission
   Body expects: email, title, description, summary, drive_link, etc.
================================ */
router.post("/", ideaSubmissionController.submitIdea);

/* ================================
   GET IDEA BY TEAM (EMAIL BASED)
   GET /api/idea-submission/team/:email
================================ */
router.get(
  "/team/:email",
  ideaSubmissionController.getIdeaByTeam
);

/* ================================
   GET IDEA BY ID (ADMIN / EVALUATOR)
   GET /api/idea-submission/:id
================================ */
router.get(
  "/:id",
  ideaSubmissionController.getIdeaById
);

/* ================================
   UPDATE IDEA
   PUT /api/idea-submission/:id
================================ */
router.put(
  "/:id",
  ideaSubmissionController.updateIdea
);

module.exports = router;
