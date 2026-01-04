require('dotenv').config();
const db = require('./config/db');

const migrate = async () => {
    try {
        console.log('Starting migration...');

        const tables = [
            { name: 'evaluators', columns: ['created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'] },
            { name: 'teams', columns: ['created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP', 'score INT DEFAULT 0'] },
            { name: 'team_members', columns: ['created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'] },
            { name: 'user_logins', columns: ['created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'] },
            { name: 'idea_submission', columns: ['created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'] },
            { name: 'team_evaluator_assignments', columns: ['created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'] }
        ];

        for (const table of tables) {
            for (const colDef of table.columns) {
                const colName = colDef.split(' ')[0];
                try {
                    // Check if column exists
                    const [cols] = await db.query(`SHOW COLUMNS FROM ${table.name} LIKE ?`, [colName]);
                    if (cols.length === 0) {
                        console.log(`Adding ${colName} to ${table.name}...`);
                        await db.query(`ALTER TABLE ${table.name} ADD COLUMN ${colDef}`);
                        console.log(`Added ${colName} to ${table.name}.`);
                    } else {
                        console.log(`${colName} already exists in ${table.name}.`);
                    }
                } catch (err) {
                    console.error(`Error processing table ${table.name}, column ${colName}:`, err.message);
                }
            }
        }

        console.log('Migration completed successfully.');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        process.exit();
    }
};

migrate();
