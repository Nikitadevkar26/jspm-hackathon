import {
    Hash,
    LogOut,
    Mail,
    Menu,
    Phone,
    User,
    X
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

export default function Navbar() {
    const { admin, setAdmin } = useAdmin();
    const navigate = useNavigate();
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const navLinks = [
        { name: "Dashboard", path: "/admin/dashboard" },
        { name: "Teams Registration", path: "/admin/view-team-registrations" },
        { name: "Teams", path: "/admin/approved-teams" },
        { name: "Evaluator Registration", path: "/admin/view-all-evaluator" },
        { name: "Evaluator Assignment", path: "/admin/section-head" },
        { name: "Section Head Register", path: "/admin/section-head-register" },
        { name: "Grievance", path: "/admin/grievance" },
        { name: "Notices", path: "/admin/notices" }
    ];

    const handleLogout = () => {
        setAdmin(null);                  // clears context
        localStorage.removeItem("admin"); // clears persisted admin
        navigate("/login");
    };


    return (
        <>
            {/* NAVBAR */}
            <nav className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 shadow-md">
                <div className="w-full px-4 sm:px-6 lg:px-10">

                    <div className="flex items-center justify-between h-20 sm:h-24">

                        {/* LOGO */}
                        <div className="flex-shrink-0">
                            <img
                                src="https://akm-img-a-in.tosshub.com/sites/resources/campus/prod/img/logo/2023/10/ylogo254251400879.jpeg"
                                alt="Organization Logo"
                                className="h-10 sm:h-14 w-auto object-contain"
                                onError={(e) => {
                                    e.target.src =
                                        "https://placehold.co/120x56/333333/ffffff?text=Admin+Logo";
                                }}
                            />
                        </div>

                        {/* DESKTOP LINKS */}
                        <div className="hidden lg:flex items-center space-x-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-sm font-medium transition ${location.pathname === link.path
                                        ? "text-yellow-400"
                                        : "text-white hover:text-yellow-400"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* DESKTOP PROFILE */}
                        <div className="hidden lg:block relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 p-2 rounded-full text-yellow-400 hover:bg-gray-700"
                            >
                                <User className="w-6 h-6" />
                                <span className="hidden xl:inline">
                                    {admin?.name || "Admin"}
                                </span>
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-72 bg-white text-gray-800 rounded-lg shadow-xl z-50">
                                    <div className="p-4 border-b">
                                        <p className="font-bold">{admin?.name}</p>
                                        <p className="text-sm text-gray-500">{admin?.email}</p>
                                    </div>

                                    <div className="p-3 space-y-2 text-sm">
                                        <p className="flex items-center gap-2">
                                            <Hash size={14} /> {admin?.admin_id}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Mail size={14} /> {admin?.email}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Phone size={14} /> Admin Contact
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full p-2 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50"
                                    >
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* MOBILE BUTTON */}
                        <button
                            className="lg:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU */}
            {isOpen && (
                <div className="lg:hidden fixed top-20 left-0 w-full bg-gray-800 text-white z-40 px-4 py-6 space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`block font-medium ${location.pathname === link.path
                                ? "text-yellow-400"
                                : "hover:text-yellow-400"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* MOBILE PROFILE */}
                    <div className="border-t border-gray-600 pt-4 space-y-2">
                        <p className="font-bold">{admin?.name || "Admin"}</p>
                        <p className="text-sm text-gray-400">{admin?.email}</p>

                        <button
                            onClick={handleLogout}
                            className="mt-2 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-2 rounded-lg"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </div>
            )}

            {/* SPACER */}
            <div className="h-20 sm:h-24" />
        </>
    );
}
