const db = require('../../config/db');

const AdminModel = {
  async findByEmail(email) {
    const [rows] = await db.execute(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    );
    return rows[0]; // admin or undefined
  }
};

module.exports = AdminModel;
