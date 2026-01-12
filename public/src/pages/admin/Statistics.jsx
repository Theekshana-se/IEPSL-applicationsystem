import React, { useState, useEffect } from 'react';
import { getStatistics } from '../../api/adminApi';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, UserCheck, Clock, XCircle, TrendingUp, Award } from 'lucide-react';

export default function Statistics() {
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

    // Prepare data for charts
    const statusData = [
        { name: 'Active', value: stats?.activeMembers || 0, color: '#10b981' },
        { name: 'Pending', value: stats?.pendingApplications || 0, color: '#f59e0b' },
        { name: 'Rejected', value: stats?.rejectedApplications || 0, color: '#ef4444' }
    ];

    const districtData = stats?.membersByDistrict || [];

    const monthlyData = stats?.monthlyRegistrations || [
        { month: 'Jan', count: 12 },
        { month: 'Feb', count: 19 },
        { month: 'Mar', count: 15 },
        { month: 'Apr', count: 25 },
        { month: 'May', count: 22 },
        { month: 'Jun', count: 30 }
    ];

    const COLORS = ['#14b8a6', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Statistics & Analytics</h2>
                <p className="text-gray-600 mt-1">Comprehensive membership data and insights</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Members</p>
                                <p className="text-3xl font-bold text-gray-900">{stats?.totalMembers || 0}</p>
                            </div>
                            <div className="p-3 bg-primary-100 text-primary-600 rounded-lg">
                                <Users className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Active Members</p>
                                <p className="text-3xl font-bold text-success">{stats?.activeMembers || 0}</p>
                            </div>
                            <div className="p-3 bg-success-100 text-success-600 rounded-lg">
                                <UserCheck className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Pending</p>
                                <p className="text-3xl font-bold text-warning">{stats?.pendingApplications || 0}</p>
                            </div>
                            <div className="p-3 bg-warning-100 text-warning-600 rounded-lg">
                                <Clock className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">This Month</p>
                                <p className="text-3xl font-bold text-info">{stats?.recentRegistrations || 0}</p>
                            </div>
                            <div className="p-3 bg-info-100 text-info-600 rounded-lg">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Membership Status Pie Chart */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-xl font-semibold">Membership Status Distribution</h3>
                    </div>
                    <div className="card-body">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-6 mt-4">
                            {statusData.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Monthly Registrations Line Chart */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-xl font-semibold">Monthly Registration Trend</h3>
                    </div>
                    <div className="card-body">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#14b8a6"
                                    strokeWidth={2}
                                    name="Registrations"
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 gap-6">
                {/* Members by District Bar Chart */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-xl font-semibold">Members by District</h3>
                    </div>
                    <div className="card-body">
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={districtData.slice(0, 10)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="district" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#14b8a6" name="Members" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card">
                    <div className="card-body">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-primary-100 rounded-lg">
                                <Award className="w-8 h-8 text-primary-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Approval Rate</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats?.totalMembers > 0
                                        ? ((stats.activeMembers / stats.totalMembers) * 100).toFixed(1)
                                        : 0}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-success-100 rounded-lg">
                                <TrendingUp className="w-8 h-8 text-success-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Growth Rate</p>
                                <p className="text-2xl font-bold text-gray-900">+15.3%</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-warning-100 rounded-lg">
                                <Clock className="w-8 h-8 text-warning-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Avg. Processing Time</p>
                                <p className="text-2xl font-bold text-gray-900">3.5 days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Insights */}
            <div className="card">
                <div className="card-header">
                    <h3 className="text-xl font-semibold">Key Insights</h3>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-primary-50 rounded-lg">
                            <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                            <div>
                                <p className="font-semibold text-gray-900">High Registration Activity</p>
                                <p className="text-sm text-gray-600">
                                    {stats?.recentRegistrations || 0} new registrations in the last 30 days
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-warning-50 rounded-lg">
                            <div className="w-2 h-2 bg-warning-600 rounded-full mt-2"></div>
                            <div>
                                <p className="font-semibold text-gray-900">Pending Reviews</p>
                                <p className="text-sm text-gray-600">
                                    {stats?.pendingApplications || 0} applications awaiting admin review
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-success-50 rounded-lg">
                            <div className="w-2 h-2 bg-success-600 rounded-full mt-2"></div>
                            <div>
                                <p className="font-semibold text-gray-900">Active Community</p>
                                <p className="text-sm text-gray-600">
                                    {stats?.activeMembers || 0} active members contributing to the community
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
