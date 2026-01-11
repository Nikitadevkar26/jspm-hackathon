const pool = require("../../config/db");

/* ---------------- GET EVALUATOR ID ---------------- */
exports.getEvaluatorIdByEmail = async (email) => {
  const [rows] = await pool.execute(
    "SELECT evaluator_id FROM evaluators WHERE email = ? LIMIT 1",
    [email]
  );
  return rows.length ? rows[0].evaluator_id : null;
};

/* ---------------- GET SCORING DETAILS ---------------- */
exports.getScoringDetails = async (teamId, evaluatorId) => {
  // 1️⃣ Team basic info
  const [[team]] = await pool.execute(
    `SELECT team_id, team_name, project_title
     FROM teams
     WHERE team_id = ?`,
    [teamId]
  );

  // 2️⃣ Idea submission details
  const [[idea]] = await pool.execute(
    `SELECT title, description, summary, drive_link, github_link, youtube_link
     FROM idea_submission
     WHERE team_id = ?`,
    [teamId]
  );

  // 3️⃣ Existing score (if any)
  const [[existingScore]] = await pool.execute(
    `SELECT novelty, clarity, feasibility, impact, future_scope, comments
     FROM evaluation_scores
     WHERE team_id = ? AND evaluator_id = ?`,
    [teamId, evaluatorId]
  );

  return {
    team,
    idea: idea || null,
    existingScore: existingScore
      ? {
          novelty: existingScore.novelty,
          clarity: existingScore.clarity,
          feasibility: existingScore.feasibility,
          impact: existingScore.impact,
          future: existingScore.future_scope,
          comments: existingScore.comments,
        }
      : null,
  };
};

/* ---------------- SUBMIT SCORE ---------------- */
exports.submitScore = async (
  evaluatorId,
  teamId,
  novelty,
  clarity,
  feasibility,
  impact,
  futureScope,
  totalScore,
  comments
) => {
  const alreadyScored = await exports.isTeamAlreadyScored(teamId, evaluatorId);

  if (alreadyScored) {
    throw new Error("ALREADY_EVALUATED");
  }

  await pool.execute(
    `
    INSERT INTO evaluation_scores
    (evaluator_id, team_id, novelty, clarity, feasibility, impact, future_scope, total_score, comments)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      evaluatorId,
      teamId,
      novelty ?? 0,
      clarity ?? 0,
      feasibility ?? 0,
      impact ?? 0,
      futureScope ?? 0,
      totalScore ?? 0,
      comments ?? null,
    ]
  );

  await pool.execute(
    `UPDATE teams SET score = ?, is_scored = 1 WHERE team_id = ?`,
    [totalScore ?? 0, teamId]
  );
};

exports.isTeamAlreadyScored = async (teamId, evaluatorId) => {
  const [[row]] = await pool.execute(
    `SELECT 1 
     FROM evaluation_scores 
     WHERE team_id = ? AND evaluator_id = ? 
     LIMIT 1`,
    [teamId, evaluatorId]
  );
  return !!row;
};
