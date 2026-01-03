import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Send, 
  CheckCircle2, 
  Search, 
  Trophy,
  Info
} from 'lucide-react';

// --- Mock Data ---
const mockEvaluators = [
    { id: 101, name: "Dr. Aristhoth", expertise: "AI/ML", assignedCount: 2 },
    { id: 102, name: "Prof. Sarah Jenkins", expertise: "Web Security", assignedCount: 5 },
    { id: 103, name: "Engr. Mike Ross", expertise: "Blockchain", assignedCount: 0 },
    { id: 104, name: "Dr. Elena Gilbert", expertise: "Data Science", assignedCount: 3 },
];

const mockTeams = [
    { id: 1, team_name: "Cyber Knights", project: "Secure Auth System", category: "Security" },
    { id: 2, team_name: "Alpha Coders", project: "E-Health App", category: "Mobile" },
    { id: 3, team_name: "Data Wizards", project: "Traffic Predictor", category: "AI" },
    { id: 4, team_name: "Green Tech", project: "Solar Tracker", category: "IoT" },
    { id: 5, team_name: "Neural Nets", project: "Face Recognition", category: "AI" },
    { id: 6, team_name: "Block Builders", project: "Supply Chain Ledger", category: "Blockchain" },
];

export default function AssignTeamsPage() {
    const [selectedEvaluator, setSelectedEvaluator] = useState("");
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleTeam = (teamId) => {
        setSelectedTeams(prev =>
            prev.includes(teamId)
                ? prev.filter(id => id !== teamId)
                : [...prev, teamId]
        );
    };

    const handleAssign = () => {
        if (!selectedEvaluator || selectedTeams.length === 0) {
            alert("Please select both an evaluator and at least one team.");
            return;
        }

        const evaluator = mockEvaluators.find(e => e.id === parseInt(selectedEvaluator));

        console.log("Dispatching Assignment:", {
            evaluatorId: selectedEvaluator,
            evaluatorName: evaluator.name,
            teamIds: selectedTeams
        });

        alert(`Successfully sent ${selectedTeams.length} teams to ${evaluator.name}'s dashboard.`);

        setSelectedTeams([]);
        setSelectedEvaluator("");
    };

    const filteredTeams = mockTeams.filter(team =>
        team.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.project.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                            <UserCheck className="text-indigo-600 w-8 h-8" />
                            Dispatch Teams to Evaluator
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Select teams and assign them to specific judges for final scoring.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100">
                        <Info className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium text-indigo-700">
                            Assignments are live immediately
                        </span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">

                            <label className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2 uppercase tracking-wider">
                                <Users className="w-4 h-4 text-indigo-500" />
                                1. Select Evaluator
                            </label>

                            <select
                                value={selectedEvaluator}
                                onChange={(e) => setSelectedEvaluator(e.target.value)}
                                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            >
                                <option value="">-- Choose a Judge --</option>
                                {mockEvaluators.map(evaluator => (
                                    <option key={evaluator.id} value={evaluator.id}>
                                        {evaluator.name} ({evaluator.expertise})
                                    </option>
                                ))}
                            </select>

                            <div className="mt-8 p-5 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl text-white shadow-lg">
                                <h4 className="font-semibold text-sm opacity-90 mb-4 flex items-center gap-2">
                                    <Trophy className="w-4 h-4" />
                                    Assignment Summary
                                </h4>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="opacity-80">Teams Selected:</span>
                                        <span className="font-bold text-xl">{selectedTeams.length}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="opacity-80">Target Evaluator:</span>
                                        <span className="font-medium truncate max-w-[120px]">
                                            {selectedEvaluator
                                                ? mockEvaluators.find(e => e.id === parseInt(selectedEvaluator))?.name
                                                : "None"}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAssign}
                                    disabled={!selectedEvaluator || selectedTeams.length === 0}
                                    className="w-full mt-6 bg-white text-indigo-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition active:scale-95 disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                    Send Teams List
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2 uppercase tracking-wider">
                                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                                2. Pick Teams
                            </label>

                            <div className="relative w-full sm:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Filter by name or project..."
                                    className="pl-10 pr-4 py-2 w-full border border-gray-200 bg-gray-50 rounded-full text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {filteredTeams.map(team => {
                                const isSelected = selectedTeams.includes(team.id);
                                return (
                                    <div
                                        key={team.id}
                                        onClick={() => toggleTeam(team.id)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer flex items-start gap-4 transition-all ${
                                            isSelected
                                                ? 'border-indigo-600 bg-indigo-50'
                                                : 'border-gray-100 bg-gray-50 hover:border-indigo-200'
                                        }`}
                                    >
                                        <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                            isSelected ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'
                                        }`}>
                                            {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                                        </div>

                                        <div className="overflow-hidden">
                                            <h3 className="font-bold text-gray-800 truncate">{team.team_name}</h3>
                                            <p className="text-xs text-gray-500 italic truncate">{team.project}</p>
                                            <span className="inline-block px-2 py-0.5 bg-gray-200 text-gray-600 text-[10px] font-bold rounded uppercase">
                                                {team.category}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {filteredTeams.length === 0 && (
                            <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                <p className="text-gray-400 font-medium">
                                    No teams found matching "{searchTerm}"
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
