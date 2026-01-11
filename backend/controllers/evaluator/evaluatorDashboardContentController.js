const dashboardModel = require("../../models/evaluator/evaluatorDashboardContentModel");

/**
 * GET Evaluator Dashboard Content (JWT BASED)
 * GET /api/evaluators/dashboard
 */
exports.getEvaluatorDashboardContent = async (req, res) => {
  try {
    const email = req.evaluator?.email;

    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const [
      profile,
      assignedTeams,
      evaluatedTeams,
      pendingTeams
    ] = await Promise.all([
      dashboardModel.getEvaluatorProfile(email),
      dashboardModel.getAssignedTeamsCount(email),
      dashboardModel.getEvaluatedTeamsCount(email),
      dashboardModel.getPendingTeamsCount(email)
    ]);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Evaluator not found"
      });
    }

    res.json({
      success: true,
      data: {
        evaluator: profile,
        stats: {
          assignedTeams,
          evaluatedTeams,
          pendingTeams
        }
      }
    });
  } catch (error) {
    console.error("Evaluator Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load evaluator dashboard"
    });
  }
};
