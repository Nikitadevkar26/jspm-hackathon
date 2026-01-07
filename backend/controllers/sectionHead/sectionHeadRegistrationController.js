const SectionHead = require("../../models/section-head/sectionHeadRegistrationModel");

exports.registerSectionHead = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔎 Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // 🔍 Check if email already exists
    const [existing] = await SectionHead.findByEmail(email);

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    // ✅ Create section head
    await SectionHead.create({
      name,
      email,
      password
      // status is intentionally skipped (default Active)
    });

    return res.status(201).json({
      success: true,
      message: "Section Head registered successfully"
    });

  } catch (error) {
    console.error("Section Head Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
