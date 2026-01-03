// src/controllers/ideaSubmissionController.js
const IdeaSubmission = require("../../models/idea-submission/ideaSubmissionModel");

/* ============================
   SUBMIT IDEA
============================ */
exports.submitIdea = (req, res) => {
  const {
    team_id,
    team_name,
    title,
    description,
    summary,
    drive_link,
    github_link,
    youtube_link
  } = req.body;

  if (!title || !description || !summary || !drive_link) {
    return res.status(400).json({
      message: "Required fields are missing"
    });
  }

  const ideaData = {
    team_id,
    team_name,
    title,
    description,
    summary,
    drive_link,
    github_link,
    youtube_link
  };

  IdeaSubmission.create(ideaData, (err, result) => {
    if (err) {
      console.error("Idea submission error:", err);
      return res.status(500).json({
        message: "Failed to submit idea"
      });
    }

    res.status(201).json({
      message: "Idea submitted successfully",
      ideaId: result.insertId
    });
  });
};

/* ============================
   GET IDEA BY TEAM
============================ */
exports.getIdeaByTeam = (req, res) => {
  const { teamId } = req.params;

  IdeaSubmission.getByTeamId(teamId, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Fetch failed" });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: "Idea not found" });
    }

    res.json(rows[0]);
  });
};

/* ============================
   UPDATE IDEA
============================ */
exports.updateIdea = (req, res) => {
  const { id } = req.params;

  IdeaSubmission.update(id, req.body, (err) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).json({
        message: "Failed to update idea"
      });
    }

    res.json({ message: "Idea updated successfully" });
  });
};

/* ============================
   GET IDEA BY ID (ADMIN)
============================ */
exports.getIdeaById = (req, res) => {
  const { id } = req.params;

  IdeaSubmission.getById(id, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Fetch failed" });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: "Idea not found" });
    }

    res.json(rows[0]);
  });
};
