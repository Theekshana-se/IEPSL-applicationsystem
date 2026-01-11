const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validationMiddleware');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const {
    getPendingRegistrations,
    getAllMembers,
    getMemberDetails,
    approveMember,
    rejectMember,
    getStatistics
} = require('../controllers/adminController');

// All routes require admin authentication
router.use(protect);
router.use(restrictTo('admin', 'super_admin', 'reviewer'));

// Statistics
router.get('/statistics', getStatistics);

// Pending registrations
router.get('/pending-registrations', getPendingRegistrations);

// All members
router.get('/members', getAllMembers);

// Member details
router.get('/member/:id', getMemberDetails);

// Approve member (admin and super_admin only)
router.put('/member/:id/approve',
    restrictTo('admin', 'super_admin'),
    [
        body('notes').optional(),
        validate
    ],
    approveMember
);

// Reject member (admin and super_admin only)
router.put('/member/:id/reject',
    restrictTo('admin', 'super_admin'),
    [
        body('reason').notEmpty().withMessage('Rejection reason is required'),
        validate
    ],
    rejectMember
);

module.exports = router;
