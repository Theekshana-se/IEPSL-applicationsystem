import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { saveRegistrationStep } from '../../api/registrationApi';
import { Plus, Trash2 } from 'lucide-react';

export default function Step5Certifications({ onComplete }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        control,
        handleSubmit,
    } = useForm({
        defaultValues: {
            certifications: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'certifications'
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await saveRegistrationStep(5, data);
            if (response.success) {
                onComplete?.();
                navigate('/registration/step6');
            }
        } catch (err) {
            setError(err.message || 'Failed to save. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="card">
                <div className="card-header">
                    <h2 className="text-2xl font-semibold text-gray-900">Step 5: Professional Certifications</h2>
                    <p className="text-gray-600 text-sm mt-1">
                        Add your professional certifications (optional)
                    </p>
                </div>

                <div className="card-body">
                    {error && (
                        <div className="mb-6 p-4 bg-error-light border border-error rounded-lg text-error-dark">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {fields.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <p>No certifications added yet. Click below to add one.</p>
                            </div>
                        )}

                        {fields.map((field, index) => (
                            <div key={field.id} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Certification {index + 1}
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-error hover:text-error-dark"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="label">Certification Name</label>
                                            <input
                                                {...register(`certifications.${index}.name`)}
                                                className="input"
                                                placeholder="e.g., PMP, LEED AP"
                                            />
                                        </div>

                                        <div>
                                            <label className="label">Issuing Organization</label>
                                            <input
                                                {...register(`certifications.${index}.issuingOrganization`)}
                                                className="input"
                                                placeholder="Organization name"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="label">Issue Date</label>
                                            <input
                                                type="date"
                                                {...register(`certifications.${index}.issueDate`)}
                                                className="input"
                                            />
                                        </div>

                                        <div>
                                            <label className="label">Expiry Date</label>
                                            <input
                                                type="date"
                                                {...register(`certifications.${index}.expiryDate`)}
                                                className="input"
                                            />
                                        </div>

                                        <div>
                                            <label className="label">Credential ID</label>
                                            <input
                                                {...register(`certifications.${index}.credentialId`)}
                                                className="input"
                                                placeholder="ID number"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => append({ name: '', issuingOrganization: '', issueDate: '', expiryDate: '', credentialId: '' })}
                            className="btn btn-outline w-full"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Certification
                        </button>

                        <div className="flex items-center justify-between pt-6 border-t">
                            <button
                                type="button"
                                onClick={() => navigate('/registration/step4')}
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
                                        Saving...
                                    </span>
                                ) : (
                                    'Continue to Step 6'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
