const model = require("../../models/evaluator/evaluatorScoringTeamsModel");

/* ---------------- GET SCORING DETAILS ---------------- */
exports.getScoringDetails = async (req, res) => {
  try {
    const { teamId } = req.query;
    const evaluatorEmail = req.user.email;

    if (!teamId) {
      return res.status(400).json({ message: "teamId required" });
    }

    const evaluatorId = await model.getEvaluatorIdByEmail(evaluatorEmail);
    if (!evaluatorId) {
      return res.status(404).json({ message: "Evaluator not found" });
    }

    const data = await model.getScoringDetails(teamId, evaluatorId);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load scoring details" });
  }
};

/* ---------------- SUBMIT SCORE ---------------- */
exports.submitScore = async (req, res) => {
  try {
    const evaluatorEmail = req.user.email;
    const {
      teamId,
      novelty,
      clarity,
      feasibility,
      impact,
      future,
      total_score,
      comments
    } = req.body;

    const evaluatorId = await model.getEvaluatorIdByEmail(evaluatorEmail);
    if (!evaluatorId) {
      return res.status(404).json({ message: "Evaluator not found" });
    }

    await model.submitScore(
      evaluatorId,
      teamId,
      novelty,
      clarity,
      feasibility,
      impact,
      future,
      total_score,
      comments
    );

    res.json({ success: true });
  } catch (err) {
    if (err.message === "ALREADY_EVALUATED") {
      return res.status(403).json({
        message: "This team has already been evaluated and cannot be re-evaluated."
      });
    }

    console.error(err);
    res.status(500).json({ message: "Failed to submit score" });
  }
};
