const db = require("../../config/db");

exports.assignEvaluator = async (req, res) => {
  try {
    const { team_id, evaluator_id } = req.body;

    if (!team_id || !evaluator_id) {
      return res.status(400).json({
        message: "Team ID and Evaluator ID are required",
      });
    }

    // 🔒 Check if team already assigned
    const [[existing]] = await db.query(
      "SELECT assignment_id FROM team_evaluator_assignments WHERE team_id = ?",
      [team_id]
    );

    if (existing) {
      return res.status(409).json({
        message: "This team is already assigned to an evaluator",
      });
    }

    // ✅ Assign evaluator
    await db.query(
      `
      INSERT INTO team_evaluator_assignments (team_id, evaluator_id)
      VALUES (?, ?)
      `,
      [team_id, evaluator_id]
    );

    res.json({
      success: true,
      message: "Evaluator assigned successfully",
    });
  } catch (err) {
    console.error("ASSIGNMENT ERROR:", err);

    // Safety net (DB unique constraint)
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "This team is already assigned",
      });
    }

    res.status(500).json({
      message: "Failed to assign evaluator",
    });
  }
};