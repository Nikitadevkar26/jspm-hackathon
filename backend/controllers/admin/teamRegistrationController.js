const Registration = require("../../models/admin/teamRegistrationModel");

/* ================================
   GET ALL TEAMS (TABLE VIEW)
================================ */
exports.getTeams = async (req, res) => {
  try {
    const teams = await Registration.getAllTeams();
    res.json(teams);
  } catch (err) {
    console.error("GET TEAMS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
};

/* ================================
   GET TEAMS READY FOR EVALUATION
   (SECTION HEAD PANEL)
================================ */
exports.getTeamsReadyForEvaluation = async (req, res) => {
  try {
    const teams = await Registration.getTeamsReadyForEvaluation();
    res.json(teams);
  } catch (err) {
    console.error("READY FOR EVALUATION ERROR:", err);
    res.status(500).json({ error: "Failed to fetch evaluation teams" });
  }
};

/* ================================
   GET SINGLE TEAM + MEMBERS (MODAL)
================================ */
exports.getTeamDetails = async (req, res) => {
  try {
    const { teamId } = req.params;
    const data = await Registration.getTeamDetails(teamId);
    res.json(data);
  } catch (err) {
    console.error("TEAM DETAILS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch team details" });
  }
};

/* ================================
   UPDATE TEAM STATUS
================================ */
exports.updateStatus = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { status } = req.body;

    await Registration.updateTeamStatus(teamId, status);
    res.json({ success: true });
  } catch (err) {
    console.error("UPDATE STATUS ERROR:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};

// mailing system
const db = require("../../config/db");
const transporter = require("../../utils/mailer");
const bcrypt = require("bcryptjs");

exports.sendStatusEmail = async (req, res) => {
  try {
    const { teamId } = req.params;

    // 1️⃣ Fetch team details
    const [[team]] = await db.query(
      "SELECT team_name, leader_name, email, status FROM teams WHERE team_id = ?",
      [teamId]
    );

    if (!team || team.status === "Pending") {
      return res.status(400).json({ message: "Invalid team status" });
    }

    // 2️⃣ REJECTION FLOW
    if (team.status === "rejected") {
      await transporter.sendMail({
        from: `"IC Hackathon" <${process.env.MAIL_USER}>`,
        to: team.email,
        subject: "Hackathon Registration Update",
        html: `
          <p>Dear ${team.leader_name},</p>
          <p>We regret to inform you that your team <b>${team.team_name}</b> has not been selected.</p>
          <p>Thank you for participating.</p>
        `,
      });

      return res.json({ success: true, message: "Rejection email sent" });
    }

    // 3️⃣ APPROVAL FLOW
    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(`\nSent Mail To ${team.email}\n`);

    // 🔍 Check if login already exists
    const [[existing]] = await db.query(
      "SELECT * FROM user_logins WHERE email = ?",
      [team.email]
    );

    if (!existing) {
      await db.query(
        "INSERT INTO user_logins (team_id, email, password) VALUES (?, ?, ?)",
        [teamId, team.email, hashedPassword]
      );
    } else {
      await db.query(
        "UPDATE user_logins SET password = ? WHERE email = ?",
        [hashedPassword, team.email]
      );
    }

    // 4️⃣ SEND APPROVAL EMAIL
    await transporter.sendMail({
      from: `"IC Hackathon" <${process.env.MAIL_USER}>`,
      to: team.email,
      subject: "Hackathon Registration Approved 🎉",
      html: `
        <p>Dear ${team.leader_name},</p>
        <p>Congratulations! Your team <b>${team.team_name}</b> has been approved.</p>
        <p><b>Login Credentials:</b></p>
        <p>
          Email: ${team.email}<br/>
          Password: <b>${password}</b>
        </p>
        <p>Please keep these credentials secure.</p>
      `,
    });

    res.json({ success: true, message: "Approval email sent" });

  } catch (err) {
    console.error("EMAIL ERROR:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
};



