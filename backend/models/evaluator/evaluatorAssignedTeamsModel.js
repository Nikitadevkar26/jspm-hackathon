const pool = require("../../config/db");

/**
 * Get all teams assigned to an evaluator (by email)
 */
exports.getAssignedTeamsByEmail = async (email) => {
  const [rows] = await pool.query(
    `
    SELECT
      t.team_id,
      t.team_name,
      t.leader_name,
      t.project_title,
      t.theme,
      t.status,
      t.score,
      t.created_at,
      tea.assigned_at
    FROM team_evaluator_assignments tea
    JOIN evaluators e
      ON tea.evaluator_id = e.evaluator_id
    JOIN teams t
      ON tea.team_id = t.team_id
    WHERE e.email = ?
    ORDER BY tea.assigned_at DESC
    `,
    [email]
  );

  return rows;
};
