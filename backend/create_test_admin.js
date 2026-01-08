// // require('dotenv').config();
// // const db = require('./config/db');
// // const bcrypt = require('bcryptjs');

// // const createTestAdmin = async () => {
// //     try {
// //         const email = 'nikita.ICadmin@gmail.com';
// //         const password = 'Nikita@26';
// //         const hashedPassword = await bcrypt.hash(password, 10);

// //         // Check if admin exists
// //         const [rows] = await db.execute('SELECT * FROM admins WHERE email = ?', [email]);

// //         if (rows.length > 0) {
// //             console.log('Test admin already exists.');
// //         } else {
// //             await db.execute(
// //                 'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)',
// //                 ['Test Admin', email, hashedPassword]
// //             );
// //             console.log('Test admin created successfully.');
// //         }
// //     } catch (error) {
// //         console.error('Error creating test admin:', error);
// //     } finally {
// //         process.exit();
// //     }
// // };

// // createTestAdmin();

// require('dotenv').config();
// const db = require('./config/db');
// const bcrypt = require('bcryptjs');

// /**
//  * Creates a test admin if it does not already exist.
//  * Safe to call multiple times.
//  */
// const createTestAdmin = async () => {
//   try {
//     const email = 'nikita.ICadmin@gmail.com';
//     const password = 'Nikita@26';

//     // Check if admin already exists
//     const [rows] = await db.execute(
//       'SELECT admin_id FROM admins WHERE email = ?',
//       [email]
//     );

//     if (rows.length > 0) {
//       console.log('ℹ️ Test admin already exists.');
//       return;
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await db.execute(
//       'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)',
//       ['Test Admin', email, hashedPassword]
//     );

//     console.log('✅ Test admin created successfully.');
//   } catch (error) {
//     console.error('❌ Error creating test admin:', error);
//     throw error; // let server.js handle failures if needed
//   }
// };

// module.exports = createTestAdmin;


require('dotenv').config();
const db = require('./config/db');
const bcrypt = require('bcryptjs');

/**
 * Creates multiple admins if they do not already exist.
 * Safe to call multiple times.
 */
const createTestAdmin = async () => {
  try {
    // ✅ ADD / REMOVE ADMINS HERE
    const admins = [
      {
        name: 'Admin Nikita',
        email: 'nikita.ICadmin@gmail.com',
        password: 'Nikita@26',
      },
      {
        name: 'Admin Sriharshini',
        email: 'sriharshini.ICadmin@gmail.com',
        password: 'SH@jscoe#123',
      },
      {
        name: 'Admin Pranjali',
        email: 'pranjali.ICadmin@gmail.com',
        password: 'Shinde@1234',
      },
      {
        name: 'Admin JSCOE Principal',
        email: 'principalJSCOE.ICadmin@gmail.com',
        password: 'Pjscoe@123',
      }
    ];

    for (const admin of admins) {
      // Check if admin already exists
      const [rows] = await db.execute(
        'SELECT admin_id FROM admins WHERE email = ?',
        [admin.email]
      );

      if (rows.length > 0) {
        console.log(`ℹ️ Admin already exists: ${admin.email}`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(admin.password, 10);

      await db.execute(
        'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)',
        [admin.name, admin.email, hashedPassword]
      );

      console.log(`✅ Admin created: ${admin.email}`);
    }

  } catch (error) {
    console.error('❌ Error creating admins:', error);
    throw error; // let server.js handle failures if needed
  }
};

module.exports = createTestAdmin;
