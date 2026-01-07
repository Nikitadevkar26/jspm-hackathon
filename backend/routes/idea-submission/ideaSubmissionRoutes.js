// src/routes/ideaSubmissionRoutes.js
const express = require("express");
const router = express.Router();
const ideaSubmissionController = require("../../controllers/ideaSubmission/ideaSubmissionController");

/* ================================
   SUBMIT IDEA
   POST /api/idea-submission
================================ */
router.post("/", ideaSubmissionController.submitIdea);

/* ================================
   GET IDEA BY TEAM
   GET /api/idea-submission/team/:teamId
================================ */
router.get("/team/:teamId", ideaSubmissionController.getIdeaByTeam);

/* ================================
   GET IDEA BY ID (ADMIN)
   GET /api/idea-submission/:id
================================ */
router.get("/:id", ideaSubmissionController.getIdeaById);

/* ================================
   UPDATE IDEA
   PUT /api/idea-submission/:id
================================ */
router.put("/:id", ideaSubmissionController.updateIdea);

module.exports = router;
