const express = require("express");
const router = express.Router();
const evaluatorUpload = require("../middleware/evaluatorUpload");
const evaluatorController = require("../controllers/evaluatorController");

// Register Evaluator
router.post(
  "/register",
  evaluatorUpload.fields([
    { name: "id_proof_image", maxCount: 1 }

    // 🔒 Resume file upload kept as BACKUP
    // { name: "resume_file", maxCount: 1 }
  ]),
  evaluatorController.registerEvaluator
);

module.exports = router;
