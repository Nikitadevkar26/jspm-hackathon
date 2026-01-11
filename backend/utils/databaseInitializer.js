const pool = require("../config/db");

const initializeDatabase = async () => {
  let connection;

  try {
    connection = await pool.getConnection();
    console.log("Database connection established for initialization.");

    /* 1️⃣ Create & Use Database */
    await connection.query(`
      CREATE DATABASE IF NOT EXISTS innovationjscoe_new
      DEFAULT CHARACTER SET utf8mb4
      COLLATE utf8mb4_0900_ai_ci
    `);

    await connection.query(`USE innovationjscoe_new`);

    /* 2️⃣ Create Tables (SAFE – NO DROPS) */
    const createTables = [

      /* ================= ADMINS ================= */
      `
      CREATE TABLE IF NOT EXISTS admins (
        admin_id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (admin_id),
        UNIQUE KEY email (email)
      ) ENGINE=InnoDB
      `,
      
      /* ================= EVALUATORS ================= */
      `
      CREATE TABLE IF NOT EXISTS evaluators (
        evaluator_id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        organization VARCHAR(150) NOT NULL,
        department VARCHAR(150) NOT NULL,
        role VARCHAR(150) NOT NULL,
        country VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        id_proof_image VARCHAR(255),
        resume_drive_url VARCHAR(500) NOT NULL,
        github_profile_url VARCHAR(300),
        youtube_channel_url VARCHAR(300),
        status ENUM('Pending','Approved','Rejected') DEFAULT 'Pending',
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        profile_image VARCHAR(255),
        resume_file VARCHAR(255),
        approved_at DATETIME,
        PRIMARY KEY (evaluator_id),
        UNIQUE KEY email (email)
      ) ENGINE=InnoDB
      `,

      /* ================= SECTION HEADS ================= */
      `
      CREATE TABLE IF NOT EXISTS section_heads (
        sh_id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        status ENUM('active','inactive') NOT NULL DEFAULT 'active',
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        role ENUM('Section Head') NOT NULL DEFAULT 'Section Head',
        PRIMARY KEY (sh_id),
        UNIQUE KEY email (email)
      ) ENGINE=InnoDB
      `,

      /* ================= NOTICES ================= */
      `
      CREATE TABLE IF NOT EXISTS notices (
        notice_id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        posted_by VARCHAR(100),
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (notice_id)
      ) ENGINE=InnoDB
      `,

      /* ================= TEAMS ================= */
      `
      CREATE TABLE IF NOT EXISTS teams (
        team_id INT NOT NULL AUTO_INCREMENT,
        team_name VARCHAR(255) NOT NULL,
        college_type ENUM('Autonomous','Private','Affiliated','Government'),
        country VARCHAR(100) DEFAULT 'India',
        pincode VARCHAR(20),
        leader_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        project_title VARCHAR(255),
        theme VARCHAR(255),
        score INT,
        status ENUM('approved','rejected','Pending') DEFAULT 'Pending',
        payment_proof_image VARCHAR(255),
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        is_scored TINYINT(1) NOT NULL DEFAULT 0,
        PRIMARY KEY (team_id),
        UNIQUE KEY team_name (team_name),
        UNIQUE KEY email (email)
      ) ENGINE=InnoDB
      `,

      /* ================= TEAM MEMBERS ================= */
      `
      CREATE TABLE IF NOT EXISTS team_members (
        member_id INT NOT NULL AUTO_INCREMENT,
        team_id INT NOT NULL,
        member_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(45),
        gender VARCHAR(45),
        branch VARCHAR(255),
        stream VARCHAR(255),
        year VARCHAR(45),
        college_name VARCHAR(255),
        state VARCHAR(255),
        city VARCHAR(255),
        id_proof_image VARCHAR(255),
        role VARCHAR(45),
        PRIMARY KEY (member_id),
        UNIQUE KEY email (email),
        KEY team_id (team_id)
      ) ENGINE=InnoDB
      `,

      /* ================= USER LOGINS ================= */
      `
      CREATE TABLE IF NOT EXISTS user_logins (
        login_id INT NOT NULL AUTO_INCREMENT,
        team_id INT NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        must_reset_password TINYINT(1) DEFAULT 1,
        PRIMARY KEY (login_id),
        UNIQUE KEY email (email),
        KEY team_id (team_id)
      ) ENGINE=InnoDB
      `,

      /* ================= IDEA SUBMISSION ================= */
      `
      CREATE TABLE IF NOT EXISTS idea_submission (
        id INT NOT NULL AUTO_INCREMENT,
        team_id INT NOT NULL,
        team_name VARCHAR(150) NOT NULL,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        summary TEXT NOT NULL,
        drive_link VARCHAR(500) NOT NULL,
        github_link VARCHAR(300),
        youtube_link VARCHAR(300),
        submission_status ENUM('SUBMITTED','UNDER_REVIEW','APPROVED','REJECTED') DEFAULT 'SUBMITTED',
        submitted_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY team_id (team_id)
      ) ENGINE=InnoDB
      `,

      /* ================= GRIEVANCES ================= */
      `
      CREATE TABLE IF NOT EXISTS grievances (
        grievance_id INT NOT NULL AUTO_INCREMENT,
        team_id INT NOT NULL,
        message TEXT NOT NULL,
        status ENUM('Open','Resolved') DEFAULT 'Open',
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (grievance_id)
      ) ENGINE=InnoDB
      `,

      /* ================= EVALUATION SCORES ================= */
      `
      CREATE TABLE IF NOT EXISTS evaluation_scores (
        evaluator_id INT NOT NULL,
        team_id INT NOT NULL,
        novelty INT NOT NULL DEFAULT 0,
        clarity INT NOT NULL DEFAULT 0,
        feasibility INT NOT NULL DEFAULT 0,
        impact INT NOT NULL DEFAULT 0,
        future_scope INT NOT NULL DEFAULT 0,
        total_score INT NOT NULL DEFAULT 0,
        comments TEXT,
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (evaluator_id, team_id)
      ) ENGINE=InnoDB
      `,

      /* ================= TEAM EVALUATOR ASSIGNMENTS ================= */
      `
      CREATE TABLE IF NOT EXISTS team_evaluator_assignments (
        assignment_id INT NOT NULL AUTO_INCREMENT,
        team_id INT NOT NULL,
        evaluator_id INT NOT NULL,
        assigned_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (assignment_id),
        KEY team_id (team_id),
        KEY evaluator_id (evaluator_id)
      ) ENGINE=InnoDB
      `
    ];

    for (const stmt of createTables) {
      await connection.query(stmt);
    }

    /* 3️⃣ CREATE VIEW (SAFE) */
    await connection.query(`
      CREATE OR REPLACE VIEW team_evaluator_assignments_view AS
      SELECT
        a.assignment_id,
        a.assigned_at,
        a.team_id,
        a.evaluator_id,
        e.name AS evaluator_name
      FROM team_evaluator_assignments a
      JOIN evaluators e
        ON a.evaluator_id = e.evaluator_id
    `);

    console.log("✅ Database initialized exactly as per schema (NO DROPS).");

  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    process.exit(1);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = initializeDatabase;
