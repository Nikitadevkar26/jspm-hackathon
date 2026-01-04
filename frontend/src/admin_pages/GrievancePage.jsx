"use client";

import {
    Calendar,
    CheckCircle,
    Clock,
    Edit,
    Frown,
    List,
    MessageSquare, Save,
    Search,
    Target,
    User,
    X,
    Zap
} from 'lucide-react';
import { useMemo, useState } from 'react';

// --- Simulated Data: Team Grievances ---
const initialGrievances = [
    {
        id: 501,
        team: 'Team Alpha',
        subject: 'Scoring Discrepancy in Innovation Category',
        submittedOn: '2025-12-01',
        status: 'New',
        details: 'We believe our score of 15/25 in Innovation is unfair. We used Novel AI architecture not seen in other submissions. Request a re-evaluation by a new expert.',
        resolution: null,
    },
    {
        id: 502,
        team: 'Team Delta',
        subject: 'Evaluator Conflict of Interest',
        submittedOn: '2025-11-28',
        status: 'In Review',
        details: 'Our evaluator, Mark Olsen, previously worked for a competitor of our team leader\'s company. This is a clear conflict of interest and we request a replacement.',
        resolution: null,
    },
    {
        id: 503,
        team: 'Team Zeta',
        subject: 'Technical Submission Upload Failure',
        submittedOn: '2025-11-25',
        status: 'Resolved',
        details: 'We were unable to upload our final technical documentation before the deadline due to server issues (screenshot attached). We request a 12-hour extension.',
        resolution: 'Technical issue verified. Submission window extended by 12 hours for Team Zeta only.',
    },
    {
        id: 504,
        team: 'Team Beta',
        subject: 'Incorrect Data Set Used in Evaluation',
        submittedOn: '2025-12-02',
        status: 'New',
        details: 'The results clearly show metrics based on the previous year\'s data. This is invalid for our submission, which was calibrated for the 2025 set.',
        resolution: null,
    },
    {
        id: 505,
        team: 'Team Gamma',
        subject: 'Late Submission Penalty Appeal',
        submittedOn: '2025-11-15',
        status: 'Resolved',
        details: 'We were one minute late due to a local network outage. The 5-point penalty is too harsh for this minor delay.',
        resolution: 'Penalty reduced to 1 point as mitigating circumstances were verified with network logs.',
    },
];

// --- Status Badge Component (Reusable) ---
const StatusBadge = ({ status }) => {
    const statusClasses = {
        'Resolved': 'bg-green-100 text-green-700 border-green-500',
        'In Review': 'bg-yellow-100 text-yellow-700 border-yellow-500',
        'New': 'bg-red-100 text-red-700 border-red-500',
    };
    const Icon = {
        'Resolved': CheckCircle,
        'In Review': Clock,
        'New': Zap,
    }[status] || List;

    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full border flex items-center space-x-1 ${statusClasses[status] || 'bg-gray-100 text-gray-700 border-gray-500'}`}>
            <Icon className="w-3 h-3" />
            <span>{status}</span>
        </span>
    );
};

// --- Detail Modal Component ---
const GrievanceDetailModal = ({ grievance, onClose, onUpdate, statusOptions }) => {
    const [resolutionText, setResolutionText] = useState(grievance.resolution || '');
    const [newStatus, setNewStatus] = useState(grievance.status);

    const handleSave = () => {
        onUpdate(grievance.id, newStatus, resolutionText);
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                {/* Modal Header */}
                <div className="sticky top-0 bg-red-600 text-white p-5 rounded-t-xl flex justify-between items-center shadow-lg">
                    <h3 className="text-xl font-bold flex items-center space-x-2">
                        <Target className="w-6 h-6" />
                        <span>Grievance #{grievance.id}: {grievance.subject}</span>
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-red-700 transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6 overflow-y-auto">

                    {/* Grievance Summary */}
                    <div className="grid grid-cols-3 gap-4 border-b pb-4">
                        <div className="p-3 bg-gray-50 rounded-lg shadow-inner">
                            <p className="text-xs font-medium text-gray-500 uppercase flex items-center"><User className="w-4 h-4 mr-1" /> Team</p>
                            <p className="text-lg font-semibold text-gray-800">{grievance.team}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg shadow-inner">
                            <p className="text-xs font-medium text-gray-500 uppercase flex items-center"><Calendar className="w-4 h-4 mr-1" /> Submitted On</p>
                            <p className="text-lg font-semibold text-gray-800">{grievance.submittedOn}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg shadow-inner">
                            <p className="text-xs font-medium text-gray-500 uppercase flex items-center"><List className="w-4 h-4 mr-1" /> Current Status</p>
                            <div className="mt-1">
                                <StatusBadge status={newStatus} />
                            </div>
                        </div>
                    </div>

                    {/* Detailed Complaint */}
                    <div>
                        <h4 className="font-semibold text-lg text-red-600 mb-2 border-b-2 border-red-100 pb-1 flex items-center space-x-2">
                            <MessageSquare className="w-5 h-5" />
                            <span>Detailed Complaint</span>
                        </h4>
                        <blockquote className="border-l-4 border-red-400 pl-4 py-2 text-gray-700 bg-red-50 italic rounded-r-lg">
                            {grievance.details}
                        </blockquote>
                    </div>

                    {/* Resolution and Status Controls */}
                    <div className="pt-4 border-t border-gray-200 space-y-4">
                        <h4 className="font-semibold text-lg text-indigo-600 mb-2 flex items-center space-x-2">
                            <Edit className="w-5 h-5" />
                            <span>Admin Resolution Panel</span>
                        </h4>

                        {/* Status Update */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                            <select
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-3 text-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                            >
                                {statusOptions.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>

                        {/* Resolution Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Resolution Notes (Visible to Team after resolution)</label>
                            <textarea
                                value={resolutionText}
                                onChange={(e) => setResolutionText(e.target.value)}
                                rows="5"
                                className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                                placeholder="Enter the final decision, actions taken, and communication sent to the team."
                            />
                        </div>
                    </div>
                </div>

                {/* Modal Footer (Action Buttons) */}
                <div className="sticky bottom-0 p-4 bg-gray-50 rounded-b-xl flex justify-end space-x-3 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400 transition shadow-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!resolutionText && newStatus === 'Resolved'} // Require resolution notes for 'Resolved' status
                        className="px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-md disabled:opacity-50 flex items-center space-x-2"
                    >
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---
export default function GrievancePage() {
    const [grievances, setGrievances] = useState(initialGrievances);
    const [selectedGrievance, setSelectedGrievance] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    // New state for filtering
    const [filterStatus, setFilterStatus] = useState('All');

    // Available statuses for filter and modal
    const statusOptions = ['New', 'In Review', 'Resolved'];
    const filterOptions = ['All', ...statusOptions];

    // --- Filtering Logic ---
    const filteredGrievances = useMemo(() => {
        if (filterStatus === 'All') {
            return grievances;
        }
        return grievances.filter(g => g.status === filterStatus);
    }, [grievances, filterStatus]);


    // --- Modal Handlers ---
    const handleOpenDetails = (grievance) => {
        setSelectedGrievance(grievance);
        setIsDetailModalOpen(true);
    };

    const handleUpdateGrievance = (grievanceId, newStatus, resolutionText) => {
        setGrievances(prevGrievances =>
            prevGrievances.map(g =>
                g.id === grievanceId
                    ? { ...g, status: newStatus, resolution: resolutionText }
                    : g
            )
        );
        setIsDetailModalOpen(false);
        setSelectedGrievance(null);
        console.log(`Grievance ${grievanceId} updated to Status: ${newStatus}`);
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen font-sans">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 flex items-center space-x-3 border-b pb-4">
                <Frown className="w-10 h-10 text-red-600" />
                <span>Contest Grievance & Appeals Panel</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8">
                Review, track, and resolve formal appeals submitted by competing teams to maintain contest fairness.
            </p>

            {/* Grievance Table & Filter Control */}
            <div className="bg-white p-6 rounded-xl shadow-2xl overflow-x-auto">
                <div className='flex justify-between items-center mb-4 pb-4 border-b border-gray-100'>
                    <h2 className="text-xl font-semibold text-gray-800">All Grievances ({filteredGrievances.length} shown)</h2>

                    {/* Status Filter Dropdown */}
                    <div>
                        <label htmlFor="status-filter" className="mr-3 text-sm font-medium text-gray-700">Filter by Status:</label>
                        <select
                            id="status-filter"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        >
                            {filterOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Team</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Submitted On</th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredGrievances.map((grievance) => (
                            <tr key={grievance.id} className="hover:bg-red-50 transition duration-150 ease-in-out">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">{grievance.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{grievance.team}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 max-w-sm truncate">{grievance.subject}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grievance.submittedOn}</td>

                                {/* Status Column */}
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                    <StatusBadge status={grievance.status} />
                                </td>

                                {/* Actions Column */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    <button
                                        onClick={() => handleOpenDetails(grievance)}
                                        className="inline-flex items-center text-sm font-medium text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition duration-150 ease-in-out shadow-md"
                                    >
                                        <Search className="w-4 h-4 mr-2" />
                                        Review Case
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredGrievances.length === 0 && (
                    <div className="text-center p-8 text-gray-500">
                        No grievances found with the status: **{filterStatus}**.
                    </div>
                )}
            </div>

            {/* Grievance Detail/Update Modal */}
            {isDetailModalOpen && selectedGrievance && (
                <GrievanceDetailModal
                    grievance={selectedGrievance}
                    onClose={() => setIsDetailModalOpen(false)}
                    onUpdate={handleUpdateGrievance}
                    statusOptions={statusOptions}
                />
            )}
        </div>
    );
}
