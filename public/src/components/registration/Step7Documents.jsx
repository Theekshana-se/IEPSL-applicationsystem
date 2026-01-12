import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadDocuments } from '../../api/registrationApi';
import { Upload, FileText, CheckCircle2 } from 'lucide-react';

export default function Step7Documents({ onComplete }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState({
        profilePhoto: null,
        nicCopy: null,
        degreeCertificates: [],
        cvDocument: null
    });

    const handleFileChange = (fieldName, files) => {
        if (fieldName === 'degreeCertificates') {
            setUploadedFiles(prev => ({
                ...prev,
                [fieldName]: Array.from(files)
            }));
        } else {
            setUploadedFiles(prev => ({
                ...prev,
                [fieldName]: files[0]
            }));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const formData = new FormData();

            if (uploadedFiles.profilePhoto) {
                formData.append('profilePhoto', uploadedFiles.profilePhoto);
            }
            if (uploadedFiles.nicCopy) {
                formData.append('nicCopy', uploadedFiles.nicCopy);
            }
            if (uploadedFiles.cvDocument) {
                formData.append('cvDocument', uploadedFiles.cvDocument);
            }
            if (uploadedFiles.degreeCertificates.length > 0) {
                uploadedFiles.degreeCertificates.forEach(file => {
                    formData.append('degreeCertificates', file);
                });
            }

            const response = await uploadDocuments(formData);
            if (response.success) {
                onComplete?.();
                navigate('/registration/step8');
            }
        } catch (err) {
            setError(err.message || 'Failed to upload documents. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const FileUploadBox = ({ label, fieldName, accept, multiple = false, required = false }) => {
        const files = multiple ? uploadedFiles[fieldName] : (uploadedFiles[fieldName] ? [uploadedFiles[fieldName]] : []);

        return (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 transition-colors">
                <div className="flex flex-col items-center">
                    <Upload className="w-10 h-10 text-gray-400 mb-3" />
                    <label className="label text-center mb-2">
                        {label} {required && <span className="text-error">*</span>}
                    </label>
                    <input
                        type="file"
                        accept={accept}
                        multiple={multiple}
                        onChange={(e) => handleFileChange(fieldName, e.target.files)}
                        className="hidden"
                        id={fieldName}
                    />
                    <label
                        htmlFor={fieldName}
                        className="btn btn-outline cursor-pointer"
                    >
                        Choose File{multiple ? 's' : ''}
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                        {accept.includes('image') ? 'JPG, PNG (Max 5MB)' : 'PDF, DOC, DOCX (Max 5MB)'}
                    </p>

                    {files.length > 0 && (
                        <div className="mt-4 w-full space-y-2">
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-gray-700 bg-primary-50 p-2 rounded">
                                    <CheckCircle2 className="w-4 h-4 text-success" />
                                    <FileText className="w-4 h-4" />
                                    <span className="flex-1 truncate">{file.name}</span>
                                    <span className="text-xs text-gray-500">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="card">
                <div className="card-header">
                    <h2 className="text-2xl font-semibold text-gray-900">Step 7: Upload Documents</h2>
                    <p className="text-gray-600 text-sm mt-1">
                        Upload required documents for verification
                    </p>
                </div>

                <div className="card-body">
                    {error && (
                        <div className="mb-6 p-4 bg-error-light border border-error rounded-lg text-error-dark">
                            {error}
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FileUploadBox
                                label="Profile Photo"
                                fieldName="profilePhoto"
                                accept="image/jpeg,image/jpg,image/png"
                            />

                            <FileUploadBox
                                label="NIC Copy"
                                fieldName="nicCopy"
                                accept="image/jpeg,image/jpg,image/png,application/pdf"
                            />
                        </div>

                        <FileUploadBox
                            label="Degree Certificates"
                            fieldName="degreeCertificates"
                            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            multiple={true}
                        />

                        <FileUploadBox
                            label="CV/Resume"
                            fieldName="cvDocument"
                            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        />

                        <div className="bg-info-light border border-info rounded-lg p-4">
                            <h4 className="font-semibold text-info-dark mb-2">Important Notes:</h4>
                            <ul className="text-sm text-info-dark space-y-1 list-disc list-inside">
                                <li>All documents must be clear and readable</li>
                                <li>Maximum file size: 5MB per file</li>
                                <li>Accepted formats: JPG, PNG, PDF, DOC, DOCX</li>
                                <li>You can upload multiple degree certificates</li>
                            </ul>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t">
                            <button
                                type="button"
                                onClick={() => navigate('/registration/step6')}
                                className="btn btn-secondary"
                            >
                                Previous Step
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn btn-primary px-8"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="spinner w-4 h-4"></div>
                                        Uploading...
                                    </span>
                                ) : (
                                    'Continue to Step 8'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
