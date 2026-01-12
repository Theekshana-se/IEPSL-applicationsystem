import api from './axios';

// Get pending registrations
export const getPendingRegistrations = async (page = 1, limit = 10, search = '') => {
    const response = await api.get('/admin/pending-registrations', {
        params: { page, limit, search }
    });
    return response.data;
};

// Get all members
export const getAllMembers = async (page = 1, limit = 10, search = '', status = '') => {
    const response = await api.get('/admin/members', {
        params: { page, limit, search, status }
    });
    return response.data;
};

// Get member details
export const getMemberDetails = async (memberId) => {
    const response = await api.get(`/admin/member/${memberId}`);
    return response.data;
};

// Approve member
export const approveMember = async (memberId, notes = '') => {
    const response = await api.put(`/admin/member/${memberId}/approve`, { notes });
    return response.data;
};

// Reject member
export const rejectMember = async (memberId, reason) => {
    const response = await api.put(`/admin/member/${memberId}/reject`, { reason });
    return response.data;
};

// Get dashboard statistics
export const getStatistics = async () => {
    const response = await api.get('/admin/statistics');
    return response.data;
};
