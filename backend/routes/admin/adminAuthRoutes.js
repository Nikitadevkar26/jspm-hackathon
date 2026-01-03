const express = require('express');
const router = express.Router();
const adminAuthController = require('../../controllers/admin/adminAuthController');

router.post('/login', adminAuthController.loginAdmin);
router.get('/all', adminAuthController.getAllAdmins);

module.exports = router;
