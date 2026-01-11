import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Target, Users, Globe, ArrowRight } from 'lucide-react';
import logo from '../assets/IEPSL.png';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
            {/* Navigation - Same as Landing */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-3 group">
                            <img src={logo} alt="IEPSL Logo" className="h-12 w-auto group-hover:scale-105 transition-transform duration-300" />
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">IEPSL</h1>
                                <p className="text-xs text-gray-600">Members Portal</p>
                            </div>
                        </Link>

                        <div className="flex items-center gap-8">
                            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Home</Link>
                            <Link to="/about" className="text-primary-600 font-medium">About Us</Link>
                            <Link to="/work" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Our Work</Link>
                            <Link to="/info" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Information</Link>
                            <Link to="/login" className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all">Login</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">About IEPSL</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The Institute of Environmental Professionals Sri Lanka (IEPSL) is the premier professional body
                            for environmental practitioners in Sri Lanka.
                        </p>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        <div className="card animate-fade-in-up">
                            <div className="card-body">
                                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                                    <Target className="w-7 h-7 text-primary-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    To advance environmental professionalism in Sri Lanka by promoting excellence in practice,
                                    fostering continuous professional development, and advocating for sustainable environmental management.
                                </p>
                            </div>
                        </div>

                        <div className="card animate-fade-in-up animation-delay-200">
                            <div className="card-body">
                                <div className="w-14 h-14 bg-success-100 rounded-lg flex items-center justify-center mb-4">
                                    <Globe className="w-7 h-7 text-success-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    To be the leading professional institution for environmental practitioners in Sri Lanka,
                                    recognized nationally and internationally for excellence in environmental stewardship.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="mb-20 animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            {['Excellence', 'Integrity', 'Innovation', 'Sustainability'].map((value, index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-600 hover:shadow-lg transition-all duration-300 text-center"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <Award className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                                    <h4 className="font-semibold text-gray-900">{value}</h4>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center animate-fade-in-up">
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all hover:shadow-xl"
                        >
                            Become a Member
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
