const jwt = require('jsonwebtoken');
const Member = require('../models/Member');
const Admin = require('../models/Admin');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
    try {
        let token;

        // Check for token in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route. Please login.'
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request based on type
            if (decoded.type === 'member') {
                req.user = await Member.findById(decoded.id);
                req.userType = 'member';
            } else if (decoded.type === 'admin') {
                req.user = await Admin.findById(decoded.id);
                req.userType = 'admin';
            }

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found'
                });
            }

            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Token is invalid or expired'
            });
        }
    } catch (error) {
        next(error);
    }
};

// Restrict to specific roles (for admin routes)
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (req.userType !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin privileges required.'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Access denied. Required role: ${roles.join(' or ')}`
            });
        }

        next();
    };
};

// Check if member owns the resource
exports.checkMemberOwnership = (req, res, next) => {
    if (req.userType === 'admin') {
        return next(); // Admins can access any member data
    }

    const memberId = req.params.memberId || req.params.id;

    if (req.user._id.toString() !== memberId) {
        return res.status(403).json({
            success: false,
            message: 'Access denied. You can only access your own data.'
        });
    }

    next();
};

// Generate JWT token
exports.generateToken = (id, type) => {
    return jwt.sign(
        { id, type },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
};
