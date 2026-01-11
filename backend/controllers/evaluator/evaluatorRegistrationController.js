const bcrypt = require("bcryptjs");
const Evaluator = require("../../models/evaluator/evaluatorRegistrationModel");

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
      resume_drive_url,
      github_profile_url,     // ✅ NEW
      youtube_channel_url     // ✅ NEW
    } = req.body;

    /* ------------------------------
       1. Basic body validation
    ------------------------------ */
    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !organization ||
      !department ||
      !role ||
      !country ||
      !state ||
      !city
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    /* ------------------------------
       2. Resume URL validation
    ------------------------------ */
    if (!resume_drive_url) {
      return res.status(400).json({
        message: "Resume drive URL is required"
      });
    }

    if (!resume_drive_url.startsWith("https://drive.google.com/")) {
      return res.status(400).json({
        message: "Resume must be a valid Google Drive link"
      });
    }

    /* ------------------------------
       3. File validation
    ------------------------------ */
    const idProofImage = req.files?.id_proof_image?.[0]?.filename;

    if (!idProofImage) {
      return res.status(400).json({
        message: "ID proof image is required"
      });
    }

    /* ------------------------------
       4. Duplicate email check
    ------------------------------ */
    const [existing] = await Evaluator.findByEmail(email);
    if (existing.length > 0) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    /* ------------------------------
       5. Hash password
    ------------------------------ */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* ------------------------------
       6. Create evaluator
    ------------------------------ */
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
      resume_drive_url,
      github_profile_url: github_profile_url || null,   // ✅ NEW
      youtube_channel_url: youtube_channel_url || null  // ✅ NEW
    });

    /* ------------------------------
       7. Success response
    ------------------------------ */
    res.status(201).json({
      message: "Evaluator registered successfully",
      status: "Pending"
    });

  } catch (error) {
    console.error("Evaluator Register Error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};
