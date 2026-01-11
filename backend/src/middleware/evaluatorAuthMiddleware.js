const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authorization token missing"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ ENSURE EMAIL EXISTS
    if (!decoded.email) {
      return res.status(401).json({
        message: "Invalid token payload"
      });
    }

    req.evaluator = {
      email: decoded.email
    };

    next();
  } catch (error) {
    console.error("JWT VERIFY ERROR:", error.message);
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};
