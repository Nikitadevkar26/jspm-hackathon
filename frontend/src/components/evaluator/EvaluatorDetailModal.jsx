"use client";

import { Briefcase, FileText, Image as ImageIcon, Mail, Phone, User, X } from "lucide-react";
import { useEffect, useState } from "react";

const FILE_BASE_URL = "http://localhost:5001/uploads";

export default function EvaluatorDetailModal({ evaluatorId, onClose, onSendEmail }) {
    const [evaluator, setEvaluator] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!evaluatorId) return;

        const fetchDetails = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("adminToken");
                const res = await fetch(
                    `http://localhost:5001/api/evaluators/${evaluatorId}`, {
                    headers: {
                        "Authorization": token ? `Bearer ${token}` : ""
                    }
                }
                );

                if (!res.ok) throw new Error("Fetch failed");

                const data = await res.json();
                setEvaluator(data);
            } catch (err) {
                setError("Failed to load evaluator details");
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [evaluatorId]);

    if (!evaluatorId) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* HEADER */}
                <div className="flex justify-between items-center px-6 py-4 bg-indigo-700 text-white shrink-0">
                    <div className="flex items-center gap-2 text-lg font-semibold">
                        <User size={20} />
                        {evaluator?.name || "Evaluator Details"}
                    </div>
                    <button onClick={onClose} className="hover:bg-indigo-600 p-1 rounded transition">
                        <X />
                    </button>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-6 overflow-y-auto grow">
                    {loading && (
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-700"></div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    {evaluator && !loading && (
                        <div className="space-y-6">

                            {/* BASIC INFO */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-lg border border-gray-100">
                                <InfoItem icon={<Mail size={16} />} label="Email" value={evaluator.email} />
                                <InfoItem icon={<Phone size={16} />} label="Phone" value={evaluator.phone} />
                                <InfoItem icon={<Briefcase size={16} />} label="Expertise" value={evaluator.expertise} />
                                <InfoItem icon={<FileText size={16} />} label="Experience" value={`${evaluator.experience || 0} Years`} />

                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Status</span>
                                    <span className={`inline-flex self-start px-2 py-1 rounded text-xs font-bold ${evaluator.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                            evaluator.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {evaluator.status}
                                    </span>
                                </div>
                            </div>

                            {/* ID PROOF */}
                            {evaluator.id_proof_image && (
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold flex items-center gap-2 mb-3 text-gray-800">
                                        <ImageIcon size={18} className="text-indigo-600" />
                                        ID Proof Document
                                    </h4>
                                    <div className="bg-gray-100 p-2 rounded flex justify-center">
                                        <img
                                            src={`${FILE_BASE_URL}/id-proofs/${evaluator.id_proof_image}`}
                                            alt="ID Proof"
                                            className="max-h-64 object-contain rounded border bg-white cursor-zoom-in"
                                            onClick={() => window.open(`${FILE_BASE_URL}/id-proofs/${evaluator.id_proof_image}`, '_blank')}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t shrink-0">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition"
                    >
                        Close
                    </button>

                    {evaluator && evaluator.status !== 'Pending' && (
                        <button
                            onClick={() => {
                                onClose();
                                onSendEmail(evaluator);
                            }}
                            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center gap-2 transition"
                        >
                            <Mail size={16} /> Send Email
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

const InfoItem = ({ icon, label, value }) => (
    <div className="flex flex-col">
        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
            {icon} {label}
        </span>
        <span className="text-gray-900 font-medium truncate" title={value}>{value || "N/A"}</span>
    </div>
);
