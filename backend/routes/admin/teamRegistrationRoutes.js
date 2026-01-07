const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/teamRegistrationController");
const verifyAdminToken = require("../../middleware/authMiddleware");

// Apply middleware to all routes in this router
router.use(verifyAdminToken);

router.get("/ready-for-evaluation", controller.getTeamsReadyForEvaluation);
router.get("/", controller.getTeams);
router.put("/:teamId/status", controller.updateStatus);
router.get("/:teamId", controller.getTeamDetails);
router.post("/:teamId/send-email", controller.sendStatusEmail);


module.exports = router;
