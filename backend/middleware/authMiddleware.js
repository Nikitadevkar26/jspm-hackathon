const jwt = require('jsonwebtoken');

const verifyAdminToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.'
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_production'
        );
        req.user = decoded; // { admin_id, email, iat, exp }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

module.exports = verifyAdminToken;
