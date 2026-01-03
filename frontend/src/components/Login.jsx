import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginType, setLoginType] = useState("team"); // team | evaluator

  const navigate = useNavigate();

  /* ---------------- VALIDATION ---------------- */
  const validateForm = () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    setError("");
    return true;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // 🔁 Switch API based on login type
    const API_URL =
      loginType === "team"
        ? "http://localhost:5001/api/team-login/login"
        : "http://localhost:5001/api/evaluators/login";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // 🔐 Store separately to avoid clashes
      if (loginType === "team") {
        localStorage.setItem("teamUser", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        localStorage.setItem("evaluatorUser", JSON.stringify(data.user));
        navigate("/evaluator/evaluator-dashboard");
      }

    } catch (err) {
      setError("Unable to connect to server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border-t-8 border-[#ef4444]">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Lock className="text-[#ef4444]" size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-800">
            Login Page
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Internal Innovation Portal
          </p>
        </div>

        {/* 🔀 LOGIN TYPE SWITCH */}
        <div className="flex gap-3 mb-6">
          <button
            type="button"
            onClick={() => setLoginType("team")}
            className={`w-1/2 py-2.5 rounded-lg font-bold border transition ${
              loginType === "team"
                ? "bg-[#ef4444] text-white border-[#ef4444]"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Team Leader Login
          </button>

          <button
            type="button"
            onClick={() => setLoginType("evaluator")}
            className={`w-1/2 py-2.5 rounded-lg font-bold border transition ${
              loginType === "evaluator"
                ? "bg-[#ef4444] text-white border-[#ef4444]"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Evaluator Login
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-6 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ef4444] outline-none"
                placeholder="name@institute.edu"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ef4444] outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold py-3 rounded-lg shadow-lg"
          >
            Enter Dashboard
          </button>
        </form>

        {/* Footer */}
        {loginType === "team" && (
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-sm">
              New team participating?{" "}
              <Link
                to="/teamRegistration"
                className="text-[#dc2626] font-bold hover:underline"
              >
                Register Team
              </Link>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Login;
