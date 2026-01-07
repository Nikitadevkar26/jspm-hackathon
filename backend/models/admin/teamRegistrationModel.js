const db = require("../../config/db");

/* ======================================
   GET ALL TEAMS (TABLE VIEW)
====================================== */
const getAllTeams = async () => {
  const [rows] = await db.query(`
    SELECT
      team_id,
      team_name,
      leader_name,
      email,
      theme,
      project_title,
      status,
      created_at
    FROM teams
    ORDER BY created_at DESC
  `);
  return rows;
};

/* ======================================
   GET SINGLE TEAM (NO PDF BLOB)
====================================== */
const getTeamById = async (teamId) => {
  const [[team]] = await db.query(
    `
    SELECT
      team_id,
      team_name,
      college_type,
      country,
      pincode,
      leader_name,
      email,
      project_title,
      theme,
      score,
      status,
      payment_proof_image,
      created_at
    FROM teams
    WHERE team_id = ?
  `,
    [teamId]
  );

  return team;
};


/* ======================================
   GET TEAM MEMBERS (NO PDF BLOB)
====================================== */
const getTeamMembers = async (teamId) => {
  const [members] = await db.query(
    `
    SELECT
      member_id,
      member_name,
      email,
      phone,
      gender,
      branch,
      stream,
      year,
      college_name,
      state,
      city,
      role,
      id_proof_image
    FROM team_members
    WHERE team_id = ?
  `,
    [teamId]
  );

  return members;
};


/* ======================================
   COMBINED TEAM DETAILS
====================================== */
const getTeamDetails = async (teamId) => {
  const team = await getTeamById(teamId);
  const members = await getTeamMembers(teamId);
  return { team, members };
};

/* ======================================
   GET PAYMENT PROOF PDF (BLOB)
====================================== */
// const getPaymentProofPdf = async (teamId) => {
//   const [[row]] = await db.query(
//     "SELECT payment_proof_file FROM teams WHERE team_id = ?",
//     [teamId]
//   );
//   return row ? row.payment_proof_file : null;
// };

/* ======================================
   GET MEMBER ID PROOF PDF (BLOB)
====================================== */
// const getMemberIdProofPdf = async (memberId) => {
//   const [[row]] = await db.query(
//     "SELECT id_proof_file FROM team_members WHERE member_id = ?",
//     [memberId]
//   );
//   return row ? row.id_proof_file : null;
// };

/* ======================================
   UPDATE TEAM STATUS
====================================== */
const updateTeamStatus = async (teamId, status) => {
  await db.query(
    "UPDATE teams SET status = ? WHERE team_id = ?",
    [status, teamId]
  );
};

/* ======================================
   GET TEAMS READY FOR EVALUATION
   (USED BY SECTION HEAD PANEL)
====================================== */
const getTeamsReadyForEvaluation = async () => {
  const [rows] = await db.query(`
    SELECT
      t.team_id,
      t.team_name,
      t.project_title,
      t.theme,
      a.evaluator_id,
      e.name AS evaluator_name
    FROM teams t
    LEFT JOIN team_evaluator_assignments a
      ON t.team_id = a.team_id
    LEFT JOIN evaluators e
      ON a.evaluator_id = e.evaluator_id
    WHERE t.status = 'Approved'
    ORDER BY t.created_at DESC
  `);

  return rows;
};

/* ======================================
   EXPORTS
====================================== */
module.exports = {
  getAllTeams,
  getTeamDetails,
  updateTeamStatus,
  getTeamsReadyForEvaluation
};

