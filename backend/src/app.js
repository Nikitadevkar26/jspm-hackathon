const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

// Existing Routes
const evaluatorRoutes = require("../routes/evaluatorRoutes");
const teamRoutes = require("../routes/teamRoutes"); // ✅ ADDED teamRoutes

// ✅ Team Leader Login Routes (ADDED)
const teamLoginRoutes = require("../routes/teamLoginRoutes");

// ✅ Team Detail Routes (ADDED)
const teamDetailRoutes = require("../routes/teamDetailRoutes");

// evaluator login route
const evaluatorLoginRoutes = require("../routes/evaluator/evaluatorLoginRoutes");

// idea submission route
const ideaSubmissionRoutes = require("../routes/idea-submission/ideaSubmissionRoutes");

// admin 
const adminAuthRoutes = require("../routes/admin/adminAuthRoutes");
const registrationRoutes = require("../routes/admin/registrationRoutes");
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
app.use("/api/evaluators", evaluatorRoutes);
app.use("/api/teams", teamRoutes); // ✅ ADDED teamRoutes

// ✅ Team Leader Login API (ADDED)
app.use("/api/team-login", teamLoginRoutes);

// ✅ Team Detail API (ADDED)
app.use("/api/team-details", teamDetailRoutes);

// admin 
app.use("/api/admin", adminAuthRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/evaluators", evaluatorAdminRoutes);
app.use("/api/assignments", assignmentRoutes);

// evaluator
app.use("/api/evaluators", evaluatorLoginRoutes);

// idea submission
app.use("/api/idea-submission", ideaSubmissionRoutes);

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
