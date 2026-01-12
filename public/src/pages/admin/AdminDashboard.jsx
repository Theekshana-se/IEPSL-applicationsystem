import React, { useState, useEffect } from 'react';
import { getStatistics } from '../../api/adminApi';
import { Users, UserCheck, Clock, XCircle, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStatistics();
    }, []);

    const loadStatistics = async () => {
        try {
            const response = await getStatistics();
            if (response.success) {
                setStats(response.data);
            }
        } catch (error) {
            console.error('Error loading statistics:', error);
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

    const statCards = [
        {
            title: 'Total Members',
            value: stats?.totalMembers || 0,
            icon: Users,
            color: 'bg-primary-100 text-primary-600',
            bgColor: 'bg-primary-50'
        },
        {
            title: 'Pending Applications',
            value: stats?.pendingApplications || 0,
            icon: Clock,
            color: 'bg-warning-100 text-warning-600',
            bgColor: 'bg-warning-50'
        },
        {
            title: 'Active Members',
            value: stats?.activeMembers || 0,
            icon: UserCheck,
            color: 'bg-success-100 text-success-600',
            bgColor: 'bg-success-50'
        },
        {
            title: 'Rejected Applications',
            value: stats?.rejectedApplications || 0,
            icon: XCircle,
            color: 'bg-error-100 text-error-600',
            bgColor: 'bg-error-50'
        },
        {
            title: 'Recent Registrations (30 days)',
            value: stats?.recentRegistrations || 0,
            icon: TrendingUp,
            color: 'bg-info-100 text-info-600',
            bgColor: 'bg-info-50'
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
                <p className="text-gray-600 mt-1">Overview of membership statistics</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="card">
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                    </div>
                                    <div className={`p-3 rounded-lg ${stat.color} ${stat.bgColor}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="card">
                <div className="card-header">
                    <h3 className="text-xl font-semibold">Quick Actions</h3>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <a href="/admin/pending" className="btn btn-primary">
                            <Clock className="w-4 h-4 mr-2" />
                            Review Pending Applications
                        </a>
                        <a href="/admin/members" className="btn btn-outline">
                            <Users className="w-4 h-4 mr-2" />
                            View All Members
                        </a>
                        <a href="/admin/statistics" className="btn btn-secondary">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            View Detailed Statistics
                        </a>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
                <div className="card-header">
                    <h3 className="text-xl font-semibold">System Overview</h3>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Membership Applications</p>
                                <p className="text-sm text-gray-600">
                                    {stats?.pendingApplications} applications awaiting review
                                </p>
                            </div>
                            <span className="badge badge-warning">Action Required</span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Active Memberships</p>
                                <p className="text-sm text-gray-600">
                                    {stats?.activeMembers} members with active status
                                </p>
                            </div>
                            <span className="badge badge-success">Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
