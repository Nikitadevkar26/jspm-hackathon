const pool = require("../config/db");

const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connection established for initialization.");

    // SQL statements to create tables
    const createTablesSQL = `
      CREATE TABLE IF NOT EXISTS \`admins\` (
        \`admin_id\` INT NOT NULL AUTO_INCREMENT,
        \`name\` VARCHAR(255) NOT NULL,
        \`email\` VARCHAR(255) NOT NULL,
        \`password\` VARCHAR(255) NOT NULL,
        \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`admin_id\`),
        UNIQUE INDEX \`email_UNIQUE\` (\`email\` ASC));

      CREATE TABLE IF NOT EXISTS \`evaluators\` (
        \`evaluator_id\` INT NOT NULL AUTO_INCREMENT,
        \`name\` VARCHAR(255) NOT NULL,
        \`email\` VARCHAR(255) NOT NULL,
        \`password\` VARCHAR(255) NOT NULL,
        \`phone\` VARCHAR(45) NULL,
        \`organization\` VARCHAR(255) NULL,
        \`department\` VARCHAR(255) NULL,
        \`role\` VARCHAR(255) NULL,
        \`country\` VARCHAR(255) NULL,
        \`state\` VARCHAR(255) NULL,
        \`city\` VARCHAR(255) NULL,
        \`id_proof_image\` VARCHAR(255) NULL,
        \`resume_drive_url\` VARCHAR(255) NULL,
        \`status\` VARCHAR(45) NULL DEFAULT 'Pending',
        \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`evaluator_id\`),
        UNIQUE INDEX \`email_UNIQUE\` (\`email\` ASC));

      CREATE TABLE IF NOT EXISTS \`teams\` (
        \`team_id\` INT NOT NULL AUTO_INCREMENT,
        \`team_name\` VARCHAR(255) NOT NULL,
        \`college_type\` VARCHAR(255) NULL,
        \`country\` VARCHAR(255) NULL,
        \`pincode\` VARCHAR(45) NULL,
        \`leader_name\` VARCHAR(255) NULL,
        \`email\` VARCHAR(255) NOT NULL,
        \`project_title\` VARCHAR(255) NULL,
        \`theme\` VARCHAR(255) NULL,
        \`status\` VARCHAR(45) NULL DEFAULT 'Pending',
        \`payment_proof_image\` VARCHAR(255) NULL,
        \`score\` INT DEFAULT 0,
        \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`team_id\`),
        UNIQUE INDEX \`team_name_UNIQUE\` (\`team_name\` ASC),
        UNIQUE INDEX \`email_UNIQUE\` (\`email\` ASC));

      CREATE TABLE IF NOT EXISTS \`team_members\` (
        \`member_id\` INT NOT NULL AUTO_INCREMENT,
        \`team_id\` INT NOT NULL,
        \`member_name\` VARCHAR(255) NOT NULL,
        \`email\` VARCHAR(255) NOT NULL,
        \`phone\` VARCHAR(45) NULL,
        \`gender\` VARCHAR(45) NULL,
        \`branch\` VARCHAR(255) NULL,
        \`stream\` VARCHAR(255) NULL,
        \`year\` VARCHAR(45) NULL,
        \`college_name\` VARCHAR(255) NULL,
        \`state\` VARCHAR(255) NULL,
        \`city\` VARCHAR(255) NULL,
        \`id_proof_image\` VARCHAR(255) NULL,
        \`role\` VARCHAR(45) NULL,
        \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`member_id\`),
        UNIQUE INDEX \`email_UNIQUE\` (\`email\` ASC),
        INDEX \`fk_team_members_teams_idx\` (\`team_id\` ASC),
        CONSTRAINT \`fk_team_members_teams\`
          FOREIGN KEY (\`team_id\`)
          REFERENCES \`teams\` (\`team_id\`)
          ON DELETE CASCADE
          ON UPDATE NO ACTION);

      CREATE TABLE IF NOT EXISTS \`user_logins\` (
        \`login_id\` INT NOT NULL AUTO_INCREMENT,
        \`team_id\` INT NOT NULL,
        \`email\` VARCHAR(255) NOT NULL,
        \`password\` VARCHAR(255) NOT NULL,
        \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`login_id\`),
        UNIQUE INDEX \`email_UNIQUE\` (\`email\` ASC),
        INDEX \`fk_user_logins_teams_idx\` (\`team_id\` ASC),
        CONSTRAINT \`fk_user_logins_teams\`
          FOREIGN KEY (\`team_id\`)
          REFERENCES \`teams\` (\`team_id\`)
          ON DELETE CASCADE
          ON UPDATE NO ACTION);

      CREATE TABLE IF NOT EXISTS \`idea_submission\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`team_id\` INT NOT NULL,
        \`team_name\` VARCHAR(255) NULL,
        \`title\` VARCHAR(255) NULL,
        \`description\` TEXT NULL,
        \`summary\` TEXT NULL,
        \`drive_link\` VARCHAR(255) NULL,
        \`github_link\` VARCHAR(255) NULL,
        \`youtube_link\` VARCHAR(255) NULL,
        \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        INDEX \`fk_idea_submission_teams_idx\` (\`team_id\` ASC),
        CONSTRAINT \`fk_idea_submission_teams\`
          FOREIGN KEY (\`team_id\`)
          REFERENCES \`teams\` (\`team_id\`)
          ON DELETE CASCADE
          ON UPDATE NO ACTION);

      CREATE TABLE IF NOT EXISTS \`team_evaluator_assignments\` (
        \`assignment_id\` INT NOT NULL AUTO_INCREMENT,
        \`team_id\` INT NOT NULL,
        \`evaluator_id\` INT NOT NULL,
        \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`assignment_id\`),
        INDEX \`fk_team_evaluator_assignments_teams_idx\` (\`team_id\` ASC),
        INDEX \`fk_team_evaluator_assignments_evaluators_idx\` (\`evaluator_id\` ASC),
        UNIQUE INDEX \`unique_team_evaluator\` (\`team_id\` ASC, \`evaluator_id\` ASC),
        CONSTRAINT \`fk_team_evaluator_assignments_teams\`
          FOREIGN KEY (\`team_id\`)
          REFERENCES \`teams\` (\`team_id\`)
          ON DELETE CASCADE
          ON UPDATE NO ACTION,
        CONSTRAINT \`fk_team_evaluator_assignments_evaluators\`
          FOREIGN KEY (\`evaluator_id\`)
          REFERENCES \`evaluators\` (\`evaluator_id\`)
          ON DELETE CASCADE
          ON UPDATE NO ACTION);
    `;

    // Split the SQL string into individual statements and execute them
    const statements = createTablesSQL.split(';').map(s => s.trim()).filter(s => s.length > 0);

    for (const statement of statements) {
      await connection.query(statement + ';'); // Re-add semicolon for execution
    }

    console.log("Database tables checked/created successfully.");
    connection.release();
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1); // Exit if database initialization fails
  }
};

module.exports = initializeDatabase;
