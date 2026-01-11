import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, FileText, HelpCircle } from 'lucide-react';
import logo from '../assets/IEPSL.png';

export default function InfoPage() {
    const faqs = [
        {
            question: 'How do I become a member?',
            answer: 'Click on "Register Now" and complete the 8-step registration process. Your application will be reviewed by our admin team.'
        },
        {
            question: 'What are the membership benefits?',
            answer: 'Members receive professional recognition, networking opportunities, access to resources, and a digital membership card.'
        },
        {
            question: 'How long does approval take?',
            answer: 'Applications are typically reviewed within 3-5 business days after submission.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
            {/* Navigation */}
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
                            <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">About Us</Link>
                            <Link to="/work" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Our Work</Link>
                            <Link to="/info" className="text-primary-600 font-medium">Information</Link>
                            <Link to="/login" className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all">Login</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">Information & Contact</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Get in touch with us or find answers to common questions
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 mb-20">
                        {/* Contact Info */}
                        <div className="space-y-6 animate-fade-in-up">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>

                            <div className="card">
                                <div className="card-body space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-5 h-5 text-primary-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Email</p>
                                            <p className="text-gray-600">info@iepsl.lk</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-5 h-5 text-success-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Phone</p>
                                            <p className="text-gray-600">+94 11 234 5678</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-info-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5 text-info-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Address</p>
                                            <p className="text-gray-600">123 Environmental Avenue, Colombo 07, Sri Lanka</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-5 h-5 text-warning-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Office Hours</p>
                                            <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQs */}
                        <div className="animate-fade-in-up animation-delay-200">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="card">
                                        <div className="card-body">
                                            <div className="flex items-start gap-3">
                                                <HelpCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                                                    <p className="text-gray-600">{faq.answer}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white animate-fade-in-up">
                        <div className="card-body text-center">
                            <FileText className="w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-4">Need More Information?</h3>
                            <p className="mb-6 text-primary-100">
                                Download our membership guide or contact our support team
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Link to="/register" className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-all">
                                    Register Now
                                </Link>
                                <a href="mailto:info@iepsl.lk" className="px-6 py-3 bg-primary-800 text-white rounded-lg font-semibold hover:bg-primary-900 transition-all">
                                    Email Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
