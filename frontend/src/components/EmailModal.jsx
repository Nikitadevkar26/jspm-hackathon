"use client";

import { useState, useEffect } from "react";

export default function EmailModal({ isOpen, onClose, onSend, team }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen || !team) return;

    // Set subject and message based on team status
    if (team.status === "Selected") {
      setSubject("Hackathon Selection Confirmation");
      setMessage(
        `Hello ${team.leader},

Congratulations! 🎉  
Your team "${team.team}" has been selected for the next stage of the hackathon.

📌 Project Title: ${team.projectTitle}  
📌 Problem Statement: ${team.problemStatement}

Next Steps:
- Submit detailed project plan by [DATE]
- Attend orientation session on [DATE]
- Final presentation deadline: [DATE]

We look forward to your participation!

Best regards,  
Hackathon Organizing Team`
      );
    } else if (team.status === "Non-Selected") {
      setSubject("Hackathon Registration Status");
      setMessage(
        `Hello ${team.leader},

Thank you for participating in the hackathon.  
After careful review, your team "${team.team}" has not been selected for the next stage.

📌 Project Title: ${team.projectTitle}  
📌 Problem Statement: ${team.problemStatement}

We encourage you to continue working on your project and participate in future events.

Best regards,  
Hackathon Organizing Team`
      );
    }
  }, [team, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend({ to: team.email, subject, message });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-bold text-gray-800">Send Confirmation Email</h2>
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
            <label className="block text-sm font-medium text-gray-700">
              To
            </label>
            <input
              type="email"
              value={team.email || ""}
              readOnly
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg h-40 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
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
              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
            >
              Send Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
