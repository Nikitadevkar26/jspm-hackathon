// src/models/ideaSubmissionModel.js
const db = require("../../config/db"); // mysql2 connection

const IdeaSubmission = {
  // CREATE / SUBMIT IDEA
  create: async (data) => {
    const sql = `
      INSERT INTO idea_submission
      (team_id, team_name, title, description, summary, drive_link, github_link, youtube_link)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.team_id,
      data.team_name,
      data.title,
      data.description,
      data.summary,
      data.drive_link,
      data.github_link || null,
      data.youtube_link || null
    ];

    const [result] = await db.query(sql, values);
    return result;
  },

  // GET IDEA BY TEAM ID
  getByTeamId: async (teamId) => {
    const sql = `
      SELECT * FROM idea_submission
      WHERE team_id = ?
      LIMIT 1
    `;
    const [rows] = await db.query(sql, [teamId]);
    return rows;
  },

  // GET IDEA BY ID (ADMIN / EVALUATOR)
  getById: async (id) => {
    const sql = `SELECT * FROM idea_submission WHERE id = ?`;
    const [rows] = await db.query(sql, [id]);
    return rows;
  },

  // UPDATE IDEA
  update: async (id, data) => {
    const sql = `
      UPDATE idea_submission
      SET
        title = ?,
        description = ?,
        summary = ?,
        drive_link = ?,
        github_link = ?,
        youtube_link = ?
      WHERE id = ?
    `;

    const values = [
      data.title,
      data.description,
      data.summary,
      data.drive_link,
      data.github_link || null,
      data.youtube_link || null,
      id
    ];

    const [result] = await db.query(sql, values);
    return result;
  }
};

module.exports = IdeaSubmission;
