import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAdmin } from "../context/AdminContext";


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setAdmin } = useAdmin();


    // Safe navigation hook
    // let navigate;
    // try {
    //     navigate = useNavigate();
    // } catch (e) {
    //     console.warn("useNavigate() used outside of Router context. Navigation disabled.");
    // }
    const navigate = useNavigate();


    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     setIsLoading(true);

    //     try {
    //         const res = await fetch('http://localhost:8088/api/admin/login', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ email, password })
    //         });

    //         const data = await res.json();

    //         if (data.success) {
    //             console.log("Admin Logged In:", data.admin);
    //             setAdmin(data.admin);          // ✅ STORE ADMIN
    //             navigate("/dashboard");        // ✅ SINGLE NAVIGATION
    //         }
    //         else {
    //             alert(data.message);
    //         }

    //     } catch (error) {
    //         console.error('Login error:', error);
    //         alert('Login failed. Server error.');
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await axios.post(
                'http://localhost:8088/api/admin/login',
                { email, password },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            const data = res.data;

            if (data.success) {
                console.log("Admin Logged In:", data.admin);
                setAdmin(data.admin);          // ✅ STORE ADMIN
                navigate("/dashboard");        // ✅ SINGLE NAVIGATION
            }
            else {
                alert(data.message);
            }

        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Server error.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

                {/* HEADER */}
                <div className="bg-indigo-600 px-8 py-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-indigo-400 opacity-20 rounded-full translate-x-10 translate-y-10"></div>

                    <div className="relative z-10">
                        <div className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-md mb-4 border border-white/20">
                            <ShieldCheck className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">
                            Admin Login
                        </h2>
                        <p className="text-indigo-100 text-sm mt-2 font-medium opacity-80 uppercase tracking-widest">
                            Hackathon Control Center
                        </p>
                    </div>
                </div>

                {/* FORM */}
                <div className="p-8 sm:p-10">
                    <form onSubmit={handleLogin} className="space-y-6">

                        {/* EMAIL */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none transition-all"
                                    placeholder="admin@hackathon.com"
                                />
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Password
                                </label>
                                <button
                                    type="button"
                                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                                >
                                    Forgot?
                                </button>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none transition-all"
                                    placeholder="••••••••"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]
                            ${isLoading
                                    ? 'bg-indigo-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-300'
                                }`}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Sign In to Dashboard</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* FOOTER */}
                    <div className="mt-10 flex flex-col items-center gap-4">
                        <div className="h-px w-16 bg-gray-200"></div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] text-center">
                            Secure Administrator Access Only
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
