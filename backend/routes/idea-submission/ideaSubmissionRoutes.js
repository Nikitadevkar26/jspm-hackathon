// src/routes/ideaSubmissionRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../../controllers/idea-submission/ideaSubmissionController");

/* ================================
   SUBMIT IDEA
   POST /api/idea-submission
================================ */
router.post("/", controller.submitIdea);

/* ================================
   GET IDEA BY TEAM
   GET /api/idea-submission/team/:teamId
================================ */
router.get("/team/:teamId", controller.getIdeaByTeam);

/* ================================
   GET IDEA BY ID (ADMIN)
   GET /api/idea-submission/:id
================================ */
router.get("/:id", controller.getIdeaById);

/* ================================
   UPDATE IDEA
   PUT /api/idea-submission/:id
================================ */
router.put("/:id", controller.updateIdea);

module.exports = router;
