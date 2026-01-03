// backend/controllers/teamDetailController.js
const TeamDetailModel = require("../models/teamDetailModel");

exports.getTeamProfile = async (req, res) => {
  try {
    const { teamId } = req.params;

    if (!teamId) {
      return res.status(400).json({ message: "Team ID is required" });
    }

    const team = await TeamDetailModel.getTeamById(teamId);
    const members = await TeamDetailModel.getTeamMembers(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json({
      team,
      members,
      totalMembers: members.length
    });
  } catch (error) {
    console.error("Team profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
