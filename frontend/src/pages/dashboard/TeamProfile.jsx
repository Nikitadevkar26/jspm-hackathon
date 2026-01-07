import React, { useEffect, useState } from "react";
import axios from "axios";

const TeamProfile = () => {
  const teamUser = JSON.parse(localStorage.getItem("teamUser"));
  const teamId = teamUser?.team_id;
  const token = localStorage.getItem("teamToken");

  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teamId || !token) return;

    const fetchTeamDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8088/api/team-details/${teamId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Cache-Control": "no-cache",
            },
          }
        );

        setTeam(res.data.team);
        setMembers(res.data.members || []);
      } catch (err) {
        console.error("Failed to fetch team details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, [teamId, token]);

  if (loading) return <p>Loading team profile...</p>;
  if (!team) return <p>No team data found</p>;

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Team Profile</h1>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <Info label="Team Name" value={team.team_name} />
        <Info label="Leader Name" value={team.leader_name} />
        <Info label="Email" value={team.email} />
        <Info label="Project Title" value={team.project_title} />
        <Info label="Theme" value={team.theme} />
        <Info label="Status" value={team.status} />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Team Members</h2>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Role</Th>
              <Th>Email</Th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr key={m.member_id} className="border-t">
                <Td>{i + 1}</Td>
                <Td>{m.member_name}</Td>
                <Td>{m.role || "Member"}</Td>
                <Td>{m.email}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <p className="text-sm mb-2">
    <span className="text-gray-500">{label}:</span>{" "}
    <span className="font-medium">{value || "-"}</span>
  </p>
);

const Th = ({ children }) => (
  <th className="px-3 py-2 text-left font-semibold text-gray-600">{children}</th>
);

const Td = ({ children }) => (
  <td className="px-3 py-2">{children}</td>
);

export default TeamProfile;
