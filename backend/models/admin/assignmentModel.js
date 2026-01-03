const db = require("../../config/db");

exports.assignEvaluator = async (teamId, evaluatorId) => {
  try {
    await db.query(
      `
      INSERT INTO team_evaluator_assignments (team_id, evaluator_id)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE evaluator_id = VALUES(evaluator_id)
      `,
      [teamId, evaluatorId]
    );
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      const customError = new Error('Invalid team or evaluator ID.');
      customError.code = 'INVALID_ID';
      throw customError;
    }
    throw error;
  }
};
