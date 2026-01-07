"use client";

import { Eye, List, Mail, Search, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import TeamDetailModal from "../components/TeamDetailModal";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  /* =========================
     FETCH TEAMS (DYNAMIC)
  ========================= */
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const { data } = await axios.get(
          "http://localhost:8088/api/registrations/ready-for-evaluation",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTeams(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch teams error:", err);
        setTeams([]);
      }
    };

    fetchTeams();
  }, []);

  /* =========================
     FILTER LOGIC
  ========================= */
  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      const matchSearch =
        team.team_name?.toLowerCase().includes(search.toLowerCase()) ||
        team.project_title?.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        filterStatus === "All" || team.status === filterStatus;

      return matchSearch && matchStatus;
    });
  }, [teams, search, filterStatus]);

  return (
    <div className="p-6 lg:p-10 bg-[#f8fafc] min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black">Teams Allocation</h1>
          <p className="text-slate-500">
            Manage team assignments and judge workloads
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search teams..."
              className="pl-10 pr-4 py-2 border rounded-xl text-sm"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-xl text-sm font-semibold"
          >
            <option value="All">All Status</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* =========================
         STATIC EVALUATOR CARDS
      ========================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <EvaluatorCard name="Dr. Sarah Smith" domain="IOT" count={2} />
        <EvaluatorCard name="Prof. James Wilson" domain="AI/ML" count={1} />
        <EvaluatorCard name="Elena Rodriguez" domain="BLOCKCHAIN" count={0} />
        <EvaluatorCard name="Michael Chen" domain="FINTECH" count={0} />
      </div>

      {/* =========================
         TEAM LEDGER (DYNAMIC)
      ========================= */}
      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
            Team Ledger
          </h2>
          <List className="w-4 h-4 text-slate-400" />
        </div>

        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs uppercase text-slate-400">
                Team & Title
              </th>
              <th className="px-6 py-4 text-center text-xs uppercase text-slate-400">
                Status
              </th>
              <th className="px-6 py-4 text-center text-xs uppercase text-slate-400">
                Manage
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredTeams.map((team) => (
              <tr key={team.team_id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <p className="font-bold">{team.team_name}</p>
                  <p className="text-xs text-indigo-600 font-semibold">
                    {team.project_title}
                  </p>
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                    Approved
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setSelectedTeamId(team.team_id)}
                      className="p-2 rounded-lg hover:bg-indigo-50"
                    >
                      <Eye className="w-4 h-4 text-indigo-600" />
                    </button>

                    <a
                      href={`mailto:${team.email}`}
                      className="p-2 rounded-lg hover:bg-indigo-50"
                    >
                      <Mail className="w-4 h-4 text-indigo-600" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}

            {filteredTeams.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-slate-400"
                >
                  No teams found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* =========================
         TEAM DETAIL MODAL
      ========================= */}
      {selectedTeamId && (
        <TeamDetailModal
          teamId={selectedTeamId}
          onClose={() => setSelectedTeamId(null)}
        />
      )}
    </div>
  );
}

/* =========================
   EVALUATOR CARD (STATIC)
========================= */
const EvaluatorCard = ({ name, domain, count }) => (
  <div className="bg-white border rounded-2xl p-6 flex justify-between items-start">
    <div>
      <Users className="w-6 h-6 text-slate-400 mb-3" />
      <h3 className="font-bold">{name}</h3>
      <p className="text-xs text-slate-400 uppercase">{domain}</p>
    </div>
    <span className="px-2 py-1 text-xs font-bold rounded-lg bg-green-100 text-green-700">
      {count}
    </span>
  </div>
);
