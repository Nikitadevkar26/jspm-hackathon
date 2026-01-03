const Assignment = require("../../models/admin/assignmentModel");

exports.assignEvaluator = async (req, res) => {
  try {
    const { team_id, evaluator_id } = req.body;

    if (!team_id || !evaluator_id) {
      return res.status(400).json({ error: "Missing team or evaluator" });
    }

    await Assignment.assignEvaluator(team_id, evaluator_id);
    res.json({ success: true });
  } catch (err) {
    console.error("ASSIGNMENT ERROR:", err);
    if (err.code === 'INVALID_ID') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Failed to assign evaluator" });
  }
};
