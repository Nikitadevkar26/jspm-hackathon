import React, { useEffect, useState } from "react";

const TeamProfile = () => {
  const teamUser = JSON.parse(localStorage.getItem("teamUser"));
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teamUser?.team_id) return;

    fetch(`http://localhost:5001/api/team-details/${teamUser.team_id}`)
      .then(res => res.json())
      .then(data => {
        setTeam(data.team);
        setMembers(data.members || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [teamUser]);

  if (loading) return <p>Loading team profile...</p>;
  if (!team) return <p>No team data found</p>;

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Team Profile
      </h1>

      {/* ================= TEAM INFORMATION ================= */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-6 mb-6">
        <Section title="Team Information">
          <InfoGrid>
            <ProfileItem label="Team Name" value={team.team_name} />
            <ProfileItem label="Leader Name" value={team.leader_name} />
            <ProfileItem label="Leader Email" value={team.email} />
            <ProfileItem label="College Type" value={team.college_type} />
            <ProfileItem label="Country" value={team.country} />
            <ProfileItem label="Pincode" value={team.pincode} />
            <ProfileItem label="Project Title" value={team.project_title} />
            <ProfileItem label="Theme" value={team.theme} />
            <ProfileItem label="Score" value={team.score ?? "Not Evaluated"} />
            <ProfileItem
              label="Registered On"
              value={new Date(team.created_at).toLocaleString()}
            />
            <ProfileItem label="Total Members" value={members.length} />
          </InfoGrid>
        </Section>

        {/* ================= STATUS ================= */}
        <Section title="Team Status">
          <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold capitalize">
            {team.status}
          </span>
        </Section>

        {/* ================= ACTION ================= */}
        <button
          disabled
          className="px-5 py-2 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed"
        >
          Edit Profile (Coming Soon)
        </button>
      </div>

      {/* ================= TEAM MEMBERS ================= */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Team Members
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <Th>#</Th>
                <Th>Name</Th>
                <Th>Role</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Branch</Th>
                <Th>Year</Th>
                <Th>College</Th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, index) => (
                <tr key={m.member_id} className="border-t">
                  <Td>{index + 1}</Td>
                  <Td>{m.member_name}</Td>
                  <Td className="font-semibold">{m.role || "Member"}</Td>
                  <Td>{m.email}</Td>
                  <Td>{m.phone}</Td>
                  <Td>{m.branch}</Td>
                  <Td>{m.year}</Td>
                  <Td>{m.college_name}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>
    {children}
  </div>
);

const InfoGrid = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
    {children}
  </div>
);

const ProfileItem = ({ label, value }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-medium text-gray-800 break-all">{value || "-"}</p>
  </div>
);

const Th = ({ children }) => (
  <th className="px-3 py-2 text-left font-semibold text-gray-600">
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="px-3 py-2 text-gray-700">{children}</td>
);

export default TeamProfile;
