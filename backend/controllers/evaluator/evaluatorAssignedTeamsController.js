const AssignedTeamsModel = require(
  "../../models/evaluator/evaluatorAssignedTeamsModel"
);

/**
 * GET Assigned Teams for Logged-in Evaluator
 * GET /api/evaluators/assigned-teams
 */
exports.getAssignedTeams = async (req, res) => {
  try {
    const email = req.evaluator?.email;

    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const teams = await AssignedTeamsModel.getAssignedTeamsByEmail(email);

    return res.status(200).json({
      success: true,
      count: teams.length,
      data: teams
    });

  } catch (error) {
    console.error("Assigned Teams Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch assigned teams",
      error: error.message
    });
  }
};
