import api from './axios';

// Save registration step
export const saveRegistrationStep = async (stepNumber, data) => {
    const response = await api.post(`/registration/step${stepNumber}`, data);
    return response.data;
};

// Upload documents (Step 7)
export const uploadDocuments = async (formData) => {
    const response = await api.post('/registration/step7', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

// Get registration progress
export const getRegistrationProgress = async () => {
    const response = await api.get('/registration/progress');
    return response.data;
};
