import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardCheck,
  LogOut,
  Menu,
  X,
  UserCircle
} from "lucide-react";

const EvaluatorSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const evaluator = JSON.parse(localStorage.getItem("evaluatorUser"));

  const handleLogout = () => {
    localStorage.removeItem("evaluatorUser");
    navigate("/");
  };

  return (
    <>
      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden px-4 py-3 bg-[#0f172a] text-white shadow">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-yellow-400">Evaluator Panel</h2>
          <button onClick={() => setOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 bg-[#0f172a] text-white transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 z-50`}
      >
        {/* Close (Mobile) */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Profile */}
        <div className="px-6 py-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <UserCircle size={36} className="text-yellow-400" />
            <div>
              <p className="font-semibold text-sm">{evaluator?.name}</p>
              <p className="text-xs text-slate-400">Evaluator</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">
          <NavLink
            to="/evaluator/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-yellow-400 text-black"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/evaluator/assigned-teams"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-yellow-400 text-black"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <ClipboardCheck size={18} />
            Assigned Teams
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 w-full px-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default EvaluatorSidebar;
