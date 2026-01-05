"use client";

import {
    AlertCircle,
    CheckCircle,
    Eye,
    FileText,
    Mail,
    XCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import TeamDetailModal from "../components/TeamDetailModal";

const BASE_URL = "http://localhost:5001";

export default function Registrations() {
    const [teams, setTeams] = useState([]);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(true);

    /* ✅ GET ALL TEAMS */
    const fetchTeams = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("adminToken");
            const res = await fetch(`${BASE_URL}/api/registrations`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) throw new Error("Failed to fetch teams");
            const data = await res.json();
            setTeams(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            setNotification({ msg: "Failed to load registrations", type: "error" });
            setTeams([]);
        } finally {
            setLoading(false);
        }
    };

    /* ✅ GET READY FOR EVALUATION */
    const fetchReadyForEvaluation = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("adminToken");
            const res = await fetch(
                `${BASE_URL}/api/registrations/ready-for-evaluation`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (!res.ok) throw new Error("Failed");
            const data = await res.json();
            setTeams(data);
        } catch (error) {
            console.error(error);
            setNotification({
                msg: "Failed to load ready for evaluation teams",
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    /* ✅ UPDATE STATUS (APPROVE / REJECT) */
    const updateStatus = async (teamId, status) => {
        try {
            const token = localStorage.getItem("adminToken");
            const res = await fetch(
                `${BASE_URL}/api/registrations/${teamId}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ status })
                }
            );

            if (!res.ok) throw new Error("Status update failed");

            setTeams(prev =>
                prev.map(team =>
                    team.team_id === teamId ? { ...team, status } : team
                )
            );

            setNotification({
                msg: `Team ${status.toUpperCase()}`,
                type: status === "approved" ? "success" : "error"
            });

            setTimeout(() => setNotification(null), 3000);
        } catch (error) {
            console.error(error);
            setNotification({
                msg: "Failed to update status",
                type: "error"
            });
        }
    };

    /* ✅ SEND EMAIL */
    const sendEmail = async (teamId) => {
        try {
            const token = localStorage.getItem("adminToken");
            await fetch(
                `${BASE_URL}/api/registrations/${teamId}/send-email`,
                {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setNotification({
                msg: "Email sent successfully",
                type: "success"
            });

            setTimeout(() => setNotification(null), 3000);
        } catch (error) {
            console.error(error);
            setNotification({
                msg: "Failed to send email",
                type: "error"
            });
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold flex items-center gap-2 mb-4">
                <FileText /> Teams Registrations Review
            </h1>

            {/* ✅ FILTER BUTTONS */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={fetchTeams}
                    className="bg-gray-700 text-white px-4 py-2 rounded"
                >
                    All Teams
                </button>
                <button
                    onClick={fetchReadyForEvaluation}
                    className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                    Ready for Evaluation
                </button>
            </div>

            {/* ✅ NOTIFICATION */}
            {notification && (
                <div
                    className={`p-4 mb-4 rounded flex items-center gap-2 ${
                        notification.type === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    <AlertCircle size={18} />
                    {notification.msg}
                </div>
            )}

            {/* ✅ LOADING */}
            {loading ? (
                <p className="text-center text-gray-500">Loading registrations...</p>
            ) : (
                <div className="bg-white rounded-xl shadow overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">Team</th>
                                <th className="p-3 text-left">Leader</th>
                                <th className="p-3 text-left">Theme</th>
                                <th className="p-3 text-left">Project</th>
                                <th className="p-3 text-center">Status</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {teams.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-6 text-center text-gray-500">
                                        No registrations found
                                    </td>
                                </tr>
                            ) : (
                                teams.map(team => (
                                    <tr key={team.team_id} className="border-t">
                                        <td className="p-3 font-semibold">{team.team_name}</td>
                                        <td className="p-3">{team.leader_name}</td>
                                        <td className="p-3">{team.theme}</td>
                                        <td className="p-3">{team.project_title}</td>
                                        <td className="p-3 text-center">{team.status}</td>

                                        <td className="p-3 flex justify-center gap-2">
                                            <button
                                                onClick={() => setSelectedTeamId(team.team_id)}
                                                className="bg-indigo-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                                            >
                                                <Eye size={14} /> View
                                            </button>

                                            {team.status === "Pending" && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            updateStatus(team.team_id, "approved")
                                                        }
                                                        className="bg-green-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                                                    >
                                                        <CheckCircle size={14} /> Approve
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            updateStatus(team.team_id, "rejected")
                                                        }
                                                        className="bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                                                    >
                                                        <XCircle size={14} /> Reject
                                                    </button>
                                                </>
                                            )}

                                            {team.status !== "Pending" && (
                                                <button
                                                    onClick={() => sendEmail(team.team_id)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                                                >
                                                    <Mail size={14} /> Send Email
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ✅ MODAL */}
            <TeamDetailModal
                teamId={selectedTeamId}
                onClose={() => setSelectedTeamId(null)}
            />
        </div>
    );
}
