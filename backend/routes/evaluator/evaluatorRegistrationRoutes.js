const express = require("express");
const router = express.Router();
const evaluatorUpload = require("../../middleware/evaluatorUpload");
const evaluatorRegistrationController = require("../../controllers/evaluator/evaluatorRegistrationController");

// Register Evaluator
router.post(
  "/register",
  evaluatorUpload.fields([
    { name: "id_proof_image", maxCount: 1 }

    // 🔒 Resume file upload kept as BACKUP
    // { name: "resume_file", maxCount: 1 }
  ]),
  evaluatorRegistrationController.registerEvaluator
);

module.exports = router;
