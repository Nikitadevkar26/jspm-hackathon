const express = require('express');
const router = express.Router();
const adminAuthController = require('../../controllers/admin/adminLoginController');

const verifyAdminToken = require("../../middleware/authMiddleware");

router.post('/login', adminAuthController.loginAdmin);
router.get('/all', verifyAdminToken, adminAuthController.getAllAdmins);

module.exports = router;
