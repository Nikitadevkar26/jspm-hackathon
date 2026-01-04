const AdminModel = require('../models/adminAuthModel');
const db = require('../config/db');

/* ---------------- GET ALL ADMINS ---------------- */
exports.getAllAdmins = async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT admin_id, name, email, created_at FROM admins'
    );

    return res.status(200).json({
      success: true,
      admins: rows
    });

  } catch (error) {
    console.error('Fetch admins error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch admins'
    });
  }
};

/* ---------------- ADMIN LOGIN ---------------- */
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const admin = await AdminModel.findByEmail(email);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // 🔥 FIX: Convert DB password to string before comparing
    if (String(admin.password) !== String(password)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      admin: {
        admin_id: admin.admin_id,
        name: admin.name,
        email: admin.email
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};
