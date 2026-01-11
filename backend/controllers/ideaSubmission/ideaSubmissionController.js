// src/controllers/ideaSubmissionController.js
const IdeaSubmission = require("../../models/ideaSubmission/ideaSubmissionModel");

/* ============================
   SUBMIT IDEA (ONE TIME ONLY)
 ============================ */
// exports.submitIdea = async (req, res) => {
//   try {
//     const {
//       team_id,
//       team_name,
//       title,
//       description,
//       summary,
//       drive_link,
//       github_link,
//       youtube_link
//     } = req.body;

//     // 🔒 Basic validation
//     if (!team_id || !title || !description || !summary || !drive_link) {
//       return res.status(400).json({
//         message: "Required fields are missing"
//       });
//     }

//     const ideaData = {
//       team_id,
//       team_name,
//       title,
//       description,
//       summary,
//       drive_link,
//       github_link: github_link || null,
//       youtube_link: youtube_link || null
//     };

//     const result = await IdeaSubmission.create(ideaData);

//     return res.status(201).json({
//       success: true,
//       message: "Idea submitted successfully",
//       ideaId: result.insertId
//     });

//   } catch (err) {

//     // ✅ HANDLE DUPLICATE SUBMISSION (DB ENFORCED)
//     if (err.code === "ER_DUP_ENTRY") {
//       return res.status(409).json({
//         success: false,
//         message: "Idea already submitted for this team"
//       });
//     }

//     console.error("Idea submission error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to submit idea"
//     });
//   }
// };

exports.submitIdea = async (req, res) => {
  try {
    const {
      email,
      title,
      description,
      summary,
      drive_link,
      github_link,
      youtube_link,
    } = req.body;

    if (!email || !title || !description || !summary || !drive_link) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const ideaData = {
      email,
      title,
      description,
      summary,
      drive_link,
      github_link,
      youtube_link,
    };

    const result = await IdeaSubmission.create(ideaData);

    return res.status(201).json({
      success: true,
      message: "Idea submitted successfully",
      ideaId: result.insertId,
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Idea already submitted for this team",
      });
    }

    if (err.code === "TEAM_NOT_FOUND") {
      return res.status(400).json({
        message: "Team registration not found",
      });
    }

    console.error("Idea submission error:", err);
    res.status(500).json({
      message: "Failed to submit idea",
    });
  }
};

/* ============================
   GET IDEA BY TEAM
 ============================ */
// exports.getIdeaByTeam = async (req, res) => {
//   try {
//     const { teamId } = req.params;
//     const rows = await IdeaSubmission.getByTeamId(teamId);

//     // ✅ No idea submitted yet
//     if (rows.length === 0) {
//       return res.status(200).json({
//         submitted: false
//       });
//     }

//     // ✅ Idea already submitted
//     return res.status(200).json({
//       submitted: true,
//       idea: rows[0]
//     });

//   } catch (err) {
//     console.error("Fetch failed:", err);
//     res.status(500).json({
//       message: "Fetch failed"
//     });
//   }
// };

exports.getIdeaByTeam = async (req, res) => {
  try {
    const { email } = req.params;
    const rows = await IdeaSubmission.getByEmail(email);

    if (rows.length === 0) {
      return res.json({ submitted: false });
    }

    res.json({
      submitted: true,
      idea: rows[0],
    });
  } catch (err) {
    console.error(err);
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
      message: "Failed to update idea",
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
