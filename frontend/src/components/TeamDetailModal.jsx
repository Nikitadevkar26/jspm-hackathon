"use client";

import { ImageIcon, Mail, Phone, User, Users, X } from "lucide-react";
import { useEffect, useState } from "react";

const FILE_BASE_URL = "http://localhost:5001/uploads";

export default function TeamDetailModal({ teamId, onClose }) {
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!teamId) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("adminToken");
        const res = await fetch(
          `http://localhost:5001/api/registrations/${teamId}`, {
          headers: {
            "Authorization": token ? `Bearer ${token}` : ""
          }
        }
        );

        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();
        setTeam(data.team);
        setMembers(data.members || []);
      } catch (err) {
        setError("Failed to load team details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [teamId]);

  if (!teamId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 bg-indigo-700 text-white">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Users size={20} />
            {team?.team_name || "Team Details"}
          </div>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}

          {team && (
            <>
              {/* TEAM INFO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-lg">
                <Info label="Leader" value={team.leader_name} />
                <Info label="Email" value={team.email} />
                <Info label="Theme" value={team.theme} />
                <Info label="Project" value={team.project_title} />
                <Info label="Status" value={team.status} />
                <Info label="College Type" value={team.college_type} />
                <Info label="Country" value={team.country} />
                <Info label="Pincode" value={team.pincode} />
              </div>

              {/* 💳 PAYMENT PROOF IMAGE */}
              {team.payment_proof_image && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold flex items-center gap-2 mb-3">
                    <ImageIcon size={16} />
                    Payment Proof
                  </p>

                  <img
                    src={`${FILE_BASE_URL}/payments/${team.payment_proof_image}`}
                    alt="Payment Proof"
                    className="max-w-full max-h-96 rounded border cursor-pointer"
                    onClick={() =>
                      window.open(
                        `${FILE_BASE_URL}/payments/${team.payment_proof_image}`,
                        "_blank"
                      )
                    }
                  />
                </div>
              )}

              {/* MEMBERS */}
              <div>
                <h3 className="text-base font-semibold mb-3">Team Members</h3>

                <div className="space-y-4">
                  {members.map((m) => (
                    <div
                      key={m.member_id}
                      className="border rounded-lg p-4 bg-white shadow-sm"
                    >
                      <p className="font-semibold flex items-center gap-2">
                        <User size={16} />
                        {m.member_name} ({m.role})
                      </p>

                      <p className="text-gray-600 flex items-center gap-2 mt-1">
                        <Mail size={14} /> {m.email}
                      </p>

                      <p className="text-gray-600 flex items-center gap-2">
                        <Phone size={14} /> {m.phone}
                      </p>

                      <p className="text-gray-500 text-sm mt-1">
                        {m.branch}, {m.year} – {m.college_name}
                      </p>

                      {/* 🪪 ID PROOF IMAGE */}
                      {m.id_proof_image && (
                        <div className="mt-3">
                          <p className="text-sm font-semibold flex items-center gap-2 mb-2">
                            <ImageIcon size={14} />
                            ID Proof
                          </p>

                          <img
                            src={`${FILE_BASE_URL}/id-proofs/${m.id_proof_image}`}
                            alt="ID Proof"
                            className="max-w-xs max-h-64 rounded border cursor-pointer"
                            onClick={() =>
                              window.open(
                                `${FILE_BASE_URL}/id-proofs/${m.id_proof_image}`,
                                "_blank"
                              )
                            }
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end px-6 py-4 bg-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* INFO ROW */
const Info = ({ label, value }) => (
  <p className="text-sm">
    <span className="font-semibold text-gray-700">{label}:</span>{" "}
    <span className="text-gray-600">{value || "-"}</span>
  </p>
);
