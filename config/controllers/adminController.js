const Member = require('../models/Member');
const Notification = require('../models/Notification');
const generateMembershipId = require('../utils/generateMembershipId');
const { sendApprovalEmail, sendRejectionEmail } = require('../utils/emailService');

// @desc    Get all pending registrations
// @route   GET /api/admin/pending-registrations
// @access  Private (Admin)
exports.getPendingRegistrations = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;

        const query = {
            status: 'pending',
            submittedAt: { $exists: true }
        };

        // Add search functionality
        if (search) {
            query.$or = [
                { 'personalDetails.fullName': { $regex: search, $options: 'i' } },
                { 'personalDetails.nameWithInitials': { $regex: search, $options: 'i' } },
                { 'personalDetails.nicNumber': { $regex: search, $options: 'i' } },
                { 'personalDetails.personalEmail': { $regex: search, $options: 'i' } }
            ];
        }

        const total = await Member.countDocuments(query);
        const members = await Member.find(query)
            .sort({ submittedAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .select('personalDetails officeDetails submittedAt registrationProgress');

        res.status(200).json({
            success: true,
            data: {
                members,
                pagination: {
                    total,
                    page: parseInt(page),
                    pages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all members
// @route   GET /api/admin/members
// @access  Private (Admin)
exports.getAllMembers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search = '', status = '' } = req.query;

        const query = {};

        // Filter by status
        if (status) {
            query.status = status;
        }

        // Add search functionality
        if (search) {
            query.$or = [
                { 'personalDetails.fullName': { $regex: search, $options: 'i' } },
                { 'personalDetails.nameWithInitials': { $regex: search, $options: 'i' } },
                { 'personalDetails.nicNumber': { $regex: search, $options: 'i' } },
                { membershipId: { $regex: search, $options: 'i' } }
            ];
        }

        const total = await Member.countDocuments(query);
        const members = await Member.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .select('personalDetails membershipId status createdAt registrationProgress');

        res.status(200).json({
            success: true,
            data: {
                members,
                pagination: {
                    total,
                    page: parseInt(page),
                    pages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get member details
// @route   GET /api/admin/member/:id
// @access  Private (Admin)
exports.getMemberDetails = async (req, res, next) => {
    try {
        const member = await Member.findById(req.params.id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Member not found'
            });
        }

        res.status(200).json({
            success: true,
            data: { member }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Approve member registration
// @route   PUT /api/admin/member/:id/approve
// @access  Private (Admin - admin, super_admin)
exports.approveMember = async (req, res, next) => {
    try {
        const member = await Member.findById(req.params.id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Member not found'
            });
        }

        if (member.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: `Cannot approve member with status: ${member.status}`
            });
        }

        // Generate membership ID
        const membershipId = await generateMembershipId();

        // Update member
        member.status = 'approved';
        member.membershipId = membershipId;
        member.reviewedBy = req.user._id;
        member.reviewedAt = new Date();
        member.reviewNotes = req.body.notes || '';

        await member.save();

        // Send approval email
        sendApprovalEmail(
            member.personalDetails.personalEmail,
            member.personalDetails.nameWithInitials,
            membershipId
        ).catch(err => console.error('Error sending approval email:', err));

        // Create notification for member
        await Notification.create({
            recipientId: member._id,
            recipientType: 'member',
            type: 'application_approved',
            title: 'Application Approved!',
            message: `Congratulations! Your membership application has been approved. Your membership ID is ${membershipId}`,
            metadata: { membershipId }
        });

        res.status(200).json({
            success: true,
            message: 'Member approved successfully',
            data: {
                member: {
                    id: member._id,
                    membershipId: member.membershipId,
                    status: member.status
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Reject member registration
// @route   PUT /api/admin/member/:id/reject
// @access  Private (Admin - admin, super_admin)
exports.rejectMember = async (req, res, next) => {
    try {
        const { reason } = req.body;

        const member = await Member.findById(req.params.id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Member not found'
            });
        }

        if (member.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: `Cannot reject member with status: ${member.status}`
            });
        }

        // Update member
        member.status = 'rejected';
        member.reviewedBy = req.user._id;
        member.reviewedAt = new Date();
        member.reviewNotes = reason || '';

        await member.save();

        // Send rejection email
        sendRejectionEmail(
            member.personalDetails.personalEmail,
            member.personalDetails.nameWithInitials,
            reason
        ).catch(err => console.error('Error sending rejection email:', err));

        // Create notification for member
        await Notification.create({
            recipientId: member._id,
            recipientType: 'member',
            type: 'application_rejected',
            title: 'Application Status Update',
            message: 'Your membership application has been reviewed. Please check your email for details.',
            metadata: { reason }
        });

        res.status(200).json({
            success: true,
            message: 'Member rejected',
            data: {
                member: {
                    id: member._id,
                    status: member.status
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/statistics
// @access  Private (Admin)
exports.getStatistics = async (req, res, next) => {
    try {
        const totalMembers = await Member.countDocuments({ status: { $in: ['approved', 'active'] } });
        const pendingApplications = await Member.countDocuments({ status: 'pending', submittedAt: { $exists: true } });
        const activeMembers = await Member.countDocuments({ status: 'active' });
        const rejectedApplications = await Member.countDocuments({ status: 'rejected' });

        // Get recent registrations (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentRegistrations = await Member.countDocuments({
            createdAt: { $gte: thirtyDaysAgo }
        });

        res.status(200).json({
            success: true,
            data: {
                totalMembers,
                pendingApplications,
                activeMembers,
                rejectedApplications,
                recentRegistrations
            }
        });
    } catch (error) {
        next(error);
    }
};
