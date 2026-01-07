const express = require("express");
const router = express.Router();
const controller = require("../../controllers/section-head/sectionHeadRegistrationController");

/*
|--------------------------------------------------------------------------
| SECTION HEAD REGISTRATION
|--------------------------------------------------------------------------
| POST /api/section-heads/register
|
| status column is present in DB but not used yet
| can be activated later for enable/disable logic
|--------------------------------------------------------------------------
*/

router.post("/register", controller.registerSectionHead);

module.exports = router;
