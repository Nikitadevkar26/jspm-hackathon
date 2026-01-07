// backend/models/teamDetailModel.js
const pool = require("../../config/db");

exports.getTeamById = async (teamId) => {
  const [rows] = await pool.query(
    "SELECT * FROM teams WHERE team_id = ?",
    [teamId]
  );
  return rows[0];
};

exports.getTeamMembers = async (teamId) => {
  const [rows] = await pool.query(
    "SELECT * FROM team_members WHERE team_id = ?",
    [teamId]
  );
  return rows;
};
