"use client";

import { AlertTriangle, Briefcase, CheckCircle, Save } from 'lucide-react';
import { useState } from 'react';

export default function SectionHeadRegistration() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'section_head', // Role is fixed for this specific page
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (!formData.name || !formData.email || !formData.password) {
            setMessage({ type: 'error', text: 'Please fill in all required fields.' });
            return;
        }

        setLoading(true);
        setMessage(null);

        // 1. Simulate API call to create the user in the backend
        console.log(`[USER CREATION] Attempting to create Section Head user: ${formData.email}`);

        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

        // 2. Simulate success 

        // 3. Provide feedback and reset form
        setMessage({
            type: 'success',
            text: `${formData.name} successfully registered as a Section Head!`
        });

        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'section_head',
        });

        setLoading(false);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <Briefcase className="w-8 h-8 text-purple-600" />
                <span>Admin: Section Head Registration</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8">
                Use this form to manually provision a new high-level user with the **Section Head** role.
            </p>

            {/* Message Banner */}
            {message && (
                <div
                    className={`p-4 mb-6 rounded-lg flex items-center ${message.type === 'success' ? 'bg-green-100 text-green-800 border-green-500' : 'bg-red-100 text-red-800 border-red-500'
                        } border-l-4`}
                    role="alert"
                >
                    {message.type === 'success' ? <CheckCircle className="w-5 h-5 mr-3" /> : <AlertTriangle className="w-5 h-5 mr-3" />}
                    <p className="font-medium">{message.text}</p>
                </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-purple-600">
                <div className="space-y-6">
                    {/* Role Display (Fixed) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">System Role</label>
                        <p className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm p-3 font-semibold text-purple-700">
                            Section Head
                        </p>
                    </div>

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="e.g., Dr. Alice Johnson"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address (Login ID)</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="alice.johnson@university.edu"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Temporary Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Set a temporary password"
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition duration-150 ease-in-out"
                    >
                        {loading ? (
                            'Creating User...'
                        ) : (
                            <><Save className="w-5 h-5 mr-2" /> Register Section Head</>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
