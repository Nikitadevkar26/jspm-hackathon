const db = require('../config/db');

exports.findByEmail = async (email) => {
  const sql = `
    SELECT login_id, team_id, email, password
    FROM user_logins
    WHERE email = ?
    LIMIT 1
  `;

  const [rows] = await db.query(sql, [email]);
  return rows[0]; // undefined if not found
};
