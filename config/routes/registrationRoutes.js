const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validationMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { uploadRegistrationDocuments, handleUploadError } = require('../middleware/uploadMiddleware');
const {
    saveStep2,
    saveStep3,
    saveStep4,
    saveStep5,
    saveStep6,
    saveStep7,
    saveStep8,
    getProgress
} = require('../controllers/registrationController');

// All routes require authentication
router.use(protect);

// Step 2 - Office Details
router.post('/step2', [
    body('officeAddress').optional(),
    body('officePhone').optional(),
    body('officeEmail').optional().isEmail().withMessage('Valid email required'),
    validate
], saveStep2);

// Step 3 - Work Experience
router.post('/step3', [
    body('workExperience').isArray().withMessage('Work experience must be an array'),
    body('workExperience.*.placeOfWork').notEmpty().withMessage('Place of work is required'),
    body('workExperience.*.designation').notEmpty().withMessage('Designation is required'),
    body('workExperience.*.natureOfWork').notEmpty().withMessage('Nature of work is required'),
    validate
], saveStep3);

// Step 4 - Education
router.post('/step4', [
    body('education').isArray().withMessage('Education must be an array'),
    body('education.*.institution').notEmpty().withMessage('Institution is required'),
    body('education.*.degree').notEmpty().withMessage('Degree is required'),
    body('education.*.fieldOfStudy').notEmpty().withMessage('Field of study is required'),
    body('education.*.graduationYear').isInt().withMessage('Valid graduation year is required'),
    validate
], saveStep4);

// Step 5 - Certifications
router.post('/step5', [
    body('certifications').optional().isArray().withMessage('Certifications must be an array'),
    validate
], saveStep5);

// Step 6 - References
router.post('/step6', [
    body('references').isArray().withMessage('References must be an array'),
    body('references.*.name').notEmpty().withMessage('Reference name is required'),
    body('references.*.designation').notEmpty().withMessage('Reference designation is required'),
    body('references.*.organization').notEmpty().withMessage('Reference organization is required'),
    body('references.*.email').isEmail().withMessage('Valid reference email is required'),
    body('references.*.phone').notEmpty().withMessage('Reference phone is required'),
    validate
], saveStep6);

// Step 7 - Upload Documents
router.post('/step7', uploadRegistrationDocuments, handleUploadError, saveStep7);

// Step 8 - Declaration
router.post('/step8', [
    body('agreed').equals('true').withMessage('You must agree to the declaration'),
    body('signature').notEmpty().withMessage('Signature is required'),
    validate
], saveStep8);

// Get registration progress
router.get('/progress', getProgress);

module.exports = router;
