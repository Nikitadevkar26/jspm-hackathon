"use client";

import {
    FileText,
    LayoutDashboard,
    Megaphone,
    Menu,
    TriangleAlert,
    Users,
    X
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    // Default to false for mobile menu collapsed, true for desktop sidebar open by default.
    const [isOpen, setIsOpen] = useState(true);

    const handleLogout = () => {
        // Remove auth data (adjust keys if needed)
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        sessionStorage.clear();

        // Redirect to login
        navigate("/login", { replace: true });
    };

    const navLinks = [
        { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: "Teams Registration", path: "/admin/view-team-registrations", icon: <FileText className="w-5 h-5" /> },
        { name: "Teams", path: "/admin/approved-teams", icon: <Users className="w-5 h-5" /> },
        { name: "Evaluator Registration", path: "/admin/view-all-evaluator", icon: <Users className="w-5 h-5" /> },
        { name: "Evaluator Assignment", path: "/admin/section-head", icon: <Users className="w-5 h-5" /> },
        { name: "SH Registration", path: "/admin/section-head-register", icon: <Users className="w-5 h-5" /> },
        { name: "Grievance", path: "/admin/grievance", icon: <TriangleAlert className="w-5 h-5" /> },
        { name: "Notices", path: "/admin/notices", icon: <Megaphone className="w-5 h-5" /> },
    ];

    return (
        <>
            {/* 1. Mobile Toggle/Spacer */}
            <div className="md:hidden bg-gray-900 text-white flex items-center justify-between px-4 h-24 fixed top-0 left-0 w-full shadow-md z-50">
                <span className="font-bold text-lg">Admin Dashboard</span>
                <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* 2. Sidebar Container */}
            <aside
                className={`${isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 transform fixed 
                top-24
                left-0 w-64 bg-gray-900 text-white shadow-lg transition-transform duration-200 z-40 h-[calc(100%-6rem)]`}
            >
                <nav className="mt-4">
                    <ul className="space-y-2 px-3">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition ${location.pathname === link.path
                                        ? "bg-yellow-500 text-black"
                                        : "hover:bg-gray-700"
                                        }`}
                                >
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-6 left-0 w-full px-3">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* 3. Content Spacer */}
            <div className="md:ml-64"></div>
        </>
    );
}
