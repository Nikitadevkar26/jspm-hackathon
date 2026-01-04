// src/controllers/ideaSubmissionController.js
const IdeaSubmission = require("../../models/idea-submission/ideaSubmissionModel");

/* ============================
   SUBMIT IDEA
 ============================ */
exports.submitIdea = async (req, res) => {
  try {
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

    const result = await IdeaSubmission.create(ideaData);

    res.status(201).json({
      message: "Idea submitted successfully",
      ideaId: result.insertId
    });
  } catch (err) {
    console.error("Idea submission error:", err);
    res.status(500).json({
      message: "Failed to submit idea"
    });
  }
};

/* ============================
   GET IDEA BY TEAM
 ============================ */
exports.getIdeaByTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const rows = await IdeaSubmission.getByTeamId(teamId);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Idea not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Fetch failed:", err);
    res.status(500).json({ message: "Fetch failed" });
  }
};

/* ============================
   UPDATE IDEA
 ============================ */
exports.updateIdea = async (req, res) => {
  try {
    const { id } = req.params;
    await IdeaSubmission.update(id, req.body);
    res.json({ message: "Idea updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({
      message: "Failed to update idea"
    });
  }
};

/* ============================
   GET IDEA BY ID (ADMIN)
 ============================ */
exports.getIdeaById = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await IdeaSubmission.getById(id);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Idea not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Fetch failed:", err);
    res.status(500).json({ message: "Fetch failed" });
  }
};
