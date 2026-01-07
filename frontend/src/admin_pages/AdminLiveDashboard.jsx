"use client";

import {
    Activity,
    BarChart2,
    CheckCircle,
    Clock,
    FileText,
    UserCheck,
    Users,
    XCircle
} from "lucide-react";
import Card from "../components/Card";
import { useAdmin } from "../context/AdminContext";

export default function Dashboard() {
    const { getStats, registrations } = useAdmin();
    const stats = getStats();

    // Calculate specific metrics for the new widget
    const totalTeams = stats.totalRegistrations;
    const teamsWithScores = registrations.filter(t => t.score !== undefined && t.score !== null).length;
    const teamsPendingScore = totalTeams - teamsWithScores;

    // Simple calculation for score distribution (Example: Teams scoring 70+)
    const teamsHighScore = registrations.filter(t => t.score >= 70).length;

    return (
        // Updated container: Lighter background, better padding, and slight rounded corner for a cleaner look
        <div className="p-8 md:p-10 bg-gray-50 min-h-screen">

            {/* HEADER SECTION */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                Admin Dashboard
            </h1>
            <p className="text-lg text-indigo-700 font-medium mb-8 border-b-2 border-indigo-100 pb-3">
                System Overview and Quick Actions
            </p>

            {/* 1. KEY METRICS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">

                {/* Teams/Registrations (Blue) */}
                <Card
                    title="Total Teams"
                    value={stats.totalRegistrations}
                    icon={<Users className="w-8 h-8" />}
                    color="bg-blue-600 hover:bg-blue-700"
                />

                {/* Applications Status (Purple) */}
                <Card
                    title="Total Applications"
                    value={stats.applications}
                    icon={<FileText className="w-8 h-8" />}
                    color="bg-purple-600 hover:bg-purple-700"
                />
                <Card
                    title="Pending Review"
                    value={stats.pending}
                    icon={<Clock className="w-8 h-8" />}
                    color="bg-orange-500 hover:bg-orange-600"
                />

                {/* Selection Status (Green/Red) */}
                <Card
                    title="Selected Teams"
                    value={stats.selected}
                    icon={<CheckCircle className="w-8 h-8" />}
                    color="bg-green-600 hover:bg-green-700"
                />
                <Card
                    title="Rejected Teams"
                    value={stats.nonSelected}
                    icon={<XCircle className="w-8 h-8" />}
                    color="bg-red-600 hover:bg-red-700"
                />

                {/* Evaluators (Indigo) */}
                <Card
                    title="Active Evaluators"
                    value={stats.evaluators}
                    icon={<UserCheck className="w-8 h-8" />}
                    color="bg-indigo-600 hover:bg-indigo-700"
                />
            </div>

            {/* 2. PROJECT STATUS & ACTIVITY FEED */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Project Status Overview (2/3 width) */}
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                        <BarChart2 className="w-6 h-6 text-green-600" />
                        <span>Project Status Overview</span>
                    </h2>

                    <div className="grid grid-cols-3 gap-6 text-center border-b pb-4 mb-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-3xl font-bold text-blue-700">{totalTeams}</p>
                            <p className="text-sm text-blue-600 mt-1">Total Projects</p>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <p className="text-3xl font-bold text-yellow-700">{teamsPendingScore}</p>
                            <p className="text-sm text-yellow-600 mt-1">Pending Evaluation</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-3xl font-bold text-green-700">{teamsHighScore}</p>
                            <p className="text-sm text-green-600 mt-1">Teams with High Score (70+)</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* The conditional ATTENTION section has been removed */}


                    </div>
                </div>

                {/* Recent Activity/Log (1/3 width) - Unchanged */}
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                        <Activity className="w-6 h-6 text-orange-600" />
                        <span>Recent Activity</span>
                    </h2>
                    <ul className="space-y-3 text-md text-gray-700">
                        <li className="border-b border-gray-100 pb-2">
                            <span className="font-semibold text-green-600">✅</span> Team Alpha selected
                            <span className="float-right text-gray-400 text-xs">1 min ago</span>
                        </li>
                        <li className="border-b border-gray-100 pb-2">
                            <span className="font-semibold text-indigo-600">👤</span> New Evaluator signed up
                            <span className="float-right text-gray-400 text-xs">5 min ago</span>
                        </li>
                        <li className="border-b border-gray-100 pb-2">
                            <span className="font-semibold text-blue-600">🔔</span> Notice posted: Briefing
                            <span className="float-right text-gray-400 text-xs">30 min ago</span>
                        </li>
                        <li className="pb-2">
                            <span className="font-semibold text-red-600">🗑️</span> Team Delta registration deleted
                            <span className="float-right text-gray-400 text-xs">2 hours ago</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
