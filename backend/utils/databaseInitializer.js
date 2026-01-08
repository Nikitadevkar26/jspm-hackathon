const pool = require("../config/db");

const initializeDatabase = async () => {
  let connection;

  try {
    connection = await pool.getConnection();
    console.log("Database connection established for initialization.");

    /* 1️⃣ Create & Use Database */
    await connection.query(`
      CREATE DATABASE IF NOT EXISTS innovationjscoe
      DEFAULT CHARACTER SET utf8mb4
      COLLATE utf8mb4_0900_ai_ci
    `);

    await connection.query(`USE innovationjscoe`);

    /* 2️⃣ Drop existing views & tables (FK-safe order) */
    const dropStatements = [
      `DROP VIEW IF EXISTS team_evaluator_assignments_view`,
      `DROP TABLE IF EXISTS team_evaluator_assignments`,
      `DROP TABLE IF EXISTS evaluation_scores`,
      `DROP TABLE IF EXISTS idea_submission`,
      `DROP TABLE IF EXISTS grievances`,
      `DROP TABLE IF EXISTS team_members`,
      `DROP TABLE IF EXISTS notices`,
      `DROP TABLE IF EXISTS section_heads`,
      `DROP TABLE IF EXISTS evaluators`,
      `DROP TABLE IF EXISTS admins`,
    ];

    for (const stmt of dropStatements) {
      await connection.query(stmt);
    }

    /* 3️⃣ Create Tables */
    const createTables = [
      /* Admins */
      `
      CREATE TABLE admins (
        admin_id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (admin_id),
        UNIQUE KEY email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `,

      /* Evaluators */
      `
      CREATE TABLE evaluators (
        evaluator_id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        status ENUM('Pending','Approved','Rejected') DEFAULT 'Pending',
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        phone VARCHAR(20) NOT NULL,
        organization VARCHAR(150) NOT NULL,
        department VARCHAR(150) NOT NULL,
        role VARCHAR(150) NOT NULL,
        country VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        resume_drive_url VARCHAR(500) NOT NULL,
        PRIMARY KEY (evaluator_id),
        UNIQUE KEY email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `,

      /* Section Heads */
      `
      CREATE TABLE section_heads (
        sh_id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        status ENUM('active','inactive') NOT NULL DEFAULT 'active',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (sh_id),
        UNIQUE KEY email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `,

      /* Notices */
      `
      CREATE TABLE notices (
        notice_id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        posted_by VARCHAR(100),
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (notice_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `,

      /* Team Members */
      `
      CREATE TABLE team_members (
        member_id INT NOT NULL AUTO_INCREMENT,
        team_id INT NOT NULL,
        member_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        gender ENUM('Male','Female','Other') NOT NULL,
        branch VARCHAR(100) NOT NULL,
        year VARCHAR(50) NOT NULL,
        PRIMARY KEY (member_id),
        KEY team_id (team_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `,

      /* Grievances */
      `
      CREATE TABLE grievances (
        grievance_id INT NOT NULL AUTO_INCREMENT,
        team_id INT NOT NULL,
        message TEXT NOT NULL,
        status ENUM('Open','Resolved') DEFAULT 'Open',
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (grievance_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `,

      /* Idea Submission */
      `
      CREATE TABLE idea_submission (
        id INT NOT NULL AUTO_INCREMENT,
        team_id INT NOT NULL,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        summary TEXT NOT NULL,
        drive_link VARCHAR(500) NOT NULL,
        submission_status ENUM(
          'SUBMITTED',
          'UNDER_REVIEW',
          'APPROVED',
          'REJECTED'
        ) DEFAULT 'SUBMITTED',
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `,

      /* Evaluation Scores */
      `
      CREATE TABLE evaluation_scores (
        eval_id INT NOT NULL AUTO_INCREMENT,
        evaluator_id INT NOT NULL,
        team_id INT NOT NULL,
        innovation INT DEFAULT 0,
        impact INT DEFAULT 0,
        feasibility INT DEFAULT 0,
        presentation INT DEFAULT 0,
        total_score INT DEFAULT 0,
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (eval_id),
        CONSTRAINT fk_eval_scores_evaluator
          FOREIGN KEY (evaluator_id)
          REFERENCES evaluators (evaluator_id)
          ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `,

      /* Team Evaluator Assignments */
      `
      CREATE TABLE team_evaluator_assignments (
        assignment_id INT NOT NULL AUTO_INCREMENT,
        team_id INT NOT NULL,
        evaluator_id INT NOT NULL,
        assigned_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (assignment_id),
        CONSTRAINT fk_assignment_evaluator
          FOREIGN KEY (evaluator_id)
          REFERENCES evaluators (evaluator_id)
          ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `,
    ];

    for (const stmt of createTables) {
      await connection.query(stmt);
    }

    /* 4️⃣ Create View */
    await connection.query(`
      CREATE VIEW team_evaluator_assignments_view AS
      SELECT
        a.assignment_id,
        a.assigned_at,
        a.team_id,
        e.evaluator_id,
        e.name AS evaluator_name
      FROM team_evaluator_assignments a
      JOIN evaluators e
        ON a.evaluator_id = e.evaluator_id
    `);

    console.log("✅ Database initialized successfully.");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    process.exit(1);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = initializeDatabase;
