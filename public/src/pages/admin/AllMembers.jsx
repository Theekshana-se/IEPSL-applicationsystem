import React, { useState, useEffect } from 'react';
import { getAllMembers, getMemberDetails } from '../../api/adminApi';
import { Search, Eye, Filter, Download, Users as UsersIcon } from 'lucide-react';
import { formatDate, getStatusColor } from '../../utils/helpers';

export default function AllMembers() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedMember, setSelectedMember] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadMembers();
    }, [search, statusFilter]);

    const loadMembers = async () => {
        try {
            const response = await getAllMembers(1, 100, search, statusFilter);
            if (response.success) {
                setMembers(response.data.members);
            }
        } catch (error) {
            console.error('Error loading members:', error);
        } finally {
            setLoading(false);
        }
    };

    const viewDetails = async (memberId) => {
        try {
            const response = await getMemberDetails(memberId);
            if (response.success) {
                setSelectedMember(response.data.member);
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error loading member details:', error);
        }
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            pending: 'badge-warning',
            approved: 'badge-success',
            active: 'badge-success',
            rejected: 'badge-error'
        };
        return statusMap[status] || 'badge-secondary';
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">All Members</h2>
                    <p className="text-gray-600 mt-1">View and manage all registered members</p>
                </div>
                <button className="btn btn-outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="card">
                    <div className="card-body">
                        <p className="text-sm text-gray-600">Total Members</p>
                        <p className="text-3xl font-bold text-gray-900">{members.length}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <p className="text-sm text-gray-600">Active</p>
                        <p className="text-3xl font-bold text-success">
                            {members.filter(m => m.status === 'active').length}
                        </p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <p className="text-sm text-gray-600">Pending</p>
                        <p className="text-3xl font-bold text-warning">
                            {members.filter(m => m.status === 'pending').length}
                        </p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <p className="text-sm text-gray-600">Rejected</p>
                        <p className="text-3xl font-bold text-error">
                            {members.filter(m => m.status === 'rejected').length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="card">
                <div className="card-body">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by name, email, NIC, or membership ID..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="input pl-10 w-full"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="input pl-10 w-full"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="active">Active</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Members Table */}
            <div className="card">
                <div className="card-body p-0">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="spinner w-12 h-12"></div>
                        </div>
                    ) : members.length === 0 ? (
                        <div className="text-center py-12">
                            <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No members found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead className="table-header">
                                    <tr>
                                        <th className="table-header-cell">Membership ID</th>
                                        <th className="table-header-cell">Name</th>
                                        <th className="table-header-cell">Email</th>
                                        <th className="table-header-cell">District</th>
                                        <th className="table-header-cell">Status</th>
                                        <th className="table-header-cell">Joined</th>
                                        <th className="table-header-cell">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {members.map((member) => (
                                        <tr key={member._id}>
                                            <td className="table-cell font-mono text-sm">
                                                {member.membershipId || 'N/A'}
                                            </td>
                                            <td className="table-cell font-medium">
                                                {member.personalDetails?.nameWithInitials}
                                            </td>
                                            <td className="table-cell text-gray-600">
                                                {member.personalDetails?.personalEmail}
                                            </td>
                                            <td className="table-cell">{member.personalDetails?.district}</td>
                                            <td className="table-cell">
                                                <span className={`badge ${getStatusBadge(member.status)}`}>
                                                    {member.status}
                                                </span>
                                            </td>
                                            <td className="table-cell">{formatDate(member.createdAt)}</td>
                                            <td className="table-cell">
                                                <button
                                                    onClick={() => viewDetails(member._id)}
                                                    className="btn btn-ghost btn-sm"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Member Details Modal */}
            {showModal && selectedMember && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                            <h3 className="text-2xl font-bold">Member Details</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                                ✕
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Status */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-sm text-gray-600">Membership Status</p>
                                    <p className="text-lg font-semibold capitalize">{selectedMember.status}</p>
                                </div>
                                {selectedMember.membershipId && (
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Membership ID</p>
                                        <p className="text-lg font-mono font-semibold">{selectedMember.membershipId}</p>
                                    </div>
                                )}
                            </div>

                            {/* Personal Details */}
                            <div>
                                <h4 className="text-lg font-semibold mb-3">Personal Details</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><span className="font-medium">Full Name:</span> {selectedMember.personalDetails?.fullName}</div>
                                    <div><span className="font-medium">NIC:</span> {selectedMember.personalDetails?.nicNumber}</div>
                                    <div><span className="font-medium">Email:</span> {selectedMember.personalDetails?.personalEmail}</div>
                                    <div><span className="font-medium">Mobile:</span> {selectedMember.personalDetails?.mobileNumber}</div>
                                    <div><span className="font-medium">District:</span> {selectedMember.personalDetails?.district}</div>
                                    <div><span className="font-medium">Gender:</span> {selectedMember.personalDetails?.gender}</div>
                                </div>
                            </div>

                            {/* Professional Info */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-primary-50 rounded-lg">
                                    <p className="text-2xl font-bold text-primary-600">
                                        {selectedMember.workExperience?.length || 0}
                                    </p>
                                    <p className="text-sm text-gray-600">Work Experiences</p>
                                </div>
                                <div className="text-center p-4 bg-success-50 rounded-lg">
                                    <p className="text-2xl font-bold text-success-600">
                                        {selectedMember.education?.length || 0}
                                    </p>
                                    <p className="text-sm text-gray-600">Qualifications</p>
                                </div>
                                <div className="text-center p-4 bg-info-50 rounded-lg">
                                    <p className="text-2xl font-bold text-info-600">
                                        {selectedMember.certifications?.length || 0}
                                    </p>
                                    <p className="text-sm text-gray-600">Certifications</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
