import api from './axios';

// Register new member
export const registerMember = async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
};

// Login
export const login = async (email, password, userType) => {
    const response = await api.post('/auth/login', { email, password, userType });

    // Store token and user data
    if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }

    return response.data;
};

// Logout
export const logout = async () => {
    try {
        await api.post('/auth/logout');
    } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

// Get current user
export const getCurrentUser = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

// Get user from localStorage
export const getStoredUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};
