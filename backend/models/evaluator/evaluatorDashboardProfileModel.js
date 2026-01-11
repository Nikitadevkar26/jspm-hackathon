const pool = require("../../config/db");

/**
 * Get evaluator profile by email
 */
const getEvaluatorProfileByEmail = async (email) => {
  const [rows] = await pool.execute(
    `
    SELECT 
      evaluator_id,
      name,
      email,
      phone,
      organization,
      department,
      role,
      country,
      state,
      city,
      id_proof_image,
      resume_drive_url,
      github_profile_url,
      youtube_channel_url,
      profile_image,
      resume_file,
      status,
      created_at,
      approved_at
    FROM evaluators
    WHERE email = ?
    LIMIT 1
    `,
    [email]
  );

  return rows[0];
};

module.exports = {
  getEvaluatorProfileByEmail
};
