// src/models/ideaSubmissionModel.js
const db = require("../../config/db");

const IdeaSubmission = {

  // CREATE / SUBMIT IDEA (EMAIL BASED)
  create: async (data) => {

    // 1️⃣ Resolve team from email
    const teamSql = `
      SELECT team_id, team_name
      FROM teams
      WHERE email = ?
      LIMIT 1
    `;
    const [teams] = await db.query(teamSql, [data.email]);

    if (teams.length === 0) {
      const err = new Error("Team not found");
      err.code = "TEAM_NOT_FOUND";
      throw err;
    }

    const { team_id, team_name } = teams[0];

    // 2️⃣ Insert idea
    const sql = `
      INSERT INTO idea_submission
      (team_id, team_name, title, description, summary, drive_link, github_link, youtube_link)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      team_id,
      team_name,
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

  // GET IDEA BY EMAIL (NEW)
  getByEmail: async (email) => {
    const sql = `
      SELECT i.*
      FROM idea_submission i
      JOIN teams t ON i.team_id = t.team_id
      WHERE t.email = ?
      LIMIT 1
    `;
    const [rows] = await db.query(sql, [email]);
    return rows;
  },

  // GET IDEA BY ID
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
