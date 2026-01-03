const bcrypt = require("bcryptjs");
const EvaluatorLoginModel = require("../../models/evaluator/evaluatorLoginModel");

/* ===============================
   EVALUATOR LOGIN CONTROLLER
================================ */
exports.loginEvaluator = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* ---------------- VALIDATION ---------------- */
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    /* ---------------- FIND USER ---------------- */
    const evaluator = await EvaluatorLoginModel.findByEmail(email);

    if (!evaluator) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    /* ---------------- STATUS CHECK ---------------- */
    if (evaluator.status !== "Approved") {
      return res.status(403).json({
        message: "Your account is not approved yet",
      });
    }

    /* ---------------- PASSWORD CHECK ---------------- */
    const isMatch = await bcrypt.compare(password, evaluator.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    /* ---------------- SUCCESS RESPONSE ---------------- */
    return res.status(200).json({
      message: "Login successful",
      user: {
        evaluator_id: evaluator.evaluator_id,
        name: evaluator.name,
        email: evaluator.email,
        role: evaluator.role,
        organization: evaluator.organization,
        department: evaluator.department,
        country: evaluator.country,
        state: evaluator.state,
        city: evaluator.city,
      },
    });

  } catch (error) {
    console.error("Evaluator Login Error:", error);
    return res.status(500).json({
      message: "Server error during login",
    });
  }
};
