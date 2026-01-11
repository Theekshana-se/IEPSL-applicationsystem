import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Droplet, Wind, Recycle, CheckCircle } from 'lucide-react';
import logo from '../assets/IEPSL.png';

export default function WorkPage() {
    const workAreas = [
        {
            icon: Leaf,
            title: 'Environmental Impact Assessment',
            description: 'Comprehensive EIA services for sustainable development projects'
        },
        {
            icon: Droplet,
            title: 'Water Resource Management',
            description: 'Sustainable water management and conservation strategies'
        },
        {
            icon: Wind,
            title: 'Air Quality Monitoring',
            description: 'Advanced air quality assessment and pollution control'
        },
        {
            icon: Recycle,
            title: 'Waste Management',
            description: 'Integrated waste management and circular economy solutions'
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
                            <Link to="/work" className="text-primary-600 font-medium">Our Work</Link>
                            <Link to="/info" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Information</Link>
                            <Link to="/login" className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all">Login</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Work</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            IEPSL members are at the forefront of environmental protection and sustainable development in Sri Lanka
                        </p>
                    </div>

                    {/* Work Areas */}
                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        {workAreas.map((area, index) => {
                            const Icon = area.icon;
                            return (
                                <div
                                    key={index}
                                    className="card group hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="card-body">
                                        <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                                            <Icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
                                        <p className="text-gray-600">{area.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Achievements */}
                    <div className="card animate-fade-in-up">
                        <div className="card-body">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Impact</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <p className="text-4xl font-bold text-primary-600 mb-2">500+</p>
                                    <p className="text-gray-600">Professional Members</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-4xl font-bold text-success-600 mb-2">1000+</p>
                                    <p className="text-gray-600">Projects Completed</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-4xl font-bold text-info-600 mb-2">25+</p>
                                    <p className="text-gray-600">Years of Excellence</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
