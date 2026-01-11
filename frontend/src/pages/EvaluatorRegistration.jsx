const API_URL = "http://localhost:8088/api/evaluators/register";

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/* ===================== GEO DATA (UNCHANGED) ===================== */
const geoData = {
    India: {
        states: ["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi", "Uttar Pradesh", "West Bengal"],
        cities: {
            Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
            Karnataka: ["Bengaluru", "Mysuru", "Mangaluru", "Hubli"],
            "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
            Delhi: ["New Delhi", "Gurugram (NCR)", "Noida (NCR)"],
            "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi"],
            "West Bengal": ["Kolkata", "Howrah", "Siliguri"]
        }
    },
    USA: {
        states: ["California", "Texas", "New York", "Florida", "Illinois", "Washington"],
        cities: {
            California: ["Los Angeles", "San Francisco", "San Diego", "San Jose"],
            Texas: ["Houston", "Dallas", "Austin", "San Antonio"],
            "New York": ["New York City", "Buffalo", "Rochester", "Albany"],
            Florida: ["Miami", "Orlando", "Tampa", "Jacksonville"],
            Illinois: ["Chicago", "Aurora", "Rockford"],
            Washington: ["Seattle", "Spokane", "Tacoma"]
        }
    }
};
const countries = Object.keys(geoData).sort();
/* ================================================================ */

const EvaluatorRegistration = () => {
    const [idProofFile, setIdProofFile] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
        evaluatorName: "",
        evaluatorEmail: "",
        phone: "",
        organization: "",
        department: "",
        role: "",
        city: "",
        state: "",
        country: "",
        resumeDriveUrl: "",
        githubProfileUrl: "",
        youtubeChannelUrl: ""
    });

    const availableStates = useMemo(
        () => (formData.country ? geoData[formData.country]?.states || [] : []),
        [formData.country]
    );

    const availableCities = useMemo(() => {
        if (formData.country && formData.state) {
            return geoData[formData.country]?.cities[formData.state] || [];
        }
        return [];
    }, [formData.country, formData.state]);

    /* ===================== HANDLERS ===================== */
    const handleChange = (e) => {
        const { name, value } = e.target;
        let newFormData = { ...formData, [name]: value };

        if (name === "country") newFormData = { ...newFormData, state: "", city: "" };
        if (name === "state") newFormData = { ...newFormData, city: "" };

        setFormData(newFormData);
        setError("");
    };

    const handleFileChange = (e, setter, maxMB = 2) => {
        const file = e.target.files[0];
        if (!file) return setter(null);

        if (file.size > maxMB * 1024 * 1024) {
            setError(`File size exceeds ${maxMB}MB`);
            setter(null);
            e.target.value = null;
            return;
        }
        setter(file);
    };

    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
    const complexityRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]:;"'<>,.?/]).{8,}$/;

    const validateForm = () => {
        const f = formData;
        if (!f.evaluatorName) return setError("Full Name is required."), false;
        if (!emailRegex.test(f.evaluatorEmail)) return setError("Invalid email."), false;
        if (!phoneRegex.test(f.phone)) return setError("Invalid phone number."), false;
        if (!f.organization || !f.department || !f.role)
            return setError("Organization details required."), false;
        if (!f.country || !f.state || !f.city)
            return setError("Location details required."), false;
        if (!idProofFile)
            return setError("ID Proof is required."), false;
        if (!formData.resumeDriveUrl)
            return setError("Resume public URL is required."), false;
        if (!complexityRegex.test(f.password))
            return setError("Password does not meet complexity rules."), false;
        if (f.password !== f.confirmPassword)
            return setError("Passwords do not match."), false;

        setError("");
        return true;
    };

    /* ===================== SUBMIT (AXIOS ONLY CHANGE) ===================== */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const formPayload = new FormData();

            Object.entries({
                name: formData.evaluatorName,
                email: formData.evaluatorEmail,
                password: formData.password,
                phone: formData.phone,
                organization: formData.organization,
                department: formData.department,
                role: formData.role,
                country: formData.country,
                state: formData.state,
                city: formData.city,
                resume_drive_url: formData.resumeDriveUrl
            }).forEach(([key, value]) => {
                formPayload.append(key, value);
            });

            formPayload.append("id_proof_image", idProofFile);

            await axios.post(API_URL, formPayload);

            alert(
                "================================\n" +
                "✅ APPLICATION SUBMITTED SUCCESSFULLY!\n" +
                "================================\n\n" +
                "Your application is under review.\nStatus: Pending Verification"
            );

            setFormData({
                password: "",
                confirmPassword: "",
                evaluatorName: "",
                evaluatorEmail: "",
                phone: "",
                organization: "",
                department: "",
                role: "",
                country: "",
                state: "",
                city: "",
                resumeDriveUrl: ""
            });

            setIdProofFile(null);
            setResumeFile(null);

        } catch (error) {
            console.error("Evaluator Registration Error:", error);
            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        }
    };

    /* ===================== UI CLASSES ===================== */
    const input =
        "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-700 focus:outline-none";
    const sectionTitle =
        "text-lg font-semibold text-gray-800 border-b pb-2 mb-4";
    const button =
        "w-full py-3 mt-6 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-900 transition";

    return (
        <div className="min-h-screen bg-slate-100 flex justify-center items-center mt-16 px-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
                    Evaluator Application
                </h1>
                <p className="text-center text-gray-500 mb-8">
                    Apply to become an official evaluator for our innovation programs
                </p>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* PERSONAL */}
                    <section>
                        <h2 className={sectionTitle}>Personal Information</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input className={input} name="evaluatorName" placeholder="Full Name" onChange={handleChange} />
                            <input className={input} name="evaluatorEmail" placeholder="Professional Email" onChange={handleChange} />
                            <input className={input} name="phone" placeholder="Phone Number" onChange={handleChange} />
                        </div>
                    </section>

                    {/* ORGANIZATION */}
                    <section>
                        <h2 className={sectionTitle}>Organization Details</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input className={input} name="organization" placeholder="Organization" onChange={handleChange} />
                            <input className={input} name="department" placeholder="Department" onChange={handleChange} />
                            <input className={input} name="role" placeholder="Role / Designation" onChange={handleChange} />
                        </div>
                    </section>

                    {/* LOCATION */}
                    <section>
                        <h2 className={sectionTitle}>Location</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <select className={input} name="country" onChange={handleChange}>
                                <option value="">Country</option>
                                {countries.map(c => <option key={c}>{c}</option>)}
                            </select>
                            <select className={input} name="state" onChange={handleChange} disabled={!formData.country}>
                                <option value="">State</option>
                                {availableStates.map(s => <option key={s}>{s}</option>)}
                            </select>
                            <select className={input} name="city" onChange={handleChange} disabled={!formData.state}>
                                <option value="">City</option>
                                {availableCities.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                    </section>

                    {/* DOCUMENTS */}
                    <section>
                        <h2 className={sectionTitle}>Documents</h2>
                        <div className="justify-between flex">
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-1">
                                    Valid ID Proof (Aadhar / Voter ID / PAN) <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={(e) => handleFileChange(e, setIdProofFile, 2)}
                                    className="block w-full text-sm text-gray-700
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-gray-100 file:text-gray-700
                                    hover:file:bg-gray-200
                                    cursor-pointer"
                                    required
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Required. Max file size: 2MB. Accepted formats: JPG, JPEG, PNG.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* RESUME LINK */}
                    <section>
                        <h2 className={sectionTitle}>Resume Link</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">
                                Resume Public URL (Google Drive / OneDrive / Dropbox) <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="url"
                                name="resumeDriveUrl"
                                placeholder="https://drive.google.com/file/d/..."
                                className={input}
                                value={formData.resumeDriveUrl}
                                onChange={handleChange}
                                required
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Ensure access is set to “Anyone with the link can view”.
                            </p>
                        </div>
                    </section>


                    {/* OPTIONAL LINKS */}
                    <section>
                        <h2 className={sectionTitle}>Optional Links</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-1">
                                    GitHub Profile URL
                                </label>
                                <input
                                    type="url"
                                    name="githubProfileUrl"
                                    placeholder="https://github.com/..."
                                    className={input}
                                    value={formData.githubProfileUrl}
                                    onChange={handleChange}
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Ensure access is set to “Anyone with the link can view”.
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-1">
                                    Youtube Channel URL
                                </label>
                                <input
                                    type="url"
                                    name="youtubeChannelUrl"
                                    placeholder="https://youtube.com/..."
                                    className={input}
                                    value={formData.youtubeChannelUrl}
                                    onChange={handleChange}
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Ensure access is set to “Anyone with the link can view”.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* SECURITY */}
                    <section>
                        <h2 className={sectionTitle}>Security</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input type={showPassword ? "text" : "password"} className={input} name="password" placeholder="Password" onChange={handleChange} />
                            <input type={showPassword ? "text" : "password"} className={input} name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
                        </div>
                        <button type="button" className="text-sm text-gray-600 mt-2" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Hide Passwords" : "Show Passwords"}
                        </button>
                    </section>

                    <button type="submit" className={button}>
                        Submit Application
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already registered?
                    <Link to="/login" className="ml-1 text-red-700 font-semibold">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default EvaluatorRegistration;
