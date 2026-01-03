const db = require("../../config/db");

exports.getAll = async () => {
  const [rows] = await db.query(`
    SELECT evaluator_id, name, email, status, created_at
    FROM evaluators
    ORDER BY created_at DESC
  `);
  return rows;
};

exports.getById = async (id) => {
  const [[row]] = await db.query(
    "SELECT * FROM evaluators WHERE evaluator_id = ?",
    [id]
  );
  return row;
};

exports.updateStatus = async (id, status) => {
  await db.query(
    "UPDATE evaluators SET status = ? WHERE evaluator_id = ?",
    [status, id]
  );
};
