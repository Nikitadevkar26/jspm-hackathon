"use client";

import { useState } from "react";

export default function ScoreModal({ isOpen, onClose, onSubmit, team }) {
  const [score, setScore] = useState("");
  const [status, setStatus] = useState("Pending");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...team, score, status });
    setScore("");
    setStatus("Pending");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-bold text-gray-800">Score Team</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <p className="text-sm text-gray-600">
              Scoring for: <span className="font-medium">{team?.team}</span>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Score
            </label>
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter score (0 - 100)"
              required
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="Pending">Pending</option>
              <option value="Selected">Selected</option>
              <option value="Non-Selected">Non-Selected</option>
            </select>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
