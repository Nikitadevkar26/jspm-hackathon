const pool = require("../../config/db");

/**
 * Get evaluator by email
 */
exports.findByEmail = async (email) => {
  const [rows] = await pool.execute(
    "SELECT * FROM evaluators WHERE email = ? LIMIT 1",
    [email]
  );

  return rows.length ? rows[0] : null;
};
