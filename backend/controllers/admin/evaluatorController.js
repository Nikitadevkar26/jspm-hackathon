const Evaluator = require("../../models/admin/evaluatorModel");

/* ================================
   GET ALL EVALUATORS
================================ */
exports.getAllEvaluators = async (req, res) => {
  try {
    const data = await Evaluator.getAll();
    res.json(data);
  } catch (err) {
    console.error("GET ALL EVALUATORS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch evaluators" });
  }
};

/* ================================
   GET SINGLE EVALUATOR
================================ */
exports.getEvaluatorById = async (req, res) => {
  try {
    const evaluator = await Evaluator.getById(req.params.id);

    if (!evaluator) {
      return res.status(404).json({ error: "Evaluator not found" });
    }

    res.json(evaluator);
  } catch (err) {
    console.error("GET EVALUATOR ERROR:", err);
    res.status(500).json({ error: "Failed to fetch evaluator" });
  }
};

/* ================================
   UPDATE EVALUATOR STATUS
   Approved / Rejected
================================ */
exports.updateEvaluatorStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const evaluatorId = req.params.id;

    // 🔒 Validate input
    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // 🔍 Check evaluator exists
    const evaluator = await Evaluator.getById(evaluatorId);
    if (!evaluator) {
      return res.status(404).json({ error: "Evaluator not found" });
    }

    // ✅ Update DB
    await Evaluator.updateStatus(evaluatorId, status);

    res.json({
      success: true,
      message: `Evaluator ${status.toLowerCase()} successfully`,
    });
  } catch (err) {
    console.error("STATUS UPDATE ERROR:", err);
    res.status(500).json({ error: "Status update failed" });
  }
};
