import React, { useState } from 'react';

const AdminDashboard = () => {
  // State for the critical "Admin enables idea submissions" toggle
  const [submissionEnabled, setSubmissionEnabled] = useState(false);

  // Mock data for teams
  const [teams] = useState([
    { id: 101, name: 'Tech Titans', domain: 'HealthTech', assignedTo: 'Dr. Patil' },
    { id: 102, name: 'Agri-Innovators', domain: 'Agriculture', assignedTo: 'Pending' },
    { id: 103, name: 'Code Warriors', domain: 'Smart Automation', assignedTo: 'Prof. Kulkarni' },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Control Panel 🛡️</h1>
        <div className="text-sm text-gray-300">Logged in as: Administrator</div>
      </header>

      <main className="max-w-7xl mx-auto p-8 space-y-8">
        
        {/* --- CRITICAL CONTROL SECTION (Red Block from PDF) --- */}
        <section className="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-red-600 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Submission Portal Control</h2>
            <p className="text-gray-500 mt-1">
              Toggle this switch to Allow or Deny students from accessing the submission form.
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <span className={`font-bold text-sm uppercase ${submissionEnabled ? 'text-green-600' : 'text-red-600'}`}>
              Status: {submissionEnabled ? 'OPEN' : 'LOCKED'}
            </span>
            
            {/* The Toggle Switch */}
            <button 
              onClick={() => setSubmissionEnabled(!submissionEnabled)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                submissionEnabled ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  submissionEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </section>

        {/* --- TEAM ALLOCATION SECTION (Red Block from PDF) --- */}
        <section className="bg-white p-6 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Team Allocation & Evaluator Mapping</h2>
            <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition">
              Send List to Evaluators 📧
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                  <th className="p-4 rounded-tl-lg">Team ID</th>
                  <th className="p-4">Team Name</th>
                  <th className="p-4">Domain</th>
                  <th className="p-4">Assigned Evaluator</th>
                  <th className="p-4 rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {teams.map((team) => (
                  <tr key={team.id} className="hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm text-gray-500">#{team.id}</td>
                    <td className="p-4 font-bold text-gray-800">{team.name}</td>
                    <td className="p-4">
                      <span className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs font-semibold border border-red-100">
                        {team.domain}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      {team.assignedTo === 'Pending' ? (
                        <span className="text-amber-500 font-bold">Unassigned</span>
                      ) : (
                        <span className="text-green-600 font-bold">✓ {team.assignedTo}</span>
                      )}
                    </td>
                    <td className="p-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
};

export default AdminDashboard;