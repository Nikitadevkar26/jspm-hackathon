"use client";

import React, { useEffect, useState } from "react";
import TeamDetailModal from "../components/TeamDetailModal";
import {
    FileText,
    CheckCircle,
    XCircle,
    Eye,
    Mail,
    AlertCircle
} from "lucide-react";

export default function Registrations() {
    const [teams, setTeams] = useState([]);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(true);

    /* ✅ FETCH TEAMS */
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/registrations");
                if (!res.ok) throw new Error("Failed to fetch teams");

                const data = await res.json();
                setTeams(data);
            } catch (error) {
                console.error("Fetch error:", error);
                setNotification({
                    msg: "Failed to load registrations",
                    type: "error"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    /* ✅ UPDATE STATUS */
    const updateStatus = async (teamId, status) => {
        try {
            const res = await fetch(
                `http://localhost:5001/api/registrations/${teamId}/status`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status })
                }
            );

            if (!res.ok) throw new Error("Status update failed");

            setTeams(prev =>
                prev.map(team =>
                    team.team_id === teamId
                        ? { ...team, status }
                        : team
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

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
                <FileText /> Teams Registrations Review
            </h1>

            {/* ✅ NOTIFICATION */}
            {notification && (
                <div
                    className={`p-4 mb-4 rounded flex items-center gap-2 ${notification.type === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                >
                    <AlertCircle size={18} />
                    {notification.msg}
                </div>
            )}

            {/* ✅ LOADING STATE */}
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
                                    <td
                                        colSpan="6"
                                        className="p-6 text-center text-gray-500"
                                    >
                                        No registrations found
                                    </td>
                                </tr>
                            ) : (
                                teams.map(team => (
                                    <tr key={team.team_id} className="border-t">
                                        <td className="p-3 font-semibold">
                                            {team.team_name}
                                        </td>
                                        <td className="p-3">{team.leader_name}</td>
                                        <td className="p-3">{team.theme}</td>
                                        <td className="p-3">{team.project_title}</td>
                                        <td className="p-3 text-center">
                                            {team.status}
                                        </td>

                                        <td className="p-3 flex justify-center gap-2">
                                            <button
                                                onClick={() =>
                                                    setSelectedTeamId(team.team_id)
                                                }
                                                className="bg-indigo-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                                            >
                                                <Eye size={14} /> View
                                            </button>

                                            {team.status === "Pending" && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            updateStatus(
                                                                team.team_id,
                                                                "approved"
                                                            )
                                                        }
                                                        className="bg-green-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                                                    >
                                                        <CheckCircle size={14} /> Approve
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            updateStatus(
                                                                team.team_id,
                                                                "rejected"
                                                            )
                                                        }
                                                        className="bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                                                    >
                                                        <XCircle size={14} /> Reject
                                                    </button>
                                                </>
                                            )}

                                            {team.status !== "Pending" && (
                                                <button
                                                    onClick={async () => {
                                                        await fetch(
                                                            `http://localhost:5001/api/registrations/${team.team_id}/send-email`,
                                                            { method: "POST" }
                                                        );
                                                        alert("Email sent successfully");
                                                    }}
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
