import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { saveRegistrationStep } from '../../api/registrationApi';
import { Plus, Trash2 } from 'lucide-react';

const referencesSchema = z.object({
    references: z.array(z.object({
        name: z.string().min(1, 'Name is required'),
        designation: z.string().min(1, 'Designation is required'),
        organization: z.string().min(1, 'Organization is required'),
        email: z.string().email('Invalid email'),
        phone: z.string().min(1, 'Phone is required'),
        relationship: z.string().optional()
    })).min(2, 'At least two references are required')
});

export default function Step6References({ onComplete }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(referencesSchema),
        defaultValues: {
            references: [
                { name: '', designation: '', organization: '', email: '', phone: '', relationship: '' },
                { name: '', designation: '', organization: '', email: '', phone: '', relationship: '' }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'references'
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await saveRegistrationStep(6, data);
            if (response.success) {
                onComplete?.();
                navigate('/registration/step7');
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
                    <h2 className="text-2xl font-semibold text-gray-900">Step 6: Professional References</h2>
                    <p className="text-gray-600 text-sm mt-1">
                        Provide at least two professional references
                    </p>
                </div>

                <div className="card-body">
                    {error && (
                        <div className="mb-6 p-4 bg-error-light border border-error rounded-lg text-error-dark">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {fields.map((field, index) => (
                            <div key={field.id} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Reference {index + 1}
                                    </h3>
                                    {fields.length > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-error hover:text-error-dark"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="label">
                                                Name <span className="text-error">*</span>
                                            </label>
                                            <input
                                                {...register(`references.${index}.name`)}
                                                className={`input ${errors.references?.[index]?.name ? 'input-error' : ''}`}
                                                placeholder="Full name"
                                            />
                                            {errors.references?.[index]?.name && (
                                                <p className="error-message">{errors.references[index].name.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="label">
                                                Designation <span className="text-error">*</span>
                                            </label>
                                            <input
                                                {...register(`references.${index}.designation`)}
                                                className={`input ${errors.references?.[index]?.designation ? 'input-error' : ''}`}
                                                placeholder="Job title"
                                            />
                                            {errors.references?.[index]?.designation && (
                                                <p className="error-message">{errors.references[index].designation.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="label">
                                            Organization <span className="text-error">*</span>
                                        </label>
                                        <input
                                            {...register(`references.${index}.organization`)}
                                            className={`input ${errors.references?.[index]?.organization ? 'input-error' : ''}`}
                                            placeholder="Company/Organization name"
                                        />
                                        {errors.references?.[index]?.organization && (
                                            <p className="error-message">{errors.references[index].organization.message}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="label">
                                                Email <span className="text-error">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                {...register(`references.${index}.email`)}
                                                className={`input ${errors.references?.[index]?.email ? 'input-error' : ''}`}
                                                placeholder="email@example.com"
                                            />
                                            {errors.references?.[index]?.email && (
                                                <p className="error-message">{errors.references[index].email.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="label">
                                                Phone <span className="text-error">*</span>
                                            </label>
                                            <input
                                                {...register(`references.${index}.phone`)}
                                                className={`input ${errors.references?.[index]?.phone ? 'input-error' : ''}`}
                                                placeholder="Contact number"
                                            />
                                            {errors.references?.[index]?.phone && (
                                                <p className="error-message">{errors.references[index].phone.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="label">Relationship</label>
                                        <input
                                            {...register(`references.${index}.relationship`)}
                                            className="input"
                                            placeholder="e.g., Former supervisor, Colleague"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => append({ name: '', designation: '', organization: '', email: '', phone: '', relationship: '' })}
                            className="btn btn-outline w-full"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Another Reference
                        </button>

                        {errors.references?.root && (
                            <p className="error-message">{errors.references.root.message}</p>
                        )}

                        <div className="flex items-center justify-between pt-6 border-t">
                            <button
                                type="button"
                                onClick={() => navigate('/registration/step5')}
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
                                    'Continue to Step 7'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
