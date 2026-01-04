"use client";

import { Send, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function EvaluatorEmailModal({ isOpen, evaluator, onClose, onSend }) {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (isOpen && evaluator) {
            if (evaluator.status === "Approved") {
                setSubject("JSCOE Hackathon: Evaluator Application Approved");
                setMessage(
                    `Dear ${evaluator.name || 'Evaluator'},

We are pleased to inform you that your application to be an evaluator for the JSCOE Innovation Hackathon has been APPROVED.

We are excited to have your expertise onboard. Further details regarding the evaluation criteria, schedule, and platform access will be shared shortly.

Welcome to the team!

Best regards,
Hackathon Organizing Committee`
                );
            } else if (evaluator.status === "Rejected") {
                setSubject("JSCOE Hackathon: Evaluator Application Update");
                setMessage(
                    `Dear ${evaluator.name || 'Evaluator'},

Thank you for your interest in being an evaluator for the JSCOE Innovation Hackathon.

After careful review of your profile, we regret to inform you that we are unable to proceed with your application at this time. We received a high volume of applications and had to make difficult selection decisions.

We appreciate your willingness to contribute and hope you will consider participating in future events.

Best regards,
Hackathon Organizing Committee`
                );
            } else {
                setSubject("");
                setMessage("");
            }
        }
    }, [isOpen, evaluator]);

    if (!isOpen || !evaluator) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!evaluator?.email) return;

        await onSend({
            to: evaluator.email,
            subject,
            message
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col">

                {/* HEADER */}
                <div className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Send size={18} className="text-green-400" /> Compose Email
                    </h3>
                    <button onClick={onClose} className="hover:text-gray-300 transition">
                        <X />
                    </button>
                </div>

                {/* BODY */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    {/* TO */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">To</label>
                        <input
                            type="text"
                            value={`${evaluator.name || 'Evaluator'} <${evaluator.email || ''}>`}
                            disabled
                            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-500 text-sm"
                        />
                    </div>

                    {/* SUBJECT */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            placeholder="Enter email subject..."
                        />
                    </div>

                    {/* MESSAGE */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows={8}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
                            placeholder="Write your message here..."
                        />
                    </div>

                    {/* FOOTER ACTIONS */}
                    <div className="pt-2 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition transform active:scale-95"
                        >
                            <Send size={16} /> Send Email
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
