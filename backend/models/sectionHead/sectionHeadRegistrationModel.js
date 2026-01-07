const db = require("../../config/db"); // adjust path if needed
const bcrypt = require("bcryptjs");

const SectionHead = {
  create: async ({ name, email, password }) => {
    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO section_heads 
      (name, email, password)
      VALUES (?, ?, ?)
    `;

    const values = [
      name,
      email,
      hashedPassword
      // status intentionally NOT passed (default Active)
    ];

    return db.execute(query, values);
  },

  findByEmail: async (email) => {
    const query = `SELECT * FROM section_heads WHERE email = ?`;
    return db.execute(query, [email]);
  }
};

module.exports = SectionHead;
