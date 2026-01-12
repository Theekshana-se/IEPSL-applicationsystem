import React, { useState, useEffect } from 'react';
import { getPendingRegistrations, approveMember, rejectMember, getMemberDetails } from '../../api/adminApi';
import { Search, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

export default function PendingRegistrations() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedMember, setSelectedMember] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        loadApplications();
    }, [search]);

    const loadApplications = async () => {
        try {
            const response = await getPendingRegistrations(1, 50, search);
            if (response.success) {
                setApplications(response.data.members);
            }
        } catch (error) {
            console.error('Error loading applications:', error);
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

    const handleApprove = async (memberId) => {
        if (!confirm('Are you sure you want to approve this application?')) return;

        setActionLoading(true);
        try {
            await approveMember(memberId);
            alert('Member approved successfully!');
            loadApplications();
            setShowModal(false);
        } catch (error) {
            alert('Error approving member: ' + error.message);
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async (memberId) => {
        const reason = prompt('Please enter rejection reason:');
        if (!reason) return;

        setActionLoading(true);
        try {
            await rejectMember(memberId, reason);
            alert('Member rejected successfully!');
            loadApplications();
            setShowModal(false);
        } catch (error) {
            alert('Error rejecting member: ' + error.message);
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Pending Registrations</h2>
                    <p className="text-gray-600 mt-1">Review and approve membership applications</p>
                </div>
                <span className="badge badge-warning text-lg px-4 py-2">
                    {applications.length} Pending
                </span>
            </div>

            {/* Search */}
            <div className="card">
                <div className="card-body">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or NIC..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input pl-10 w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Applications Table */}
            <div className="card">
                <div className="card-body p-0">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="spinner w-12 h-12"></div>
                        </div>
                    ) : applications.length === 0 ? (
                        <div className="text-center py-12">
                            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No pending applications</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead className="table-header">
                                    <tr>
                                        <th className="table-header-cell">Name</th>
                                        <th className="table-header-cell">Email</th>
                                        <th className="table-header-cell">NIC</th>
                                        <th className="table-header-cell">District</th>
                                        <th className="table-header-cell">Submitted</th>
                                        <th className="table-header-cell">Progress</th>
                                        <th className="table-header-cell">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {applications.map((member) => (
                                        <tr key={member._id}>
                                            <td className="table-cell font-medium">
                                                {member.personalDetails?.nameWithInitials}
                                            </td>
                                            <td className="table-cell text-gray-600">
                                                {member.personalDetails?.personalEmail}
                                            </td>
                                            <td className="table-cell">{member.personalDetails?.nicNumber}</td>
                                            <td className="table-cell">{member.personalDetails?.district}</td>
                                            <td className="table-cell">{formatDate(member.submittedAt)}</td>
                                            <td className="table-cell">
                                                <span className="badge badge-primary">{member.registrationProgress}%</span>
                                            </td>
                                            <td className="table-cell">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => viewDetails(member._id)}
                                                        className="btn btn-ghost btn-sm"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleApprove(member._id)}
                                                        className="btn btn-ghost btn-sm text-success"
                                                        disabled={actionLoading}
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(member._id)}
                                                        className="btn btn-ghost btn-sm text-error"
                                                        disabled={actionLoading}
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                </div>
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
                            <h3 className="text-2xl font-bold">Application Details</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Personal Details */}
                            <div>
                                <h4 className="text-lg font-semibold mb-3">Personal Details</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><span className="font-medium">Name:</span> {selectedMember.personalDetails?.fullName}</div>
                                    <div><span className="font-medium">NIC:</span> {selectedMember.personalDetails?.nicNumber}</div>
                                    <div><span className="font-medium">Email:</span> {selectedMember.personalDetails?.personalEmail}</div>
                                    <div><span className="font-medium">Mobile:</span> {selectedMember.personalDetails?.mobileNumber}</div>
                                    <div><span className="font-medium">District:</span> {selectedMember.personalDetails?.district}</div>
                                    <div><span className="font-medium">Gender:</span> {selectedMember.personalDetails?.gender}</div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 pt-4 border-t">
                                <button
                                    onClick={() => handleApprove(selectedMember._id)}
                                    disabled={actionLoading}
                                    className="btn btn-primary flex-1"
                                >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Approve Application
                                </button>
                                <button
                                    onClick={() => handleReject(selectedMember._id)}
                                    disabled={actionLoading}
                                    className="btn btn-danger flex-1"
                                >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Reject Application
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
