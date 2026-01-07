import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Lightbulb,
  UserCircle,
  LockOpenIcon
} from "lucide-react";

const Sidebar = () => {
  const teamUser = JSON.parse(localStorage.getItem("teamUser"));
  const mustReset = teamUser?.must_reset_password === 1;

  const [open, setOpen] = useState(false);

  const baseLink =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium";

  const activeLink = "bg-yellow-400 text-black";
  const inactiveLink = "text-gray-300";

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="md:hidden px-4 py-3 bg-[#0f172a] text-white shadow">
        <div className="flex justify-center mb-2">
          <img
            src="/logo/clg_logo.webp"
            alt="Organization Logo"
            className="h-12"
          />
        </div>

        <div className="flex items-center justify-between">
          <h2 className="font-bold text-yellow-400">Team Leader</h2>
          <button onClick={() => setOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64
        bg-gradient-to-b from-[#0f172a] to-[#020617]
        text-white z-50 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* HEADER */}
        <div className="px-6 py-6 border-b border-white/10">
          <img
            src="/logo/clg_logo.webp"
            alt="Organization Logo"
            className="h-14 mx-auto mb-4"
          />

          <h2 className="text-xl font-bold text-yellow-400 text-center">
            Team Leader
          </h2>
          <p className="text-sm text-gray-400 text-center truncate">
            {teamUser?.email}
          </p>

          {mustReset && (
            <p className="mt-2 text-xs text-red-400 text-center">
              ⚠ Please reset your password
            </p>
          )}

          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 md:hidden text-gray-400"
          >
            <X />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="px-4 py-6 space-y-1">

          {/* TEAM PROFILE */}
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <UserCircle size={18} />
            Team Profile
          </NavLink>

          {/* RESET PASSWORD (ALWAYS AVAILABLE) */}
          <NavLink
            to="/dashboard/reset-password"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <LockOpenIcon size={18} />
            Reset Password
          </NavLink>

          {/* IDEA SUBMISSION (LOCKED UNTIL RESET) */}
          {!mustReset && (
            <NavLink
              to="/dashboard/idea-submission"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              <Lightbulb size={18} />
              Idea Submission
            </NavLink>
          )}
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              localStorage.removeItem("teamUser");
              window.location.href = "/";
            }}
            className="w-full flex items-center justify-center gap-2
            bg-yellow-400 text-black font-semibold py-2 rounded-lg"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
