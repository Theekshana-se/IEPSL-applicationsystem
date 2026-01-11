const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validationMiddleware');
const {
    registerMember,
    login,
    getMe,
    logout
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Validation rules
const registerValidation = [
    body('nameWithInitials').notEmpty().withMessage('Name with initials is required'),
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('dateOfBirth').isISO8601().withMessage('Valid date of birth is required'),
    body('nicNumber').notEmpty().withMessage('NIC number is required'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Valid gender is required'),
    body('district').notEmpty().withMessage('District is required'),
    body('residentialAddress').notEmpty().withMessage('Residential address is required'),
    body('mobileNumber').notEmpty().withMessage('Mobile number is required'),
    body('personalEmail').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('userType').isIn(['member', 'admin']).withMessage('Valid user type is required')
];

// Routes
router.post('/register', registerValidation, validate, registerMember);
router.post('/login', loginValidation, validate, login);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

module.exports = router;
