import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { saveRegistrationStep } from '../../api/registrationApi';
import { Plus, Trash2 } from 'lucide-react';

const educationSchema = z.object({
    education: z.array(z.object({
        institution: z.string().min(1, 'Institution is required'),
        degree: z.string().min(1, 'Degree is required'),
        fieldOfStudy: z.string().min(1, 'Field of study is required'),
        graduationYear: z.string().min(1, 'Graduation year is required'),
        grade: z.string().optional()
    })).min(1, 'At least one education entry is required')
});

export default function Step4Education({ onComplete }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(educationSchema),
        defaultValues: {
            education: [{ institution: '', degree: '', fieldOfStudy: '', graduationYear: '', grade: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'education'
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');

        try {
            // Convert graduationYear to number
            const formattedData = {
                education: data.education.map(edu => ({
                    ...edu,
                    graduationYear: parseInt(edu.graduationYear)
                }))
            };

            const response = await saveRegistrationStep(4, formattedData);
            if (response.success) {
                onComplete?.();
                navigate('/registration/step5');
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
                    <h2 className="text-2xl font-semibold text-gray-900">Step 4: Educational Qualifications</h2>
                    <p className="text-gray-600 text-sm mt-1">
                        Add your academic qualifications
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
                                        Qualification {index + 1}
                                    </h3>
                                    {fields.length > 1 && (
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
                                                Institution <span className="text-error">*</span>
                                            </label>
                                            <input
                                                {...register(`education.${index}.institution`)}
                                                className={`input ${errors.education?.[index]?.institution ? 'input-error' : ''}`}
                                                placeholder="University/College name"
                                            />
                                            {errors.education?.[index]?.institution && (
                                                <p className="error-message">{errors.education[index].institution.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="label">
                                                Degree <span className="text-error">*</span>
                                            </label>
                                            <input
                                                {...register(`education.${index}.degree`)}
                                                className={`input ${errors.education?.[index]?.degree ? 'input-error' : ''}`}
                                                placeholder="e.g., BSc, MSc, PhD"
                                            />
                                            {errors.education?.[index]?.degree && (
                                                <p className="error-message">{errors.education[index].degree.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="label">
                                            Field of Study <span className="text-error">*</span>
                                        </label>
                                        <input
                                            {...register(`education.${index}.fieldOfStudy`)}
                                            className={`input ${errors.education?.[index]?.fieldOfStudy ? 'input-error' : ''}`}
                                            placeholder="e.g., Environmental Science"
                                        />
                                        {errors.education?.[index]?.fieldOfStudy && (
                                            <p className="error-message">{errors.education[index].fieldOfStudy.message}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="label">
                                                Graduation Year <span className="text-error">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                {...register(`education.${index}.graduationYear`)}
                                                className={`input ${errors.education?.[index]?.graduationYear ? 'input-error' : ''}`}
                                                placeholder="e.g., 2020"
                                                min="1950"
                                                max={new Date().getFullYear()}
                                            />
                                            {errors.education?.[index]?.graduationYear && (
                                                <p className="error-message">{errors.education[index].graduationYear.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="label">Grade/Class</label>
                                            <input
                                                {...register(`education.${index}.grade`)}
                                                className="input"
                                                placeholder="e.g., First Class, 3.8 GPA"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => append({ institution: '', degree: '', fieldOfStudy: '', graduationYear: '', grade: '' })}
                            className="btn btn-outline w-full"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Another Qualification
                        </button>

                        <div className="flex items-center justify-between pt-6 border-t">
                            <button
                                type="button"
                                onClick={() => navigate('/registration/step3')}
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
                                    'Continue to Step 5'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
