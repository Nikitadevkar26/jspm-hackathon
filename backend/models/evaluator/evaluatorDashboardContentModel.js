const pool = require("../../config/db");

/**
 * Get evaluator basic profile (by email)
 */
exports.getEvaluatorProfile = async (email) => {
  const [rows] = await pool.query(
    `SELECT 
        evaluator_id,
        name,
        email,
        organization,
        department,
        role,
        country,
        state,
        city
     FROM evaluators
     WHERE email = ?`,
    [email]
  );

  return rows[0];
};

/**
 * Get assigned teams count (by email)
 */
exports.getAssignedTeamsCount = async (email) => {
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS total
     FROM team_evaluator_assignments tea
     JOIN evaluators e 
       ON tea.evaluator_id = e.evaluator_id
     WHERE e.email = ?`,
    [email]
  );

  return rows[0].total;
};

/**
 * Get evaluated teams count (by email)
 */
exports.getEvaluatedTeamsCount = async (email) => {
  const [rows] = await pool.query(
    `SELECT COUNT(DISTINCT t.team_id) AS total
     FROM team_evaluator_assignments tea
     JOIN evaluators e 
       ON tea.evaluator_id = e.evaluator_id
     JOIN teams t 
       ON tea.team_id = t.team_id
     WHERE e.email = ?
       AND (t.score IS NOT NULL OR t.status IN ('approved','rejected'))`,
    [email]
  );

  return rows[0].total;
};

/**
 * Get pending teams count (by email)
 */
exports.getPendingTeamsCount = async (email) => {
  const [rows] = await pool.query(
    `SELECT COUNT(DISTINCT t.team_id) AS total
     FROM team_evaluator_assignments tea
     JOIN evaluators e 
       ON tea.evaluator_id = e.evaluator_id
     JOIN teams t 
       ON tea.team_id = t.team_id
     WHERE e.email = ?
       AND t.score IS NULL
       AND t.status = 'Pending'`,
    [email]
  );

  return rows[0].total;
};
