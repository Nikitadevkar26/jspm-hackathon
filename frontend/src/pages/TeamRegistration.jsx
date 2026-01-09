import React, { useState, useEffect, useMemo } from 'react';
import statesByCountry from '../data/statesByCountry.js';
import { Link } from 'react-router-dom';
// Added Globe and FileText for new fields
import { Users, User, Zap, GraduationCap, Phone, Mail, CheckCircle, MapPin, ExternalLink, Globe, AlertTriangle, PlusCircle, MinusCircle, UserCheck, FileText, Calendar } from 'lucide-react';
import API_URL from '../config';
import axios from 'axios';

// Custom Tailwind configuration for the new academic theme (Deep Red/Crimson and Orange Accent)
const SIH_PRIMARY = 'rgb(153, 27, 27)'; // Tailwind red-800 (Deep Crimson)
const SIH_ACCENT = 'rgb(234, 88, 12)'; // Tailwind orange-600 (Rich Orange/Saffron)
const MIN_MEMBERS = 2; // Min: Leader + 1 Member
const MAX_MEMBERS = 4; // Max: Leader + 3 Member
const MAX_PROJECT_WORDS = 500;
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

/**
 * Helper function to format file size for display
 */
const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Custom Input Component with SIH Styling (for text/tel/email)
 */
const FormInput = ({ id, label, type = 'text', icon: Icon, value, onChange, required = true, placeholder, error, className = '' }) => (
    <div className={`space-y-1 ${className}`}>
        <label htmlFor={id} className="text-sm font-medium text-gray-700 flex items-center">
            {/* Updated icon color */}
            {Icon && <Icon className="w-4 h-4 mr-2 text-red-800" />}
            {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            // Applied red-500 for focus ring
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-red-500 transition duration-150 ease-in-out placeholder-gray-400 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-red-500'
                }`}
        />
        {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}
    </div>
);

/**
 * Custom Textarea Component with word count display and validation
 */
const TextAreaInput = ({ id, label, value, onChange, required = true, placeholder, error, maxWords }) => {
    const wordCount = value ? value.trim().split(/\s+/).filter(Boolean).length : 0;
    const isOverLimit = maxWords && wordCount > maxWords;

    return (
        <div className="space-y-1">
            <label htmlFor={id} className="text-sm font-medium text-gray-700 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-red-800" />
                {label} {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                rows="6"
                placeholder={placeholder || `Enter ${label.toLowerCase()}`}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-red-500 transition duration-150 ease-in-out placeholder-gray-400 ${error || isOverLimit ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-red-500'
                    }`}
            />
            {/* Display word count and potential error below the textarea */}
            <div className={`flex justify-between text-xs mt-1`}>
                <span className={`${error ? 'text-red-500 font-medium' : 'text-gray-500'}`}>{error}</span>
                <span className={`${isOverLimit ? 'text-red-500 font-semibold' : 'text-gray-500'}`}>
                    Word Count: {wordCount} / {maxWords}
                </span>
            </div>
        </div>
    );
};

/**
 * Form Stepper Navigation Component
 */
const StepIndicator = ({ step, currentStep, label, Icon }) => (
    <div className="flex flex-col items-center">
        <div
            // Applied red-800 for active steps
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${currentStep >= step ? 'bg-red-800 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
                }`}
        >
            <Icon className="w-5 h-5" />
        </div>
        <p className={`mt-2 text-xs font-medium text-center hidden sm:block ${currentStep >= step ? 'text-red-800' : 'text-gray-500'}`}>{label}</p>
    </div>
);

/**
 * Toast Notification Component for validation warnings (The "Pop-up")
 */
const ToastNotification = ({ message, isVisible }) => (
    <div
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 z-50 p-4 rounded-b-lg shadow-xl flex items-center space-x-3 
      ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      bg-yellow-500 text-white font-semibold`}
    >
        <AlertTriangle className="w-6 h-6" />
        <p>{message}</p>
    </div>
);

/**
 * Main SIH Registration Form Component
 */
const App = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        teamName: '',
        institution: '',
        collegeType: '',
        country: '',
        problemStatementCategory: 'Software',
        theme: 'Agriculture / FoodTech / Rural Development',
        projectDescription: '',
        idProofFile: null,
        paymentProofFile: null,

        members: [
            {
                id: 1,
                role: 'Leader',
                name: '',
                email: '',
                phone: '',
                gender: '',
                branch: '',
                stream: '',
                year: '',
                idProofFile: null,
                countryCode: '+91',

                // 🏫 New fields added for college/location info
                collegeName: '',
                state: '',
                city: '',
            },
        ],
    });




    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [toastMessage, setToastMessage] = useState(null);

    const totalSteps = 4;
    const currentMemberCount = useMemo(() => formData.members.length, [formData.members]);

    // Effect to clear the toast message after 4 seconds
    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    /**
     * Handles changes for top-level form data (Text inputs, Selects, Textareas)
     */
    const handleChange = (e, index = null) => {
        const { id, name, value } = e.target;
        // Use id or name as the key (JSX selects usually use id)
        const fieldName = id || name;

        if (index !== null) {
            // --- Handle Nested Member Fields (Step 2) ---
            setFormData((prev) => {
                const updatedMembers = [...prev.members];
                updatedMembers[index] = {
                    ...updatedMembers[index],
                    [fieldName]: value,
                };
                return { ...prev, members: updatedMembers };
            });

            // Clear member-specific error: e.g., "member_0_name"
            const errorKey = `member_${index}_${fieldName}`;
            if (errors[errorKey]) {
                setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[errorKey];
                    return newErrors;
                });
            }
        } else {
            // --- Handle Top-Level Fields (Step 1 & Step 3) ---
            setFormData((prev) => ({ ...prev, [fieldName]: value }));

            // Clear standard error
            if (errors[fieldName]) {
                setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[fieldName];
                    return newErrors;
                });
            }
        }
    };

    /**
     * Handles file selection and performs client-side validation
     */
    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     const fieldId = e.target.id;

    //     if (!file) {
    //         // Clear file and set error if file is removed or not selected
    //         setFormData(prev => ({ ...prev, [fieldId]: null }));
    //         setErrors(prev => ({ ...prev, [fieldId]: 'Valid ID Proof is required.' }));
    //         return;
    //     }

    //     const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    //     let error = '';

    //     if (file.size > MAX_FILE_SIZE_BYTES) {
    //         error = `File size (${formatFileSize(file.size)}) exceeds the maximum limit of 10MB.`;
    //     } else if (!acceptedTypes.includes(file.type)) {
    //         error = 'Invalid file type. Only image files are accepted.';
    //     }

    //     if (error) {
    //         setErrors(prev => ({ ...prev, [fieldId]: error }));
    //         setFormData(prev => ({ ...prev, [fieldId]: null }));
    //         setToastMessage(error);
    //     } else {
    //         // Clear error and store file metadata
    //         setErrors(prev => { const newErrors = { ...prev }; delete newErrors[fieldId]; return newErrors; });
    //         setFormData(prev => ({
    //             ...prev,
    //             [fieldId]: { name: file.name, size: file.size, type: file.type }
    //         }));
    //         setToastMessage(`File selected: ${file.name}`);
    //     }
    // };
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        // Allow only images (matches backend)
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            setErrors(prev => ({
                ...prev,
                paymentProofFile: 'Only JPG, JPEG, PNG images are allowed'
            }));
            return;
        }

        // Max 10MB
        if (file.size > 10 * 1024 * 1024) {
            setErrors(prev => ({
                ...prev,
                paymentProofFile: 'File size must be under 10MB'
            }));
            return;
        }

        // ✅ Store FILE OBJECT (not name)
        setFormData(prev => ({
            ...prev,
            paymentProofFile: file
        }));

        // Clear previous error
        setErrors(prev => ({
            ...prev,
            paymentProofFile: null
        }));
    };


    /**
     * Handles changes for an individual team member's details
     */
    const handleMemberChange = (index, field, value) => {
        setFormData((prev) => {
            const newMembers = [...prev.members];
            newMembers[index] = { ...newMembers[index], [field]: value };
            return { ...prev, members: newMembers };
        });

        // Clear member-specific error
        const errorKey = `member_${index}_${field}`;
        if (errors[errorKey]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[errorKey];
                return newErrors;
            });
        }
    };

    /**
     * Adds a new team member, up to MAX_MEMBERS
     */
    const addMember = () => {
        if (currentMemberCount < MAX_MEMBERS) {
            setFormData((prev) => {
                const leader = prev.members[0]; // inherit college details from leader

                const newMember = {
                    id: currentMemberCount + 1,
                    role: `Member ${currentMemberCount + 1}`,
                    name: '',
                    email: '',
                    phone: '',
                    gender: '',
                    branch: '',
                    stream: '',
                    year: '',
                    idProofFile: null,
                    countryCode: '+91',

                    // 🏫 Inherit college info from leader
                    collegeName: leader.collegeName || '',
                    state: leader.state || '',
                    city: leader.city || '',
                };

                return {
                    ...prev,
                    members: [...prev.members, newMember],
                };
            });

            setToastMessage(
                `Added Member ${currentMemberCount + 1}. Team size is now ${currentMemberCount + 1}.`
            );
        } else {
            setToastMessage(`Cannot add more members. Maximum team size is ${MAX_MEMBERS}.`);
        }
    };


    /**
     * Removes the last team member, down to MIN_MEMBERS
     */
    const removeMember = () => {
        if (currentMemberCount > MIN_MEMBERS) {
            const removedMember = formData.members[currentMemberCount - 1].role;
            setFormData((prev) => ({
                ...prev,
                members: prev.members.slice(0, currentMemberCount - 1),
            }));
            setToastMessage(`Removed ${removedMember}. Team size is now ${currentMemberCount - 1}.`);
        } else {
            setToastMessage(`Cannot remove members. Minimum team size is ${MIN_MEMBERS} (Leader + 1).`);
        }
    };

    /**
     * Validates fields for the current step and updates the errors state.
     */
    const validateStep = (currentStep) => {
        let newErrors = {};
        let isValid = true;

        // Helper: Checks if a field is empty and optionally meets minimum length.
        const validateRequired = (field, value, message, minLength = 0) => {
            if (!value || String(value).trim() === '') {
                newErrors[field] = message;
                isValid = false;
            } else if (minLength > 0 && String(value).trim().length < minLength) {
                newErrors[field] = `Must be at least ${minLength} characters long.`;
                isValid = false;
            }
        };

        // Helper: Checks for a valid email format
        const validateEmail = (field, value, message) => {
            validateRequired(field, value, 'Email is required.');
            if (value && !/\S+@\S+\.\S+/.test(value)) {
                newErrors[field] = message;
                isValid = false;
            }
        };

        // Helper: Checks for a 10-digit numeric phone number
        const validatePhone = (field, value, message) => {
            validateRequired(field, value, 'Contact Number is required.');
            if (value && !/^\d{10}$/.test(value)) {
                newErrors[field] = message;
                isValid = false;
            }
        };

        // Helper: Checks for letters and spaces only
        const validateName = (field, value, message) => {
            validateRequired(field, value, message || 'Name is required.', 3);
            if (value && !/^[a-zA-Z\s]+$/.test(value)) {
                newErrors[field] = 'Name must contain only letters and spaces.';
                isValid = false;
            }
        }

        switch (currentStep) {
            case 1:
                validateName('teamName', formData.teamName, 'Team Name cannot be empty.', 3);
                validateName('institution', formData.institution, 'Institution/College name is mandatory.');
                // NEW Validations for Step 1
                validateRequired('collegeType', formData.collegeType, 'College / Institution Type is required.');
                validateRequired('country', formData.country, 'Country name is mandatory.', 3);
                break;
            case 2:
                formData.members.forEach((member, index) => {
                    const prefix = `member_${index}_`;
                    const isLeader = index === 0;
                    const leaderCollege = formData.members[0]?.collegeName?.trim();

                    // --- Name ---
                    validateRequired(
                        prefix + 'name',
                        member.name?.trim(),
                        `${member.role}'s Full Name is required.`
                    );

                    // --- Email ---
                    validateRequired(
                        prefix + 'email',
                        member.email?.trim(),
                        `${member.role}'s Email is required.`
                    );
                    if (member.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(member.email.trim())) {
                        newErrors[prefix + 'email'] = `${member.role}'s Email is invalid.`;
                        isValid = false;
                    }

                    // --- College Name ---
                    validateRequired(
                        prefix + 'collegeName',
                        member.collegeName?.trim(),
                        `${member.role}'s College Name is required.`
                    );

                    // --- College Match Check (Crucial Fix) ---
                    // We use trim() to ensure trailing spaces don't trigger the error
                    if (!isLeader && member.collegeName && leaderCollege) {
                        if (member.collegeName.trim() !== leaderCollege) {
                            newErrors[prefix + 'collegeName'] = `${member.role}'s College must match the Leader's College.`;
                            isValid = false;
                        }
                    }

                    // --- Branch & Stream ---
                    validateRequired(prefix + 'branch', member.branch, `${member.role}'s Branch is required.`);
                    validateRequired(prefix + 'stream', member.stream, `${member.role}'s Stream is required.`);

                    // --- State & City ---
                    validateRequired(prefix + 'state', member.state, `${member.role}'s State is required.`);
                    validateRequired(prefix + 'city', member.city, `${member.role}'s City is required.`);

                    // --- Current Year & Gender ---
                    validateRequired(prefix + 'year', member.year, `${member.role}'s Current Year is required.`);
                    validateRequired(prefix + 'gender', member.gender, `${member.role}'s Gender is required.`);

                    // --- Phone (Improved Validation) ---
                    validateRequired(prefix + 'phone', member.phone, `${member.role}'s Contact Number is required.`);
                    if (member.phone && !/^[0-9]{10}$/.test(member.phone.trim())) {
                        newErrors[prefix + 'phone'] = `${member.role}'s Contact Number must be 10 digits.`;
                        isValid = false;
                    }

                    // --- ID Proof ---
                    // Note: If idProofFile is an object (File), check for its existence
                    if (!member.idProofFile) {
                        newErrors[prefix + 'idProofFile'] = `${member.role}'s Valid ID Proof is required.`;
                        isValid = false;
                    }
                });
                break;


            case 3:
                // Theme validation (FIXED)
                validateRequired(
                    'theme',
                    formData.theme,
                    'A preferred Theme must be selected.'
                );

                // Project Description validation
                const description = (formData.projectDescription || '').trim();
                const wordCount = description
                    ? description.split(/\s+/).filter(Boolean).length
                    : 0;

                if (!description) {
                    newErrors.projectDescription = 'Project description is mandatory.';
                    isValid = false;
                } else if (wordCount < 10) {
                    newErrors.projectDescription =
                        `Description is too short (Minimum 10 words). Current: ${wordCount}`;
                    isValid = false;
                } else if (wordCount > MAX_PROJECT_WORDS) {
                    newErrors.projectDescription =
                        `Description must be ${MAX_PROJECT_WORDS} words or less. Current: ${wordCount}`;
                    isValid = false;
                }

                break;

            case 4:
                if (!formData.paymentProofFile) {
                    newErrors.paymentProofFile = 'Payment screenshot is required.';
                    isValid = false;
                }
                break;


            default:
                break;
        }

        // Set a general toast message when validation fails
        if (!isValid) {
            setToastMessage("Please check the highlighted fields and correct the errors before proceeding.");
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (validateStep(step)) {
            setStep((prev) => Math.min(prev + 1, totalSteps));
            setErrors({});
            setToastMessage(null); // Clear toast on success
        }
    };

    const handlePrev = () => {
        setStep((prev) => Math.max(prev - 1, 1));
        setErrors({});
        setToastMessage(null); // Clear toast on navigation
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     try {
    //         const response = await fetch('http://localhost:8088/api/teams/register', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ formData })
    //         });

    //         const result = await response.json();
    //         if (result.success) {
    //             // alert("Registration Successful!");
    //             setIsSubmitted(true);
    //             // Redirect or clear form
    //         } else {
    //             alert("Error: " + result.message);
    //         }
    //     } catch (error) {
    //         console.error("Submission failed", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };



    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     try {
    //         const payload = new FormData();
    //         payload.append('formData', JSON.stringify(formData));

    //         if (formData.paymentProofFile instanceof File) {
    //             payload.append('paymentProof', formData.paymentProofFile);
    //         }

    //         formData.members.forEach(member => {
    //             if (member.idProofFile instanceof File) {
    //                 payload.append('idProofs', member.idProofFile);
    //             }
    //         });

    //         const res = await fetch(`${API_URL}/api/teams/register`, {
    //             method: 'POST',
    //             body: payload
    //         });

    //         const data = await res.json();

    //         if (!res.ok) {
    //             throw new Error(data.message || 'Registration failed');
    //         }

    //         // ✅ THIS WAS MISSING
    //         setIsSubmitted(true);

    //     } catch (err) {
    //         console.error(err);
    //         setToastMessage(err.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     try {
    //         const payload = new FormData();
    //         payload.append('formData', JSON.stringify(formData));

    //         if (formData.paymentProofFile instanceof File) {
    //             payload.append('paymentProof', formData.paymentProofFile);
    //         }

    //         formData.members.forEach(member => {
    //             if (member.idProofFile instanceof File) {
    //                 payload.append('idProofs', member.idProofFile);
    //             }
    //         });

    //         // const res = await axios.post(
    //         //     `${API_URL}/api/teams/register`,
    //         //     payload
    //         // );

    //         // const res = await axios.post(
    //         //     `${API_URL}/api/teams/register`,
    //         //     payload,
    //         //     {
    //         //         headers: {
    //         //             'Content-Type': 'multipart/form-data'
    //         //         }
    //         //     }
    //         // );

    //         await axios.post(
    //             `${API_URL}/api/teams/register`,
    //             payload
    //         );



    //         const data = res.data;

    //         // ✅ THIS WAS MISSING
    //         setIsSubmitted(true);

    //     } catch (err) {
    //         console.error(err);
    //         setToastMessage(err.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = new FormData();
            payload.append('formData', JSON.stringify(formData));

            if (formData.paymentProofFile instanceof File) {
                payload.append('paymentProof', formData.paymentProofFile);
            }

            formData.members.forEach(member => {
                if (member.idProofFile instanceof File) {
                    payload.append('idProofs', member.idProofFile);
                }
            });

            // ✅ STORE RESPONSE
            const res = await axios.post(
                `${API_URL}/api/teams/register`,
                payload
            );

            // ✅ OPTIONAL: if backend sends message
            // const data = res.data;

            setIsSubmitted(true);

        } catch (err) {
            console.error(err);

            // Show backend message if available
            setToastMessage(
                err.response?.data?.message || 'Registration failed'
            );
        } finally {
            setLoading(false);
        }
    };




    if (isSubmitted) {
        const leaderName = formData.members[0]?.name || 'N/A';
        // --- START: Extracted Leader Contact Details for Success Screen ---
        const leaderEmail = formData.members[0]?.email || 'N/A';
        const leaderPhone = formData.members[0]?.phone || 'N/A';
        // --- END: Extracted Leader Contact Details for Success Screen ---

        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-['Inter']">
                {/* Updated success state colors border to red-800 */}
                <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-2xl text-center border-t-8 border-red-800">
                    <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-6" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">Registration Successful!</h2>
                    <p className="text-gray-600 mb-6 font-medium">
                        Congratulations! Your team **{formData.teamName}** has been successfully registered for the JSPM Hackathon.
                        Your team size is **{formData.members.length}** ({leaderName} is the Leader).
                        You will receive a confirmation email shortly.
                    </p>

                    {/* --- START: Added Leader Details Section --- */}
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm text-left mb-6">
                        <p className="font-semibold text-blue-800 mb-2 flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            Team Leader's Contact Details
                        </p>
                        <ul className="space-y-1 ml-6 list-disc">
                            <li className="text-gray-700"><span className="font-semibold text-gray-800">Name:</span> {leaderName}</li>
                            <li className="text-gray-700"><span className="font-semibold text-gray-800">Email:</span> {leaderEmail}</li>
                            <li className="text-gray-700"><span className="font-semibold text-gray-800">Phone:</span> {leaderPhone}</li>
                        </ul>
                    </div>
                    {/* --- END: Added Leader Details Section --- */}

                    <div className="bg-gray-100 p-4 rounded-lg text-sm text-left">
                        <p className="font-semibold text-red-800">Team Name: {formData.teamName}</p>
                        <p className="text-gray-600">Institution: {formData.institution} ({formData.collegeType})</p>
                        <p className="text-gray-600">Project Theme: {formData.theme}</p>
                        <p className="text-gray-600">Total Members Registered: {formData.members.length}</p>
                    </div>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-6 w-full py-3 bg-orange-600 text-white font-bold rounded-xl shadow-lg hover:bg-orange-700 transition duration-200"
                    >
                        Register Another Team
                    </button>
                </div>
            </div>
        );
    }

    const SIH_THEMES = [
        "Smart Automation",
        "MedTech / BioTech / HealthTech",
        "Smart Vehicles",
        "Smart Education",
        "Disaster Management",
        "Space Technology",
        "Heritage & Culture",
        "Tourism & Hospitality",
        "Clean & Green Technology (Renewable Energy, Sustainability)",
        "Robotics & Drones",
        "FinTech / Blockchain / Cybersecurity",
        "Agriculture / FoodTech / Rural Development",
        "Social Good / Accessibility",
        "Transportation & Logistics",
        "Defense / Security"
    ];


    // UPDATED QUICK LINKS WITH CORRECT, EXTERNAL URLs
    const QuickLinks = [
        { name: "DTE Maharashtra", href: "https://dte.maharashtra.gov.in/" },
        { name: "Savitribai Phule Pune University", href: "http://www.unipune.ac.in/" },
        { name: "Convocation & Exam Section", href: "https://exam.unipune.ac.in/Home/Index" }, // SPPU Exam Portal
        { name: "University Results", href: "http://result.unipune.ac.in/" }, // SPPU Results Portal
        { name: "University Syllabus", href: "http://www.unipune.ac.in/dept/Academic/syllabus.htm" }, // SPPU Syllabus Page
        { name: "Careers at JSPM", href: "https://jspm.edu.in/career/index.html" },
    ];

    return (
        // Updated outer container structure to allow for a full-width footer
        <div className="min-h-screen bg-gray-50 font-['Inter'] flex flex-col items-center relative">

            {/* Toast Notification (The "Pop-up Warning") */}
            <ToastNotification
                message={toastMessage}
                isVisible={!!toastMessage}
            />

            {/* Main Content Wrapper - Centered */}
            <div className="w-full max-w-4xl p-4 sm:p-8 flex-grow">

                {/* The existing form card */}
                <div className="w-full bg-white p-6 sm:p-10 rounded-2xl shadow-2xl border-t-8 border-red-800">

                    {/* Header Section with Logo */}
                    <div className="mb-8 border-b pb-4">
                        <div className="flex flex-col items-center justify-center">
                            <img
                                src="https://akm-img-a-in.tosshub.com/sites/resources/campus/prod/img/logo/2023/10/ylogo254251400879.jpeg"
                                alt="JSPM Logo"
                                className="w-32 h-20 mb-4 object-contain"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/128x80/991b1b/ffffff?text=JSPM+Logo";
                                    e.target.className = "w-32 h-20 mb-4 object-contain p-2 bg-red-50 rounded-lg";
                                }}
                            />
                            {/* Updated title color to red-800 and removed asterisks */}
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-red-800 mb-1 tracking-tight">
                                JSPM Hackathon
                            </h1>
                            <p className="text-lg text-gray-500 font-semibold">Student Team Registration Form</p>
                        </div>
                    </div>

                    {/* Stepper Navigation */}
                    <div className="flex justify-between items-center w-full mb-10 px-4 sm:px-8">
                        {/* Step 1 */}
                        <StepIndicator step={1} currentStep={step} label="Basic Info" Icon={Users} />

                        {/* Connector between Step 1 → Step 2 */}
                        <div className="flex-1 h-1 mx-4 bg-gray-200 rounded-full">
                            <div
                                className={`h-full transition-all duration-500 rounded-full ${step >= 2 ? 'bg-red-800' : 'bg-gray-200'
                                    }`}
                                style={{ width: '50%' }}
                            ></div>
                        </div>

                        {/* Step 2 */}
                        <StepIndicator
                            step={2}
                            currentStep={step}
                            label={`Team Members (${currentMemberCount}/${MAX_MEMBERS})`}
                            Icon={UserCheck}
                        />

                        {/* Connector between Step 2 → Step 3 */}
                        <div className="flex-1 h-1 mx-4 bg-gray-200 rounded-full">
                            <div
                                className={`h-full transition-all duration-500 rounded-full ${step >= 3 ? 'bg-red-800' : 'bg-gray-200'
                                    }`}
                                style={{ width: '100%' }}
                            ></div>
                        </div>

                        {/* Step 3 */}
                        <StepIndicator
                            step={3}
                            currentStep={step}
                            label="Project & ID"
                            Icon={Zap}
                        />

                        {/* Connector between Step 3 → Step 4 */}
                        <div className="flex-1 h-1 mx-4 bg-gray-200 rounded-full">
                            <div
                                className={`h-full transition-all duration-500 rounded-full ${step >= 4 ? 'bg-red-800' : 'bg-gray-200'
                                    }`}
                                style={{ width: '100%' }}
                            ></div>
                        </div>

                        {/* Step 4 */}
                        <StepIndicator
                            step={4}
                            currentStep={step}
                            label="Payment"
                            Icon={UserCheck}
                        />
                    </div>


                    {/* Form Content */}
                    <form onSubmit={step === totalSteps ? handleSubmit : handleNext} className="space-y-6">

                        {/* Step 1: Team Details (Simplified) */}
                        {step === 1 && (
                            <div className="grid gap-6 md:grid-cols-2">
                                <h3 className="md:col-span-2 text-xl font-semibold text-red-800 border-b pb-2 mb-2">
                                    1. Team & Institution Information
                                </h3>

                                {/* Team Name */}
                                <FormInput
                                    id="teamName"
                                    label="Team Name (Letters and Spaces Only)"
                                    icon={Users}
                                    value={formData.teamName}
                                    onChange={handleChange}
                                    placeholder="A unique and creative team name"
                                    error={errors.teamName}
                                />

                                {/* Institution Name */}
                                <FormInput
                                    id="institution"
                                    label="Institution/College Name (Letters and Spaces Only)"
                                    icon={GraduationCap}
                                    value={formData.institution}
                                    onChange={handleChange}
                                    placeholder="Full official name of your college"
                                    error={errors.institution}
                                />

                                {/* College Type Select */}
                                <div className="space-y-1">
                                    <label
                                        htmlFor="collegeType"
                                        className="text-sm font-medium text-gray-700 flex items-center"
                                    >
                                        <GraduationCap className="w-4 h-4 mr-2 text-red-800" />
                                        College / Institution Type <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <select
                                        id="collegeType"
                                        value={formData.collegeType}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-red-500 transition duration-150 ease-in-out bg-white ${errors.collegeType
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:border-red-500"
                                            }`}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Autonomous">Autonomous</option>
                                        <option value="Private">Private</option>
                                        <option value="Affiliated">Affiliated (State University)</option>
                                        <option value="Government">Government / Public</option>
                                    </select>
                                    {errors.collegeType && (
                                        <p className="text-xs text-red-500 mt-1 font-medium">
                                            {errors.collegeType}
                                        </p>
                                    )}
                                </div>

                                {/* Country Input */}
                                <FormInput
                                    id="country"
                                    label="Country"
                                    icon={Globe}
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder="e.g., India"
                                    error={errors.country}
                                />

                                {/* State Field (Dynamic based on Country) */}
                                {formData.country &&
                                    statesByCountry[formData.country.replace(/\s+/g, "")] && (
                                        <div className="space-y-1">
                                            <label
                                                htmlFor="state"
                                                className="text-sm font-medium text-gray-700 flex items-center"
                                            >
                                                <Globe className="w-4 h-4 mr-2 text-red-800" />
                                                State / Province <span className="text-red-500 ml-1">*</span>
                                            </label>
                                            <select
                                                id="state"
                                                value={formData.state || ""}
                                                onChange={handleChange}
                                                required
                                                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-red-500 transition duration-150 ease-in-out bg-white ${errors.state
                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 focus:border-red-500"
                                                    }`}
                                            >
                                                <option value="">Select State / Province</option>
                                                {statesByCountry[
                                                    formData.country.replace(/\s+/g, "")
                                                ].map((state) => (
                                                    <option key={state} value={state}>
                                                        {state}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.state && (
                                                <p className="text-xs text-red-500 mt-1 font-medium">
                                                    {errors.state}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                {/* PIN Code Field */}
                                <FormInput
                                    id="pincode"
                                    label="PIN / Postal Code"
                                    icon={Globe}
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    placeholder="e.g., 110001"
                                    error={errors.pincode}
                                />
                            </div>
                        )}


                        {/* Step 2: Team Member Information (DYNAMIC) */}
                        {step === 2 && (
                            <div className="space-y-10">
                                <h3 className="text-2xl font-semibold text-red-800 border-b pb-3 mb-6">
                                    2. Team Member Details ({currentMemberCount}/{MAX_MEMBERS})
                                </h3>

                                {formData.members.map((member, index) => {
                                    const isLeader = index === 0;
                                    const prefix = `member_${index}_`;

                                    // ✅ Automatically lock college name for all non-leaders
                                    const leaderCollege = formData.members[0]?.collegeName || '';

                                    return (
                                        <div
                                            key={member.id}
                                            className={`p-6 rounded-xl border-2 shadow-sm ${isLeader ? 'bg-blue-50 border-blue-400' : 'bg-gray-50 border-gray-300'
                                                }`}
                                        >
                                            <h4
                                                className={`text-lg font-bold mb-6 flex items-center gap-2 ${isLeader ? 'text-blue-800' : 'text-gray-800'
                                                    }`}
                                            >
                                                <User className="w-5 h-5" />
                                                {member.role} {isLeader && '(Leader & Primary Contact)'}
                                            </h4>

                                            {/* DOUBLE-COLUMN GRID */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Full Name */}
                                                <FormInput
                                                    id={prefix + 'name'}
                                                    label="Full Name (L/S Only)"
                                                    icon={User}
                                                    value={member.name}
                                                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                                    placeholder="As per records"
                                                    error={errors[prefix + 'name']}
                                                />

                                                {/* Email */}
                                                <FormInput
                                                    id={prefix + 'email'}
                                                    label="Email ID"
                                                    type="email"
                                                    icon={Mail}
                                                    value={member.email}
                                                    onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                                                    placeholder="name@college.com"
                                                    error={errors[prefix + 'email']}
                                                />

                                                {/* College Name (Leader enters, others inherit) */}
                                                <FormInput
                                                    id={prefix + 'collegeName'}
                                                    label="College Name"
                                                    icon={GraduationCap}
                                                    value={isLeader ? member.collegeName : leaderCollege}
                                                    onChange={(e) => {
                                                        if (isLeader) handleMemberChange(index, 'collegeName', e.target.value);
                                                    }}
                                                    placeholder="Enter your college name"
                                                    error={errors[prefix + 'collegeName']}
                                                    disabled={!isLeader}
                                                />

                                                {/* Branch */}
                                                <FormInput
                                                    id={prefix + 'branch'}
                                                    label="Branch"
                                                    icon={GraduationCap}
                                                    value={member.branch}
                                                    onChange={(e) => handleMemberChange(index, 'branch', e.target.value)}
                                                    placeholder="e.g., Computer Engineering"
                                                    error={errors[prefix + 'branch']}
                                                />

                                                {/* Stream */}
                                                <FormInput
                                                    id={prefix + 'stream'}
                                                    label="Stream / Department"
                                                    icon={GraduationCap}
                                                    value={member.stream}
                                                    onChange={(e) => handleMemberChange(index, 'stream', e.target.value)}
                                                    placeholder="e.g., B.Tech / MCA"
                                                    error={errors[prefix + 'stream']}
                                                />

                                                {/* State */}
                                                <FormInput
                                                    id={prefix + 'state'}
                                                    label="State (College Location)"
                                                    icon={MapPin}
                                                    value={member.state}
                                                    onChange={(e) => handleMemberChange(index, 'state', e.target.value)}
                                                    placeholder="e.g., Maharashtra"
                                                    error={errors[prefix + 'state']}
                                                />

                                                {/* City */}
                                                <FormInput
                                                    id={prefix + 'city'}
                                                    label="City (College Location)"
                                                    icon={MapPin}
                                                    value={member.city}
                                                    onChange={(e) => handleMemberChange(index, 'city', e.target.value)}
                                                    placeholder="e.g., Pune"
                                                    error={errors[prefix + 'city']}
                                                />

                                                {/* Current Year */}
                                                <div className="space-y-2">
                                                    <label
                                                        htmlFor={prefix + 'year'}
                                                        className="text-sm font-medium text-gray-700 flex items-center gap-2"
                                                    >
                                                        <Calendar className="w-4 h-4 text-red-800" />
                                                        Current Year <span className="text-red-500">*</span>
                                                    </label>
                                                    <select
                                                        id={prefix + 'year'}
                                                        value={member.year || ''}
                                                        onChange={(e) => handleMemberChange(index, 'year', e.target.value)}
                                                        required
                                                        className={`w-full px-4 py-2.5 border rounded-lg shadow-sm bg-white focus:ring-red-500 transition duration-150 ease-in-out ${errors[prefix + 'year']
                                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                            : 'border-gray-300 focus:border-red-500'
                                                            }`}
                                                    >
                                                        <option value="">Select Year</option>
                                                        <option value="1st Year">1st Year</option>
                                                        <option value="2nd Year">2nd Year</option>
                                                        <option value="3rd Year">3rd Year</option>
                                                        <option value="4th Year">4th Year</option>
                                                        <option value="5th Year">5th Year</option>
                                                    </select>
                                                    {errors[prefix + 'year'] && (
                                                        <p className="text-xs text-red-500 mt-1 font-medium">
                                                            {errors[prefix + 'year']}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Gender */}
                                                <div className="space-y-2">
                                                    <label
                                                        htmlFor={prefix + 'gender'}
                                                        className="text-sm font-medium text-gray-700 flex items-center gap-2"
                                                    >
                                                        <User className="w-4 h-4 text-red-800" />
                                                        Gender <span className="text-red-500">*</span>
                                                    </label>
                                                    <select
                                                        id={prefix + 'gender'}
                                                        value={member.gender}
                                                        onChange={(e) => handleMemberChange(index, 'gender', e.target.value)}
                                                        required
                                                        className={`w-full px-4 py-2.5 border rounded-lg shadow-sm bg-white focus:ring-red-500 transition duration-150 ease-in-out ${errors[prefix + 'gender']
                                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                            : 'border-gray-300 focus:border-red-500'
                                                            }`}
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    {errors[prefix + 'gender'] && (
                                                        <p className="text-xs text-red-500 mt-1 font-medium">
                                                            {errors[prefix + 'gender']}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Phone (Mandatory for all) */}
                                                <div className="space-y-2">
                                                    <label
                                                        htmlFor={prefix + 'phone'}
                                                        className="text-sm font-medium text-gray-700 flex items-center gap-2"
                                                    >
                                                        <Phone className="w-4 h-4 text-red-800" />
                                                        Contact Number <span className="text-red-500">*</span>
                                                    </label>

                                                    <div className="grid grid-cols-[120px_1fr] gap-3 items-center">
                                                        <select
                                                            id={prefix + 'countryCode'}
                                                            value={member.countryCode || '+91'}
                                                            onChange={(e) => handleMemberChange(index, 'countryCode', e.target.value)}
                                                            className="px-3 py-2.5 border rounded-lg shadow-sm bg-white border-gray-300 focus:border-red-500 focus:ring-red-500 truncate"
                                                        >
                                                            <option value="+91">🇮🇳 +91 (India)</option>
                                                            <option value="+1">🇺🇸 +1 (USA)</option>
                                                            <option value="+44">🇬🇧 +44 (UK)</option>
                                                            <option value="+61">🇦🇺 +61 (Australia)</option>
                                                            <option value="+49">🇩🇪 +49 (Germany)</option>
                                                        </select>

                                                        <input
                                                            id={prefix + 'phone'}
                                                            type="tel"
                                                            value={member.phone}
                                                            onChange={(e) => {
                                                                const code = member.countryCode || '+91';
                                                                const limits = { '+91': 10, '+1': 10, '+44': 10, '+61': 9, '+49': 11 };
                                                                const maxLength = limits[code] || 10;
                                                                const value = e.target.value.slice(0, maxLength);
                                                                handleMemberChange(index, 'phone', value);
                                                            }}
                                                            placeholder="9876543210"
                                                            className={`px-4 py-2.5 border rounded-lg shadow-sm focus:ring-red-500 bg-white transition duration-150 ease-in-out ${errors[prefix + 'phone']
                                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                                : 'border-gray-300 focus:border-red-500'
                                                                }`}
                                                        />
                                                    </div>

                                                    {errors[prefix + 'phone'] && (
                                                        <p className="text-xs text-red-500 mt-1 font-medium">
                                                            {errors[prefix + 'phone']}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* ID Proof Upload */}
                                                <div className="space-y-2 md:col-span-2">
                                                    <label
                                                        htmlFor={prefix + 'idProofFile'}
                                                        className="text-sm font-medium text-gray-700 flex items-center gap-2"
                                                    >
                                                        <UserCheck className="w-4 h-4 text-red-800" />
                                                        Upload Valid ID Proof (Aadhaar / College ID / Voter ID)
                                                        <span className="text-red-500 ml-1">*</span>
                                                    </label>
                                                    {/* <input
                                                        id={prefix + 'idProofFile'}
                                                        type="file"
                                                        accept=".jpg,.jpeg,.png"
                                                        // onChange={(e) => handleMemberChange(index, 'idProofFile', e.target.files[0])}
                                                        onChange={(e) =>
                                                            handleMemberChange(index, 'idProofFile', e.target.files[0]?.name || '')
                                                        }

                                                        className={`w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-lg border p-2 ${errors[prefix + 'idProofFile'] ? 'border-red-500' : 'border-gray-300'
                                                            }`}
                                                    /> */}
                                                    <input
                                                        id={prefix + 'idProofFile'}
                                                        type="file"
                                                        accept=".jpg,.jpeg,.png"
                                                        onChange={(e) =>
                                                            handleMemberChange(index, 'idProofFile', e.target.files[0])
                                                        }
                                                        className={`w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-lg border p-2 ${errors[prefix + 'idProofFile'] ? 'border-red-500' : 'border-gray-300'
                                                            }`}
                                                    />

                                                    {errors[prefix + 'idProofFile'] && (
                                                        <p className="text-xs text-red-500 mt-1 font-medium">
                                                            {errors[prefix + 'idProofFile']}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Add / Remove Buttons */}
                                <div className="flex justify-end gap-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={removeMember}
                                        disabled={currentMemberCount <= MIN_MEMBERS}
                                        className={`py-2.5 px-5 rounded-xl font-bold flex items-center gap-2 transition duration-200 shadow-md ${currentMemberCount <= MIN_MEMBERS
                                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                                            }`}
                                    >
                                        <MinusCircle className="w-5 h-5" />
                                        Remove Member ({currentMemberCount - MIN_MEMBERS} optional)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={addMember}
                                        disabled={currentMemberCount >= MAX_MEMBERS}
                                        className={`py-2.5 px-5 rounded-xl font-bold flex items-center gap-2 transition duration-200 shadow-md ${currentMemberCount >= MAX_MEMBERS
                                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                            }`}
                                    >
                                        <PlusCircle className="w-5 h-5" />
                                        Add Member ({MAX_MEMBERS - currentMemberCount} slots left)
                                    </button>
                                </div>

                                {/* Note */}
                                <div className="p-5 border border-red-200 rounded-lg bg-red-50">
                                    <p className="text-sm text-red-800 font-medium leading-relaxed">
                                        Note: Your team size must be between <b>{MIN_MEMBERS}</b> and <b>{MAX_MEMBERS}</b> members.
                                        Each member must provide <b>Name</b>, <b>Email</b>, <b>College Name (same for all)</b>,
                                        <b>Branch</b>, <b>Stream</b>, <b>State</b>, <b>City</b>, <b>Current Year</b>, <b>Gender</b>,
                                        <b>Contact Number</b>, and a <b>Valid ID Proof</b>.
                                    </p>
                                </div>
                            </div>
                        )}




                        {/* Step 3: Project Details and ID Proof */}
                        {step === 3 && (
                            <div className="grid gap-6 md:grid-cols-2">
                                <h3 className="md:col-span-2 text-xl font-semibold text-red-800 border-b pb-2 mb-2">
                                    3. Project & Registration Details
                                </h3>

                                {/* PS Category Select */}
                                <div className="space-y-1">
                                    <label htmlFor="problemStatementCategory" className="text-sm font-medium text-gray-700 flex items-center">
                                        <Zap className="w-4 h-4 mr-2 text-red-800" />
                                        PS Category <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <select
                                        id="problemStatementCategory"
                                        name="problemStatementCategory" // Added name attribute for handleChange
                                        value={formData.problemStatementCategory}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-red-500 transition duration-150 ease-in-out bg-white 
                    ${errors.problemStatementCategory
                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                : 'border-gray-300 focus:border-red-500'
                                            }`}
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Software">Software Edition</option>
                                        <option value="Hardware">Hardware Edition</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Select the track you are participating in.</p>
                                    {errors.problemStatementCategory && (
                                        <p className="text-xs text-red-500 mt-1 font-medium">{errors.problemStatementCategory}</p>
                                    )}
                                </div>

                                {/* Theme Select */}
                                <div className="space-y-1">
                                    <label htmlFor="theme" className="text-sm font-medium text-gray-700 flex items-center">
                                        <Zap className="w-4 h-4 mr-2 text-red-800" />
                                        Preferred Theme <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <select
                                        id="theme"
                                        name="theme" // Matches the key in validation
                                        value={formData.theme}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-red-500 transition duration-150 ease-in-out bg-white 
                    ${errors.theme
                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                : 'border-gray-300 focus:border-red-500'
                                            }`}
                                    >
                                        <option value="">Select a Theme</option>
                                        {SIH_THEMES.map((theme) => (
                                            <option key={theme} value={theme}>{theme}</option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Choose the primary theme your solution aligns with.</p>
                                    {errors.theme && (
                                        <p className="text-xs text-red-500 mt-1 font-medium">{errors.theme}</p>
                                    )}
                                </div>

                                {/* Project Description (Full width) */}
                                <div className="md:col-span-2">
                                    <TextAreaInput
                                        id="projectDescription"
                                        name="projectDescription"
                                        label="Description of the Project (Approach & Innovation)"
                                        value={formData.projectDescription}
                                        onChange={handleChange}
                                        placeholder="Describe your solution's approach, core innovation, and expected impact in detail."
                                        error={errors.projectDescription}
                                        maxWords={MAX_PROJECT_WORDS}
                                    />
                                </div>
                            </div>
                        )}


                        {/* Step 4: Payment Process and Proof Upload */}
                        {step === 4 && (
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Heading */}
                                <h3 className="md:col-span-2 text-xl font-semibold text-red-800 border-b pb-2 mb-4">
                                    4. Payment Process & Proof Upload
                                </h3>

                                {/* Payment Info Section */}
                                <div className="md:col-span-2 p-5 rounded-xl bg-red-50 border border-red-200 shadow-sm">
                                    <h4 className="text-lg font-semibold text-red-800 mb-3 flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-red-800" />
                                        Payment Details
                                    </h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        To complete your registration, please make a payment of
                                        <span className="font-bold text-red-800"> ₹100 </span>
                                        using the UPI QR code provided below.
                                        Once paid, kindly upload the screenshot of your payment as proof.
                                    </p>
                                </div>

                                {/* QR Code Display */}
                                <div className="flex flex-col items-center justify-center border border-gray-300 rounded-xl p-4 bg-white shadow-sm">
                                    <h5 className="text-base font-semibold text-gray-700 mb-2">
                                        Scan the QR Code to Pay ₹100
                                    </h5>
                                    <img
                                        src="/QR Code.png"
                                        alt="UPI Payment QR"
                                        className="w-48 h-48 object-contain border-2 border-gray-300 rounded-lg mb-2"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/200x200/EEE/333?text=QR+Code';
                                        }}
                                    />
                                    <p className="text-sm text-gray-500">Use any UPI app to make the payment</p>
                                </div>

                                {/* Upload Screenshot Proof */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="paymentProofFile"
                                        className="text-sm font-medium text-gray-700 flex items-center gap-2"
                                    >
                                        <UserCheck className="w-4 h-4 text-red-800" />
                                        Upload Payment Screenshot <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <input
                                        id="paymentProofFile"
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        onChange={handleFileChange}
                                        className={`w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-lg border p-2 ${errors.paymentProofFile ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />

                                    <p className="text-xs text-gray-500 mt-1">
                                        Accepted formats: JPG, JPEG, PNG. Max size: 10MB.
                                        {formData.paymentProofFile && (
                                            <span className="text-green-600 font-medium ml-2">
                                                File Ready: {formData.paymentProofFile.name} ({formatFileSize(formData.paymentProofFile.size)})
                                            </span>
                                        )}
                                    </p>

                                    {errors.paymentProofFile && (
                                        <p className="text-xs text-red-500 mt-1 font-medium">
                                            {errors.paymentProofFile}
                                        </p>
                                    )}
                                </div>

                                {/* Payment Note */}
                                <div className="md:col-span-2 p-5 border border-yellow-300 rounded-lg bg-yellow-50">
                                    <p className="text-sm text-gray-700 font-medium leading-relaxed">
                                        ⚠️ <b>Note:</b> Please ensure your UPI payment of ₹100 is completed before uploading
                                        the screenshot. Your registration will only be confirmed after verifying the payment proof.
                                    </p>
                                </div>
                            </div>
                        )}


                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-6 border-t mt-8">
                            <button
                                type="button"
                                onClick={handlePrev}
                                disabled={step === 1}
                                className={`py-2 px-6 rounded-xl font-bold transition duration-200 ${step === 1
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    // Used gray-700/800 for previous button (secondary action)
                                    : 'bg-gray-700 text-white hover:bg-gray-800 shadow-md'
                                    }`}
                            >
                                &larr; Previous
                            </button>

                            <button
                                type={step === totalSteps ? 'submit' : 'button'}
                                onClick={step !== totalSteps ? handleNext : handleSubmit}
                                // Used red-800 for primary action button
                                className="py-2 px-8 rounded-xl font-bold transition duration-200 shadow-xl bg-red-800 text-white hover:bg-red-700 hover:shadow-2xl"
                            >
                                {step < totalSteps ? 'Next Step \u2192' : 'Submit Registration'}
                            </button>
                        </div>
                        <p className="text-center text-xl text-gray-700 mt-4  font-sans">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[#facc15] font-semibold hover:text-[#eab308]">
                                Login
                            </Link>
                        </p>


                    </form>

                </div>
            </div>

        </div>
    );
};

export default App;