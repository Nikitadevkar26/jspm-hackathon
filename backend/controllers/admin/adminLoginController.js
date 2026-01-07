const AdminModel = require('../../models/admin/adminLoginModel');
const db = require('../../config/db');
const bcrypt = require('bcryptjs');

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

    // ✅ SECURE: Use bcrypt to compare the provided password with the stored hash.
    // This assumes that the password in the database is already hashed.
    // If passwords are still stored in plain text, this comparison will fail,
    // which is the correct behavior. Passwords must be hashed before being stored.
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const jwt = require('jsonwebtoken');

    const token = jwt.sign(
      { admin_id: admin.admin_id, email: admin.email },
      process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_production',
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
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
