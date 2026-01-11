import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegistrationFlow from './pages/RegistrationFlow';

// Admin
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import PendingRegistrations from './pages/admin/PendingRegistrations';
import AllMembers from './pages/admin/AllMembers';
import Statistics from './pages/admin/Statistics';

// Member
import MemberLayout from './components/layout/MemberLayout';
import MemberDashboard from './pages/member/MemberDashboard';
import MemberProfile from './pages/member/MemberProfile';
import RegistrationDetails from './pages/member/RegistrationDetails';
import MembershipCard from './pages/member/MembershipCard';

import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/registration/*" element={<RegistrationFlow />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="pending" element={<PendingRegistrations />} />
          <Route path="members" element={<AllMembers />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>

        {/* Member Routes */}
        <Route path="/member" element={<MemberLayout />}>
          <Route index element={<Navigate to="/member/dashboard" replace />} />
          <Route path="dashboard" element={<MemberDashboard />} />
          <Route path="profile" element={<MemberProfile />} />
          <Route path="registration-details" element={<RegistrationDetails />} />
          <Route path="membership-card" element={<MembershipCard />} />
          <Route path="notifications" element={<MemberDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;