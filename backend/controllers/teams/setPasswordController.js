const bcrypt = require("bcrypt");
const TeamLoginModel = require("../../models/teams/teamLoginModel");

exports.setPassword = async (req, res) => {
  const { team_id, password } = req.body;

  if (!team_id || !password) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await TeamLoginModel.updatePassword(team_id, hashedPassword);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update password" });
  }
};
