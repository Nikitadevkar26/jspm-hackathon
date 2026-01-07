const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

// Existing Routes
const evaluatorRegistrationRoutes = require("../routes/evaluator/evaluatorRegistrationRoutes");
const teamRegistrationRoutes = require("../routes/teams/teamRegistrationRoutes"); // ✅ ADDED teamRoutes

// ✅ Team Leader Login Routes (ADDED)
const teamLoginRoutes = require("../routes/teams/teamLoginRoutes");

// ✅ Team Detail Routes (ADDED)
const teamDetailRoutes = require("../routes/teams/teamDetailRoutes");

// evaluator login route
const evaluatorLoginRoutes = require("../routes/evaluator/evaluatorLoginRoutes");

// idea submission route
const ideaSubmissionRoutes = require("../routes/idea-submission/ideaSubmissionRoutes");
const viewTeamIdeaRoutes = require("../routes/idea-submission/viewTeamIdeaRoutes");


// admin 
const adminLoginRoutes = require("../routes/admin/adminLoginRoutes");
const registrationRoutes = require("../routes/admin/teamRegistrationRoutes");
const evaluatorAdminRoutes = require("../routes/admin/evaluatorRoutes");
const assignmentRoutes = require("../routes/admin/assignmentRoutes");

const app = express();

/* =========================
   GLOBAL MIDDLEWARE
========================= */

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* =========================
   STATIC FILE SERVING
========================= */

app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "uploads"))
);

/* =========================
   API ROUTES
========================= */

// Existing evaluator routes
app.use("/api/evaluators", evaluatorRegistrationRoutes);
app.use("/api/teams", teamRegistrationRoutes); // ✅ ADDED teamRegistrationRoutes

// ✅ Team Leader Login API (ADDED)
app.use("/api/team-login", teamLoginRoutes);

// ✅ Team Detail API (ADDED)
app.use("/api/team-details", teamDetailRoutes);

// admin 
app.use("/api/admin", adminLoginRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/evaluators", evaluatorAdminRoutes);
app.use("/api/assignments", assignmentRoutes);

// evaluator
app.use("/api/evaluators", evaluatorLoginRoutes);

// idea submission
app.use("/api/idea-submission", ideaSubmissionRoutes);
app.use("/api/admin-view-idea-submission", viewTeamIdeaRoutes);



const pool = require("../config/db");

/* =========================
   HEALTH CHECK
========================= */

app.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    res.json({
      status: "OK",
      message: "Innovation JSCOE Backend is running 🚀 and database is connected"
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Innovation JSCOE Backend is running 🚀 but database connection failed",
      error: error.message
    });
  }
});

/* =========================
   EXPORT APP
========================= */

module.exports = app;
