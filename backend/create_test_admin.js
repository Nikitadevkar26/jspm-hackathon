require('dotenv').config();
const db = require('./config/db');
const bcrypt = require('bcryptjs');

const createTestAdmin = async () => {
    try {
        const email = 'admin@test.com';
        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if admin exists
        const [rows] = await db.execute('SELECT * FROM admins WHERE email = ?', [email]);

        if (rows.length > 0) {
            console.log('Test admin already exists.');
        } else {
            await db.execute(
                'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)',
                ['Test Admin', email, hashedPassword]
            );
            console.log('Test admin created successfully.');
        }
    } catch (error) {
        console.error('Error creating test admin:', error);
    } finally {
        process.exit();
    }
};

createTestAdmin();
