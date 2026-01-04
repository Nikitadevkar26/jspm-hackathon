const bcrypt = require("bcryptjs");
const Evaluator = require("../models/evaluatorModel");

exports.registerEvaluator = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      organization,
      department,
      role,
      country,
      state,
      city,
      resume_drive_url // ✅ NEW
    } = req.body;

    // -----------------------------
    // Basic Input Validation
    // -----------------------------
    if (!name || !email || !password || !phone || !organization || !department || !role || !country || !state || !city || !resume_drive_url) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // -----------------------------
    // Check duplicate email
    // -----------------------------
    const [existing] = await Evaluator.findByEmail(email);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // -----------------------------
    // Hash password
    // -----------------------------
    const hashedPassword = await bcrypt.hash(password, 10);

    // -----------------------------
    // Files
    // -----------------------------
    const idProofImage = req.files?.id_proof_image?.[0]?.filename || null;

    // -----------------------------
    // Create Evaluator
    // -----------------------------
    await Evaluator.createEvaluator({
      name,
      email,
      password: hashedPassword,
      phone,
      organization,
      department,
      role,
      country,
      state,
      city,
      id_proof_image: idProofImage,
      resume_drive_url: resume_drive_url, // ✅ NEW
    });

    res.status(201).json({
      message: "Evaluator registered successfully",
      status: "Pending"
    });

  } catch (error) {
    console.error("Evaluator Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
