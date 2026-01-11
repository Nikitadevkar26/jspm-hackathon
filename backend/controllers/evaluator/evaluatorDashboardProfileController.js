const evaluatorProfileModel = require("../../models/evaluator/evaluatorDashboardProfileModel");

/**
 * Get logged-in evaluator profile (by email)
 */
const getEvaluatorProfile = async (req, res) => {
  try {
    // email injected by evaluatorAuthMiddleware
    const email = req.evaluator.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Evaluator email not found in token"
      });
    }

    const profile =
      await evaluatorProfileModel.getEvaluatorProfileByEmail(email);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Evaluator profile not found"
      });
    }

    res.status(200).json({
      success: true,
      data: profile
    });

  } catch (error) {
    console.error("Evaluator Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch evaluator profile",
      error: error.message
    });
  }
};

module.exports = {
  getEvaluatorProfile
};
