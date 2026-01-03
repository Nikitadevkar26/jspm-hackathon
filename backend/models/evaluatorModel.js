const db = require("../config/db"); // mysql2 pool

exports.createEvaluator = async (data) => {
  const sql = `
    INSERT INTO evaluators (
      name, email, password, phone,
      organization, department, role,
      country, state, city,
      id_proof_image,
      resume_drive_url
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.name,
    data.email,
    data.password,
    data.phone,
    data.organization,
    data.department,
    data.role,
    data.country,
    data.state,
    data.city,
    data.id_proof_image,
    data.resume_drive_url
  ];

  try {
    return await db.execute(sql, values);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      const customError = new Error('A user with this email already exists.');
      customError.code = 'DUPLICATE_ENTRY';
      throw customError;
    }
    throw error;
  }
};

exports.findByEmail = async (email) => {
  return db.execute(
    "SELECT * FROM evaluators WHERE email = ?",
    [email]
  );
};
