import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA & CONSTANTS (Your Original Evaluator Data) ---
const INITIAL_APPLICATIONS = [
    { id: 101, projectName: 'AI Recipe Generator', studentName: 'Alice Johnson', status: 'Pending', description: 'A mobile app that generates custom recipes based on user-input ingredients.', githubLink: 'https://github.com/ai-recipe', demoVideoLink: 'https://youtube.com/demo-101', submissionFiles: ['Model.py', 'AppScreenshots.zip'] },
    { id: 102, projectName: 'Blockchain Voting System', studentName: 'Bob Smith', status: 'Pending', description: 'A secure, decentralized voting application leveraging smart contracts.', githubLink: 'https://github.com/blockchain-vote', demoVideoLink: 'https://youtube.com/demo-video-102', submissionFiles: ['Whitepaper.pdf', 'SmartContractCode.sol'] },
    { id: 103, projectName: 'Eco-Friendly E-Commerce', studentName: 'Charlie Brown', status: 'Completed', score: 42, comment: "Excellent feasibility, solid implementation.", description: 'An e-commerce platform that exclusively sells sustainable products.', githubLink: 'https://github.com/eco-commerce', demoVideoLink: 'https://youtube.com/demo-103', submissionFiles: ['BusinessPlan.pdf'] },
];

const CRITERIA = [
    { id: 'novelty', name: 'Novelty of Idea', max: 10 },
    { id: 'complexity', name: 'Complexity & Clarity', max: 10 },
    { id: 'feasibility', name: 'Feasibility & Practicability', max: 10 },
    { id: 'impact', name: 'Scale of Impact & User Experience', max: 10 },
    { id: 'futureScope', name: 'Potential for Future Scope', max: 10 },
];

const MAX_TOTAL_SCORE = CRITERIA.reduce((sum, c) => sum + c.max, 0);

// --- HELPER COMPONENTS ---
const LinkButton = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition">
        {children}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4-2h5m0 0l-5-5m5 5l-5 5"></path></svg>
    </a>
);

const CombinedDashboard = ({ userRole }) => {
    const navigate = useNavigate();

    // --- SHARED STATES ---
    const [applications, setApplications] = useState(INITIAL_APPLICATIONS);

    // --- EVALUATOR STATES (KEPT ORIGINAL) ---
    const [evaluatorPage, setEvaluatorPage] = useState('dashboard');
    const [scoringAppId, setScoringAppId] = useState(null);
    const [scores, setScores] = useState(CRITERIA.reduce((acc, c) => ({ ...acc, [c.id]: 0 }), {}));
    const [comments, setComments] = useState('');

    // --- EVALUATOR LOGIC (KEPT ORIGINAL) ---
    const selectedProject = useMemo(() => {
        return applications.find(app => app.id === scoringAppId);
    }, [scoringAppId, applications]);

    const currentTotal = useMemo(() => {
        return Object.values(scores).reduce((sum, score) => sum + (Number(score) || 0), 0);
    }, [scores]);

    const handleScoreChange = (criterionId, value) => {
        const max = CRITERIA.find(c => c.id === criterionId).max;
        let score = Math.min(Math.max(0, parseInt(value, 10) || 0), max);
        setScores(prev => ({ ...prev, [criterionId]: score }));
    };

    const handleScoreSubmit = (e) => {
        e.preventDefault();
        setApplications(prev => prev.map(app =>
            app.id === scoringAppId ? { ...app, status: 'Completed', score: currentTotal, comment: comments } : app
        ));
        alert(`Score submitted: ${currentTotal}/${MAX_TOTAL_SCORE}`);
        setEvaluatorPage('dashboard');
        setScoringAppId(null);
    };

    // --- RENDER FUNCTIONS ---

    // 1. ORIGINAL EVALUATOR DASHBOARD
    const renderEvaluatorContent = () => {
        if (evaluatorPage === 'scoring' && selectedProject) {
            return (
                <div className="bg-white p-6 rounded-xl shadow-lg border-4 border-red-700">
                    <button onClick={() => setEvaluatorPage('dashboard')} className="text-gray-500 mb-4 flex items-center">← Back</button>
                    <div className="bg-red-50 p-6 rounded-xl border border-red-300 mb-8">
                        <h2 className="text-2xl font-extrabold text-red-800">{selectedProject.projectName}</h2>
                        <p className="text-gray-600 italic mt-2">{selectedProject.description}</p>
                        <div className="flex gap-4 mt-4 border-t pt-4">
                            <LinkButton href={selectedProject.githubLink}>GitHub</LinkButton>
                            <LinkButton href={selectedProject.demoVideoLink}>Demo Video</LinkButton>
                        </div>
                    </div>
                    <form onSubmit={handleScoreSubmit}>
                        {CRITERIA.map(c => (
                            <div key={c.id} className="flex justify-between items-center py-3 border-b">
                                <label className="font-medium text-gray-700">{c.name} ({c.max})</label>
                                <input type="number" value={scores[c.id]} onChange={(e) => handleScoreChange(c.id, e.target.value)} className="w-20 border-2 rounded p-1 text-center" required />
                            </div>
                        ))}
                        <div className="my-6 bg-red-100 p-4 rounded text-center font-bold text-red-800">TOTAL: {currentTotal} / {MAX_TOTAL_SCORE}</div>
                        <textarea className="w-full border-2 rounded p-3 mb-4" placeholder="Comments..." required value={comments} onChange={(e) => setComments(e.target.value)} />
                        <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700">Submit Final Score</button>
                    </form>
                </div>
            );
        }

        return (
            <div className="bg-white p-6 rounded-xl shadow-lg border-4 border-red-700">
                <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2">Assigned Projects</h2>
                <div className="space-y-4">
                    {applications.map(app => (
                        <div key={app.id} className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
                            <div>
                                <p className="font-bold text-red-800">{app.projectName}</p>
                                <p className="text-sm text-gray-500">Leader: {app.studentName}</p>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${app.status === 'Pending' ? 'bg-yellow-200' : 'bg-green-200'}`}>{app.status}</span>
                            </div>
                            <button
                                onClick={() => { setScoringAppId(app.id); setEvaluatorPage('scoring'); }}
                                disabled={app.status === 'Completed'}
                                className={`px-4 py-2 rounded font-bold ${app.status === 'Pending' ? 'bg-red-600 text-white' : 'bg-gray-300'}`}
                            >
                                {app.status === 'Pending' ? 'Start Scoring' : `Scored: ${app.score}`}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // 2. NEW CREATIVE TEAM LEADER VIEW
    const renderTeamLeaderContent = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-xl">
                    <p className="text-blue-100">Project Status</p>
                    <h3 className="text-2xl font-black mt-1">IN REVIEW</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md border-b-8 border-indigo-500">
                    <p className="text-gray-400">Team Members</p>
                    <h3 className="text-2xl font-black text-gray-800">04</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md border-b-8 border-green-500">
                    <p className="text-gray-400">Final Score</p>
                    <h3 className="text-2xl font-black text-gray-800">Waiting...</h3>
                </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <span className="w-2 h-8 bg-indigo-600 rounded-full"></span> Submission Pipeline
                </h3>
                <div className="relative border-l-4 border-indigo-50 ml-6 space-y-12">
                    {['Team Formed', 'Abstract Submitted', 'Code Link Provided', 'Final Presentation'].map((step, idx) => (
                        <div key={idx} className="relative pl-10">
                            <div className={`absolute -left-[14px] top-1 h-6 w-6 rounded-full border-4 border-white shadow ${idx < 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                            <h4 className="font-bold text-gray-800 text-lg">{step}</h4>
                            <p className="text-gray-500">{idx < 3 ? 'Verification Complete' : 'Awaiting Schedule'}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // 3. NEW CREATIVE SECTION HEAD VIEW
    const renderSectionHeadContent = () => (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 bg-white p-6 rounded-xl shadow border-l-8 border-red-700">
                    <h4 className="text-xs uppercase font-bold text-gray-400">Total Evaluations</h4>
                    <p className="text-3xl font-black text-gray-800">84%</p>
                    <div className="w-full bg-gray-100 h-2 mt-2 rounded-full"><div className="bg-red-700 h-full w-[84%] rounded-full"></div></div>
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl shadow border-l-8 border-orange-500">
                    <h4 className="text-xs uppercase font-bold text-gray-400">Average Score</h4>
                    <p className="text-3xl font-black text-gray-800">38.5</p>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gray-900 p-4 text-white font-bold text-lg">Live Ranking Leaderboard</div>
                <table className="w-full">
                    <thead className="bg-gray-50 border-b text-gray-600 text-sm">
                        <tr>
                            <th className="p-4 text-left">Rank</th>
                            <th className="p-4 text-left">Project</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-right">Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {applications.map((app, i) => (
                            <tr key={app.id} className="hover:bg-red-50 transition">
                                <td className="p-4 font-bold text-gray-400">#0{i + 1}</td>
                                <td className="p-4 font-bold text-gray-800">{app.projectName}</td>
                                <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">{app.status}</span></td>
                                <td className="p-4 text-right font-black text-red-700 text-xl">{app.score || '--'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8f9fc] pb-20">
            {/* Nav Header */}
            <div className="bg-white shadow-sm border-b mb-10 p-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-black text-gray-800">JSPM <span className="text-red-700">PORTAL</span></h1>
                    <div className="flex items-center gap-6">
                        <span className="font-bold text-sm text-gray-500 uppercase tracking-widest">{userRole} MODE</span>
                        <button onClick={() => navigate('/login')} className="bg-gray-100 hover:bg-red-100 hover:text-red-700 text-gray-600 px-4 py-2 rounded-lg font-bold transition">Logout</button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4">
                {userRole === 'Team Leader' && renderTeamLeaderContent()}
                {userRole === 'Evaluator' && renderEvaluatorContent()}
                {userRole === 'Section Head' && renderSectionHeadContent()}
            </div>
        </div>
    );
};

export default CombinedDashboard;