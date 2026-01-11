import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SetPassword = () => {
  const navigate = useNavigate();
  const teamUser = JSON.parse(localStorage.getItem("teamUser"));

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================
     PASSWORD VALIDATION
  ========================= */
  const validatePassword = (pwd) => {
    const regex = /^[A-Z][A-Za-z0-9@#$%^&*!]{4,}[0-9@#$%^&*!]$/;
    return regex.test(pwd);
  };

  /* =========================
     SUBMIT PASSWORD
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      return setError("All fields are required");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (!validatePassword(password)) {
      return setError(
        "Password must start with a capital letter, include a number and a special character (e.g. Dog@123)"
      );
    }

    setLoading(true);

    try {
      const { data } = await axios.put(
        "http://127.0.0.1:8088/api/team-login/set-password",
        {
          team_id: teamUser.team_id,
          password,
        }
      );

      // ✅ UPDATE LOCAL STORAGE FLAG
      const updatedUser = {
        ...teamUser,
        must_reset_password: 0,
      };
      localStorage.setItem("teamUser", JSON.stringify(updatedUser));

      setSuccess("Password updated successfully! Please login again.");
      setPassword("");
      setConfirmPassword("");

      // ✅ REDIRECT AFTER RESET
      setTimeout(() => {
        navigate("/dashboard/profile");
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Set New Password
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Dog@123"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default SetPassword;
