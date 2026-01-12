import React, { useState, useEffect } from 'react';
import { getMemberProfile } from '../../api/memberApi';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Briefcase,
    Building,
    Edit,
    Save,
    X
} from 'lucide-react';
import { formatDate } from '../../utils/helpers';

export default function MemberProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const response = await getMemberProfile();
            if (response.success) {
                setProfile(response.data.user);
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="spinner w-12 h-12"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">My Profile</h2>
                    <p className="text-gray-600 mt-1">View and manage your profile information</p>
                </div>
                {!isEditing && (
                    <button className="btn btn-outline" onClick={() => setIsEditing(true)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                    </button>
                )}
            </div>

            {/* Profile Header Card */}
            <div className="card">
                <div className="card-body">
                    <div className="flex items-start gap-6">
                        {/* Profile Photo */}
                        <div className="flex-shrink-0">
                            <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center">
                                {profile?.documents?.profilePhoto ? (
                                    <img
                                        src={`http://localhost:5000${profile.documents.profilePhoto}`}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover"
                                    />
                                ) : (
                                    <User className="w-16 h-16 text-primary-600" />
                                )}
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900">
                                {profile?.personalDetails?.fullName}
                            </h3>
                            <p className="text-lg text-gray-600 mt-1">
                                {profile?.personalDetails?.nameWithInitials}
                            </p>

                            <div className="flex flex-wrap gap-4 mt-4">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Mail className="w-4 h-4 text-primary-600" />
                                    <span>{profile?.personalDetails?.personalEmail}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Phone className="w-4 h-4 text-primary-600" />
                                    <span>{profile?.personalDetails?.mobileNumber}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <MapPin className="w-4 h-4 text-primary-600" />
                                    <span>{profile?.personalDetails?.district}</span>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="mt-4">
                                <span className={`badge badge-${profile?.status === 'active' ? 'success' :
                                        profile?.status === 'approved' ? 'success' :
                                            profile?.status === 'pending' ? 'warning' : 'error'
                                    } text-sm px-4 py-2`}>
                                    {profile?.status?.toUpperCase()}
                                </span>
                                {profile?.membershipId && (
                                    <span className="ml-3 text-sm text-gray-600">
                                        ID: <span className="font-mono font-semibold">{profile.membershipId}</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className="card">
                <div className="card-header">
                    <div className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        <h3 className="text-xl font-semibold">Personal Information</h3>
                    </div>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-medium text-gray-600">Full Name</label>
                            <p className="text-gray-900 font-semibold mt-1">
                                {profile?.personalDetails?.fullName || 'N/A'}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Name with Initials</label>
                            <p className="text-gray-900 font-semibold mt-1">
                                {profile?.personalDetails?.nameWithInitials || 'N/A'}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">NIC Number</label>
                            <p className="text-gray-900 font-semibold mt-1">
                                {profile?.personalDetails?.nicNumber || 'N/A'}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                            <p className="text-gray-900 font-semibold mt-1">
                                {profile?.personalDetails?.dateOfBirth
                                    ? formatDate(profile.personalDetails.dateOfBirth)
                                    : 'N/A'}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Gender</label>
                            <p className="text-gray-900 font-semibold mt-1 capitalize">
                                {profile?.personalDetails?.gender || 'N/A'}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Nationality</label>
                            <p className="text-gray-900 font-semibold mt-1">
                                {profile?.personalDetails?.nationality || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="card">
                <div className="card-header">
                    <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        <h3 className="text-xl font-semibold">Contact Information</h3>
                    </div>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-medium text-gray-600">Personal Email</label>
                            <p className="text-gray-900 font-semibold mt-1">
                                {profile?.personalDetails?.personalEmail || 'N/A'}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Mobile Number</label>
                            <p className="text-gray-900 font-semibold mt-1">
                                {profile?.personalDetails?.mobileNumber || 'N/A'}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">District</label>
                            <p className="text-gray-900 font-semibold mt-1">
                                {profile?.personalDetails?.district || 'N/A'}
                            </p>
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-600">Residential Address</label>
                            <p className="text-gray-900 font-semibold mt-1">
                                {profile?.personalDetails?.residentialAddress || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Office Information */}
            {profile?.officeDetails && (
                <div className="card">
                    <div className="card-header">
                        <div className="flex items-center gap-2">
                            <Building className="w-5 h-5" />
                            <h3 className="text-xl font-semibold">Office Information</h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Office Email</label>
                                <p className="text-gray-900 font-semibold mt-1">
                                    {profile.officeDetails.officeEmail || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Office Phone</label>
                                <p className="text-gray-900 font-semibold mt-1">
                                    {profile.officeDetails.officePhone || 'N/A'}
                                </p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-600">Office Address</label>
                                <p className="text-gray-900 font-semibold mt-1">
                                    {profile.officeDetails.officeAddress || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Professional Summary */}
            <div className="card">
                <div className="card-header">
                    <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        <h3 className="text-xl font-semibold">Professional Summary</h3>
                    </div>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-primary-50 rounded-lg">
                            <p className="text-3xl font-bold text-primary-600">
                                {profile?.workExperience?.length || 0}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">Work Experiences</p>
                        </div>
                        <div className="text-center p-4 bg-success-50 rounded-lg">
                            <p className="text-3xl font-bold text-success-600">
                                {profile?.education?.length || 0}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">Qualifications</p>
                        </div>
                        <div className="text-center p-4 bg-info-50 rounded-lg">
                            <p className="text-3xl font-bold text-info-600">
                                {profile?.certifications?.length || 0}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">Certifications</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Information */}
            <div className="card">
                <div className="card-header">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <h3 className="text-xl font-semibold">Account Information</h3>
                    </div>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-medium text-gray-600">Member Since</label>
                            <p className="text-gray-900 font-semibold mt-1">
                                {formatDate(profile?.createdAt)}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Last Updated</label>
                            <p className="text-gray-900 font-semibold mt-1">
                                {formatDate(profile?.updatedAt)}
                            </p>
                        </div>
                        {profile?.submittedAt && (
                            <div>
                                <label className="text-sm font-medium text-gray-600">Application Submitted</label>
                                <p className="text-gray-900 font-semibold mt-1">
                                    {formatDate(profile.submittedAt)}
                                </p>
                            </div>
                        )}
                        {profile?.approvedAt && (
                            <div>
                                <label className="text-sm font-medium text-gray-600">Approved On</label>
                                <p className="text-gray-900 font-semibold mt-1">
                                    {formatDate(profile.approvedAt)}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
                <div className="card-header">
                    <h3 className="text-xl font-semibold">Quick Actions</h3>
                </div>
                <div className="card-body">
                    <div className="flex flex-wrap gap-4">
                        <a href="/member/registration-details" className="btn btn-outline">
                            View Full Registration Details
                        </a>
                        {profile?.membershipId && (
                            <a href="/member/membership-card" className="btn btn-primary">
                                View Membership Card
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
