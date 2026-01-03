// src/models/ideaSubmissionModel.js
const db = require("../../config/db"); // mysql2 connection

const IdeaSubmission = {
  // CREATE / SUBMIT IDEA
  create: (data, callback) => {
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

    db.query(sql, values, callback);
  },

  // GET IDEA BY TEAM ID
  getByTeamId: (teamId, callback) => {
    const sql = `
      SELECT * FROM idea_submission
      WHERE team_id = ?
      LIMIT 1
    `;
    db.query(sql, [teamId], callback);
  },

  // GET IDEA BY ID (ADMIN / EVALUATOR)
  getById: (id, callback) => {
    const sql = `SELECT * FROM idea_submission WHERE id = ?`;
    db.query(sql, [id], callback);
  },

  // UPDATE IDEA
  update: (id, data, callback) => {
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

    db.query(sql, values, callback);
  }
};

module.exports = IdeaSubmission;
