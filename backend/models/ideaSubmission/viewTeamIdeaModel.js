const db = require("../../config/db");

const ViewTeamISModel = {

  // Get all idea submissions
  getAll: async () => {
    const query = `
    SELECT
  i.id,
  i.team_id,
  t.team_name,
  i.title,
  i.description,
  i.summary,
  i.drive_link,
  i.github_link,
  i.youtube_link,
  i.submission_status,
  i.submitted_at,
  i.updated_at
FROM idea_submission i
JOIN teams t ON t.team_id = i.team_id
ORDER BY i.submitted_at DESC

  `;
    return db.execute(query);
  },


  // Get single idea submission by ID
  getById: async (id) => {
    const query = `
      SELECT *
      FROM idea_submission
      WHERE id = ?
    `;
    return db.execute(query, [id]);
  },

  // Update submission status
  updateStatus: async (id, status) => {
    const query = `
      UPDATE idea_submission
      SET submission_status = ?
      WHERE id = ?
    `;
    return db.execute(query, [status, id]);
  }
};

module.exports = ViewTeamISModel;
