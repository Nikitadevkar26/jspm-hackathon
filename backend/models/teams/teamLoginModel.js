const db = require('../../config/db');

/* =================================================
   ✅ NEW: FETCH USER BY EMAIL (FOR BCRYPT COMPARE)
================================================= */
exports.findByEmail = async (email) => {
  const sql = `
    SELECT
      login_id,
      team_id,
      email,
      password,
      must_reset_password
    FROM user_logins
    WHERE email = ?
    LIMIT 1
  `;

  const [rows] = await db.query(sql, [email]);
  return rows[0]; // undefined if not found
};

/* =================================================
   ✅ UPDATE PASSWORD (HASHED) + RESET FLAG
================================================= */
exports.updatePassword = async (team_id, hashedPassword) => {
  const sql = `
    UPDATE user_logins
    SET password = ?, must_reset_password = 0
    WHERE team_id = ?
  `;

  await db.query(sql, [hashedPassword, team_id]);
};
