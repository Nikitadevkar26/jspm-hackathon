// src/EvaluatorApp.jsx
// Flow: Login -> Dashboard (Project List) -> Scoring Form -> Dashboard
// The Welcome page has been completely removed.

import React, { useState, useMemo, useCallback } from 'react';

// --- MOCK DATA & CONSTANTS ---
const MOCK_EVALUATOR_PASSWORD = 'evaluator123';
const MOCK_EVALUATOR_ID = 'EVAL001';
const JSPM_LOGO_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPfRGkuQoqWR3mDkAT6l6gjRPN-zRI41VIxw&s"; 

const INITIAL_APPLICATIONS = [
    { id: 101, projectName: 'AI Recipe Generator', studentName: 'Alice Johnson', status: 'Pending', description: 'A mobile app that generates custom recipes based on user-input ingredients and dietary restrictions.', githubLink: 'https://github.com/ai-recipe', demoVideoLink: 'https://youtube.com/demo-101', submissionFiles: ['Model.py', 'AppScreenshots.zip'] },
    { id: 102, projectName: 'Blockchain Voting System', studentName: 'Bob Smith', status: 'Pending', description: 'A secure, decentralized voting application leveraging smart contracts on the Ethereum blockchain to ensure transparency and immutability of results. Requires extensive testing for gas efficiency.', githubLink: 'https://github.com/blockchain-vote', demoVideoLink: 'https://youtube.com/demo-video-102', submissionFiles: ['Whitepaper.pdf', 'SmartContractCode.sol', 'Presentation.pptx'] },
    { id: 103, projectName: 'Eco-Friendly E-Commerce', studentName: 'Charlie Brown', status: 'Completed', score: 42, comment: "Excellent feasibility, solid implementation.", description: 'An e-commerce platform that exclusively sells sustainable products and calculates the carbon footprint of each purchase.', githubLink: 'https://github.com/eco-commerce', demoVideoLink: 'https://youtube.com/demo-103', submissionFiles: ['BusinessPlan.pdf'] },
];

const CRITERIA = [
    { id: 'novelty', name: 'Novelty of Idea', max: 10 },
    { id: 'complexity', name: 'Complexity & Clarity', max: 10 },
    { id: 'feasibility', name: 'Feasibility & Practicability', max: 10 },
    { id: 'impact', name: 'Scale of Impact & User Experience', max: 10 },
    { id: 'futureScope', name: 'Potential for Future Scope', max: 10 },
];

const MAX_TOTAL_SCORE = CRITERIA.reduce((sum, c) => sum + c.max, 0);

const APP_SHELL_CLASSES = "w-full max-w-sm md:max-w-3xl lg:max-w-5xl bg-white rounded-xl shadow-2xl p-6 md:p-10 border-4 border-red-700 transition-all duration-300";


// --- COMPONENTS ---

// CustomAlert Component
const CustomAlert = ({ message, onClose }) => {
    if (!message) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm text-center border-4 border-red-700">
                <p className="text-xl font-semibold text-gray-800 mb-4">{message}</p>
                <button
                    onClick={onClose}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

// Header Component (Used for Dashboard and Scoring views)
const Header = ({ evaluatorId, onLogout }) => (
    <header className="text-center pb-6 mb-8 border-b-4 border-red-700">
        <img
            src={JSPM_LOGO_URL}
            alt="JSPM College Logo"
            className="h-20 w-20 mx-auto mb-2 rounded-full border-4 border-red-700 object-cover" 
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/eee/333?text=Logo'; }}
        />
        <h1 className="text-3xl font-extrabold text-red-800 uppercase tracking-wider">
            JSPM's JSCOE Hackathon Portal
        </h1>
        <div className="flex justify-center items-center mt-2">
            <p className="text-sm text-gray-500 mr-4">Evaluation Dashboard for Evaluator #{evaluatorId}</p>
            <button
                onClick={onLogout}
                className="bg-red-800 hover:bg-red-900 text-white text-sm font-semibold py-1 px-3 rounded-lg shadow-md transition"
            >
                Logout
            </button>
        </div>
    </header>
);

// LoginView Component
const LoginView = ({ onLogin }) => { // onBackToWelcome prop removed
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [username, setUsername] = useState(MOCK_EVALUATOR_ID);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (password === MOCK_EVALUATOR_PASSWORD) {
            onLogin(username);
        } else {
            setError('Invalid password. Hint: evaluator123');
        }
    };

    return (
        <div className="max-w-sm w-full bg-white rounded-xl shadow-2xl p-8 text-center border-4 border-red-700">
            {/* The "Back to Welcome" button is removed here as Login is the starting view */}
            
            <h2 className="text-3xl font-bold text-red-800 mb-2">Evaluator Login</h2>
            <p className="text-gray-500 mb-8">Access your assigned project evaluations.</p>

            <form onSubmit={handleSubmit}>
                <div className="mb-4 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Evaluator ID
                    </label>
                    <input
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-100"
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        readOnly
                    />
                </div>
                <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                        id="password"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="text-red-600 text-sm italic">{error}</p>}
                </div>
                <button
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-150 ease-in-out shadow-lg"
                    type="submit"
                >
                    Log In
                </button>
            </form>
            <p className="text-xs text-gray-400 mt-4">Hint: Password is 'evaluator123'</p>
        </div>
    );
};


// DashboardView Component
const DashboardView = ({ applications, onSelectProject }) => {
    const pendingCount = applications.filter(app => app.status === 'Pending').length;
    
    if (pendingCount === 0) {
        return (
            <div className="text-center py-10">
                <svg className="w-20 h-20 text-blue-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">All Assignments Completed!</h2>
                <p className="text-gray-600 mb-6">
                    You have finished scoring all the projects assigned to you. Thank you for your service.
                </p>
            </div>
        );
    }

    return (
        <div className="dashboard-content">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-2">
                Your Assigned Projects ({pendingCount} Pending)
            </h2>
            <div className="space-y-4">
                {applications.map(app => (
                    <div key={app.id} className="p-4 border rounded-lg shadow-sm bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center transition hover:shadow-md">
                        <div>
                            <p className="text-lg font-semibold text-red-800">{app.projectName}</p>
                            <p className="text-sm text-gray-500">Leader: {app.studentName}</p>
                            <p className={`mt-1 text-xs font-bold px-2 py-1 rounded-full inline-block ${app.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                                Status: {app.status}
                            </p>
                        </div>
                        <button
                            onClick={() => onSelectProject(app.id)}
                            disabled={app.status === 'Completed'}
                            className={`mt-4 md:mt-0 py-2 px-4 rounded-lg font-semibold transition ${
                                app.status === 'Pending' 
                                    ? 'bg-red-600 text-white hover:bg-red-700' 
                                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            }`}
                        >
                            {app.status === 'Pending' ? 'Start Scoring' : `Scored: ${app.score}/${MAX_TOTAL_SCORE}`}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};


// ScoringFormView Component
const LinkButton = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition">
        {children}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4-2h5m0 0l-5-5m5 5l-5 5"></path></svg>
    </a>
);

// Note: onBack returns to the Dashboard
const ScoringFormView = ({ applicationDetail, onBack, onSubmit }) => {
    const [scores, setScores] = useState(CRITERIA.reduce((acc, c) => ({ ...acc, [c.id]: 0 }), {}));
    const [comments, setComments] = useState('');

    const currentTotal = useMemo(() => {
        return Object.values(scores).reduce((sum, score) => sum + (Number(score) || 0), 0);
    }, [scores]);

    const handleScoreChange = useCallback((criterionId, value) => {
        const max = CRITERIA.find(c => c.id === criterionId).max;
        let score = parseInt(value, 10);

        if (isNaN(score) || score < 0) score = 0;
        if (score > max) score = max;

        setScores(prev => ({ ...prev, [criterionId]: score }));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(applicationDetail.id, currentTotal, comments);
    };

    return (
        <div className="scoring-form-content">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700 font-semibold mb-6 flex items-center space-x-1 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                <span>Back to Dashboard</span>
            </button>

            {/* Submission Detail Section */}
            <div className="bg-red-50 p-6 rounded-xl border border-red-300 mb-8">
                <h2 className="text-2xl font-extrabold text-red-800 mb-2">{applicationDetail.projectName}</h2>
                <p className="text-md text-gray-700 mb-4 font-medium">Team Leader: {applicationDetail.studentName}</p>
                
                <p className="text-gray-600 mb-4 border-l-4 border-red-500 pl-3 italic">{applicationDetail.description}</p>
                
                <div className="flex flex-wrap gap-4 mt-4 justify-start items-center border-t pt-4">
                    <LinkButton href={applicationDetail.githubLink}>
                        GitHub Repository
                    </LinkButton>
                    <LinkButton href={applicationDetail.demoVideoLink}>
                        Demo Video
                    </LinkButton>
                    <div className="text-sm text-gray-500 flex items-center space-x-1">
                         <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v10a1 1 0 01-1 1h-3.414l-1.884 1.884c-.39.39-.993.522-1.468.423a2.004 2.004 0 01-.632-.423L8.414 16H4a1 1 0 01-1-1V4zm14 1h-2v1h2V5z" clipRule="evenodd"></path></svg>
                        <span>Files: {applicationDetail.submissionFiles.length} uploaded</span>
                    </div>
                </div>
            </div>

            {/* Scoring Section */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Evaluation Criteria (Total: {MAX_TOTAL_SCORE} Points)</h3>

                <div className="space-y-2 mb-8">
                    {CRITERIA.map(c => (
                        <div key={c.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-gray-100">
                            <label htmlFor={c.id} className="flex-grow text-gray-700 font-medium mb-1 sm:mb-0">
                                {c.name}
                                <span className="text-sm text-gray-400 ml-2">({c.max} points)</span>
                            </label>
                            <input
                                type="number"
                                id={c.id}
                                value={scores[c.id]}
                                onChange={(e) => handleScoreChange(c.id, e.target.value)}
                                min="0"
                                max={c.max}
                                className="w-full sm:w-24 text-center border-2 border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500 transition"
                                required
                            />
                        </div>
                    ))}
                </div>

                {/* Total Score Display */}
                <div className="flex justify-between items-center bg-red-100 p-4 rounded-lg font-extrabold text-lg mb-6 border border-red-300">
                    <span className="text-red-800">TOTAL SCORE</span>
                    <span className="text-red-800">{currentTotal} / {MAX_TOTAL_SCORE}</span>
                </div>

                {/* Comments Section */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comments">
                        Evaluator Comments (Mandatory)
                    </label>
                    <textarea
                        id="comments"
                        rows="4"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Provide detailed feedback for the team..."
                        className="w-full border-2 border-gray-300 rounded-lg p-3 focus:ring-red-500 focus:border-red-500 transition resize-none"
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-600 hover:-bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-150 ease-in-out shadow-lg"
                >
                    Submit Final Score & Return to Dashboard
                </button>
            </form>
        </div>
    );
};


// --- MAIN EVALUATOR APPLICATION ---
const EvaluatorApp = () => {
    // Initial state set to 'login' to start directly on the login page
    const [currentPage, setCurrentPage] = useState('login'); 
    const [evaluatorId, setEvaluatorId] = useState(null);
    const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
    const [alertMessage, setAlertMessage] = useState(null);
    const [scoringAppId, setScoringAppId] = useState(null); 

    // This function replaces goToWelcome and is used for logout
    const goToLogin = () => {
        setEvaluatorId(null);
        setScoringAppId(null);
        setCurrentPage('login');
    };

    // Function to move from Login to Dashboard
    const handleLogin = (id) => {
        setEvaluatorId(id);
        setCurrentPage('dashboard');
    };
    
    // Function to move from Dashboard to Scoring Form
    const handleSelectProject = (id) => {
        setScoringAppId(id);
        setCurrentPage('scoring');
    };
    
    // Function to handle score submission and return to Dashboard
    const handleScoreSubmit = (appId, totalScore, comments) => {
        const updatedApplications = applications.map(app =>
            app.id === appId
                ? { ...app, status: 'Completed', score: totalScore, comment: comments }
                : app
        );
        setApplications(updatedApplications);
        setAlertMessage(`Score submitted successfully! Total: ${totalScore}/${MAX_TOTAL_SCORE}`);
        setScoringAppId(null); // Clear ID
        setCurrentPage('dashboard'); // Go back to the list
    };
    
    const applicationDetail = useMemo(() => {
        return applications.find(app => app.id === scoringAppId);
    }, [scoringAppId, applications]);


    const renderCurrentPage = () => {
        switch (currentPage) {
            case 'login':
                // Note: The onBackToWelcome prop is removed from LoginView usage
                return <LoginView onLogin={handleLogin} />;
            case 'dashboard':
                return (
                    <div className={APP_SHELL_CLASSES}>
                        <Header evaluatorId={evaluatorId} onLogout={goToLogin} />
                        <DashboardView 
                            applications={applications} 
                            onSelectProject={handleSelectProject} 
                        />
                    </div>
                );
            case 'scoring':
                if (!applicationDetail) {
                    setAlertMessage("Error: Project not found. Returning to Dashboard.");
                    setCurrentPage('dashboard');
                    return null;
                }
                return (
                    <div className={APP_SHELL_CLASSES}>
                        <Header evaluatorId={evaluatorId} onLogout={goToLogin} />
                        <ScoringFormView
                            applicationDetail={applicationDetail} 
                            onBack={() => setCurrentPage('dashboard')}
                            onSubmit={handleScoreSubmit}
                        />
                    </div>
                );
            default:
                // Default case now points to Login
                return <LoginView onLogin={handleLogin} />;
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-red-50 p-4 min-h-screen overflow-y-auto">
            {renderCurrentPage()}
            <CustomAlert message={alertMessage} onClose={() => setAlertMessage(null)} />
        </div>
    );
};

export default EvaluatorApp;