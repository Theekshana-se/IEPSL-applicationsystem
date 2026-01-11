/**
 * Generate unique membership ID
 * Format: IEPSL-YYYY-XXX
 * Example: IEPSL-2026-001
 */
const Member = require('../models/Member');

const generateMembershipId = async () => {
    const currentYear = new Date().getFullYear();
    const prefix = `IEPSL-${currentYear}-`;

    try {
        // Find the last membership ID for current year
        const lastMember = await Member.findOne({
            membershipId: { $regex: `^${prefix}` }
        }).sort({ membershipId: -1 });

        let nextNumber = 1;

        if (lastMember && lastMember.membershipId) {
            // Extract the number part and increment
            const lastNumber = parseInt(lastMember.membershipId.split('-')[2]);
            nextNumber = lastNumber + 1;
        }

        // Pad with zeros (3 digits)
        const paddedNumber = String(nextNumber).padStart(3, '0');

        return `${prefix}${paddedNumber}`;
    } catch (error) {
        console.error('Error generating membership ID:', error);
        throw error;
    }
};

module.exports = generateMembershipId;
