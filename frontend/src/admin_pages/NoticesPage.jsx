"use client";

import {
    Calendar,
    ChevronRight,
    Edit,
    FileText,
    FileX,
    Megaphone, PlusCircle,
    Save,
    Trash2,
    Upload,
    User,
    X
} from 'lucide-react';
import { useState } from 'react';

// Simulated Initial Data
const initialNotices = [
    {
        id: 1,
        title: 'Project Submission Deadline Extended',
        content: 'The final submission deadline has been extended. Click the attachment link to view the official letter.',
        date: '2025-12-11',
        target: 'All Teams',
        author: 'Super Admin',
        pdfAttachment: null
    },
    {
        id: 2,
        title: 'Mandatory Evaluator Briefing',
        content: 'All assigned evaluators must attend the mandatory virtual briefing on Friday at 3:00 PM.',
        date: '2025-12-05',
        target: 'Evaluators & Section Heads',
        author: 'Super Admin',
        pdfAttachment: null
    },
];

// --- Main Component ---

export default function NoticesPage() {
    const [notices, setNotices] = useState(initialNotices);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNotice, setEditingNotice] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        target: 'All Teams',
        pdfAttachment: null,
    });

    // --- Modal Handlers ---

    const handleOpenModal = (notice = null) => {
        if (notice) {
            setEditingNotice(notice.id);
            setFormData({
                title: notice.title,
                content: notice.content,
                target: notice.target,
                pdfAttachment: notice.pdfAttachment,
            });
            setSelectedFile(null);
        } else {
            setEditingNotice(null);
            setFormData({
                title: '',
                content: '',
                target: 'All Teams',
                pdfAttachment: null,
            });
            setSelectedFile(null);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingNotice(null);
        setSelectedFile(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // --- CRITICAL FIX: Handle File Selection (Reads File into Data URL) ---
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];

        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);

            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const dataUrl = event.target.result;
                    // Store the name and the Data URL
                    setFormData(prev => ({
                        ...prev,
                        pdfAttachment: { name: file.name, dataUrl: dataUrl }
                    }));
                }
            };
            reader.readAsDataURL(file); // Reads the file content

        } else {
            // Invalid selection or cancelled
            setSelectedFile(null);
            setFormData(prev => ({ ...prev, pdfAttachment: null }));
            if (file) {
                alert("Please select a valid PDF file.");
            }
        }
        e.target.value = ''; // Ensure input value is cleared
    };

    // --- Handle File Removal ---
    const handleRemovePdf = () => {
        setSelectedFile(null);
        setFormData(prev => ({ ...prev, pdfAttachment: null }));
    }


    const handleSaveNotice = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.content) {
            alert("Title and content are required.");
            return;
        }

        const newNotice = {
            id: 0, // Placeholder, replaced below
            title: formData.title,
            content: formData.content,
            target: formData.target,
            pdfAttachment: formData.pdfAttachment,
            author: 'Super Admin',
            date: new Date().toISOString().slice(0, 10), // Current date
        };

        if (editingNotice !== null) {
            // Update logic
            setNotices(prev =>
                prev.map(n => n.id === editingNotice ? { ...newNotice, id: editingNotice } : n)
            );
            alert(`Notice "${newNotice.title}" updated successfully.`);
        } else {
            // Creation logic
            const newId = notices.length > 0 ? Math.max(...notices.map(n => n.id)) + 1 : 1;
            setNotices(prev => [{ ...newNotice, id: newId }, ...prev]); // Add to the top
            alert(`New notice "${newNotice.title}" published!`);
        }

        handleCloseModal();
    };

    const handleDeleteNotice = (id) => {
        if (window.confirm('Are you sure you want to delete this notice? This action cannot be undone.')) {
            setNotices(prev => prev.filter(n => n.id !== id));
            alert(`Notice ID ${id} deleted.`);
        }
    };

    // --- Component Rendering ---

    return (
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 flex items-center space-x-3 border-b pb-4">
                <Megaphone className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" />
                <span>System Announcements</span>
            </h1>

            <p className="text-base text-gray-600 mb-6">
                Manage all official announcements displayed to system users.
            </p>

            <hr className="my-6" />

            {/* Header and Add Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">Published Notices ({notices.length})</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center space-x-2 px-5 py-2 bg-indigo-600 text-white rounded-lg shadow-xl hover:bg-indigo-700 transition duration-150 w-full sm:w-auto justify-center"
                >
                    <PlusCircle className="w-5 h-5" />
                    <span>Create New Notice</span>
                </button>
            </div>

            {/* Notices List */}
            <div className="space-y-4">
                {notices.length === 0 ? (
                    <div className="p-10 text-center text-gray-500 bg-white rounded-lg shadow-md">
                        <p>No active notices. Create one to inform the system users!</p>
                    </div>
                ) : (
                    notices.map((notice) => (
                        <div key={notice.id} className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-indigo-500 hover:shadow-xl transition duration-200 flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">

                            {/* Content and Meta Data */}
                            <div className='flex-grow'>
                                <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                                    <ChevronRight className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                                    <span>{notice.title}</span>
                                </h3>

                                <div className="text-gray-700 mt-2 ml-7 pl-1 border-l-2 border-gray-100 whitespace-pre-wrap text-sm md:text-base">
                                    {notice.content}
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 mt-4 ml-7">
                                    <span className="flex items-center space-x-1 font-medium"><Calendar className="w-4 h-4 text-indigo-500" /><span>{notice.date}</span></span>
                                    <span className="flex items-center space-x-1"><User className="w-4 h-4 text-indigo-500" /><span>{notice.author}</span></span>
                                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 font-semibold rounded-full">Target: {notice.target}</span>
                                </div>

                                {/* --- VISIBLE PDF LINK FIX --- */}
                                {notice.pdfAttachment?.dataUrl ? (
                                    <div className="mt-4 ml-7">
                                        <a
                                            href={notice.pdfAttachment.dataUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center space-x-2 px-3 py-1 bg-green-100 rounded-md text-sm font-medium text-green-700 hover:bg-green-200 transition"
                                        >
                                            <FileText className="w-4 h-4" />
                                            <span>View Attachment: {notice.pdfAttachment.name}</span>
                                        </a>
                                    </div>
                                ) : (
                                    <div className="mt-4 ml-7 text-sm text-gray-400 flex items-center space-x-1">
                                        <FileX className="w-4 h-4" />
                                        <span>No PDF attached.</span>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex space-x-1 flex-shrink-0 mt-3 md:mt-0 md:ml-4 self-center">
                                <button
                                    onClick={() => handleOpenModal(notice)}
                                    className="text-indigo-600 hover:text-white hover:bg-indigo-600 p-2 rounded-full transition duration-150 border border-indigo-200"
                                    title="Edit"
                                >
                                    <Edit className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleDeleteNotice(notice.id)}
                                    className="text-red-600 hover:text-white hover:bg-red-600 p-2 rounded-full transition duration-150 border border-red-200"
                                    title="Delete"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Notice Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-start pt-10 sm:items-center z-50 p-4">
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
                        <h3 className="text-2xl font-bold mb-6 border-b pb-2 flex items-center space-x-2">
                            <Megaphone className="w-5 h-5 text-indigo-600" />
                            <span>{editingNotice !== null ? 'Edit Announcement' : 'Create New Announcement'}</span>
                        </h3>

                        <form onSubmit={handleSaveNotice} className="space-y-5">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-1">Content / Message</label>
                                <textarea
                                    name="content"
                                    id="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows="6"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    placeholder="Enter the full details of the notice..."
                                />
                            </div>

                            {/* Target Audience */}
                            <div>
                                <label htmlFor="target" className="block text-sm font-semibold text-gray-700 mb-1">Target Audience</label>
                                <select
                                    name="target"
                                    id="target"
                                    value={formData.target}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-white focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                                >
                                    <option value="All Teams">All Teams (Participants)</option>
                                    <option value="Evaluators Only">Evaluators Only</option>
                                    <option value="Section Heads Only">Section Heads Only</option>
                                    <option value="All System Users">All System Users</option>
                                </select>
                            </div>


                            {/* PDF Upload Option in Modal */}
                            <div className='pt-2'>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    PDF Attachment (Optional)
                                </label>
                                {formData.pdfAttachment ? (
                                    <div className="flex items-center justify-between p-3 border border-green-400 bg-green-50 rounded-lg shadow-inner">
                                        <span className="text-sm text-green-900 font-medium flex items-center space-x-2 truncate">
                                            <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span className='truncate'>Attached: {formData.pdfAttachment.name}</span>
                                        </span>
                                        <button
                                            type="button"
                                            onClick={handleRemovePdf}
                                            className="text-red-500 hover:text-red-700 p-1 transition flex-shrink-0 rounded-full hover:bg-red-100"
                                            title="Remove attachment"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center space-y-1 px-4 py-6 border-2 border-dashed border-indigo-300 text-indigo-600 bg-indigo-50 rounded-lg cursor-pointer hover:bg-indigo-100 transition shadow-inner">
                                        <Upload className="w-6 h-6" />
                                        <span className="text-sm font-medium text-center">Click to select a PDF file</span>
                                        <span className="text-xs text-indigo-400">Accepted format: PDF only</span>
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!formData.title || !formData.content}
                                    className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 flex items-center disabled:opacity-50 transition shadow-md"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {editingNotice !== null ? 'Save Changes' : 'Publish Notice'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
