const express = require("express");
const router = express.Router();
const controller = require("../../controllers/ideaSubmission/viewTeamIdeaController");

/*
|--------------------------------------------------------------------------
| IDEA SUBMISSION VIEW & MANAGEMENT
|--------------------------------------------------------------------------
*/

router.get("/", controller.getAllIdeas);
router.get("/:id", controller.getIdeaById);
router.put("/:id/status", controller.updateIdeaStatus);

module.exports = router;
