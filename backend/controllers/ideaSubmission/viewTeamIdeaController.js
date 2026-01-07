const ViewTeamISModel = require("../../models/ideaSubmission/viewTeamIdeaModel");

exports.getAllIdeas = async (req, res) => {
  try {
    const [rows] = await ViewTeamISModel.getAll();
    res.json(rows);
  } catch (error) {
    console.error("Get All Ideas Error:", error);
    res.status(500).json({ message: "Failed to fetch ideas" });
  }
};

exports.getIdeaById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await ViewTeamISModel.getById(id);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Idea not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Get Idea By ID Error:", error);
    res.status(500).json({ message: "Failed to fetch idea details" });
  }
};

exports.updateIdeaStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await ViewTeamISModel.updateStatus(id, status);

    res.json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};
