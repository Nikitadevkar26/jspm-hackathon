"use client";

import { useEffect, useState } from "react";

export default function EvaluatorEmailModal({
  isOpen,
  onClose,
  onSend,
  evaluator
}) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  /* ============================
     PRE-FILL EMAIL CONTENT
  ============================ */
  useEffect(() => {
    if (!isOpen || !evaluator) return;

    if (evaluator.status === "Approved") {
      setSubject("Evaluator Application Approved");
      setMessage(
        `Hello ${evaluator.name},

We are pleased to inform you that your application for the role of Evaluator has been APPROVED.

📌 Evaluator Name: ${evaluator.name}
📌 Registered Email: ${evaluator.email}

You are now officially recognized as an evaluator for the upcoming evaluation process.
Further instructions and assignments will be communicated separately.

If you have any questions, feel free to reach out to us using this email address.

Best regards,  
Evaluation Committee`
      );
    }

    if (evaluator.status === "Rejected") {
      setSubject("Evaluator Application Status Update");
      setMessage(
        `Hello ${evaluator.name},

Thank you for your interest in serving as an Evaluator.

After careful review, we regret to inform you that your application has not been approved at this time.

📌 Evaluator Name: ${evaluator.name}
📌 Registered Email: ${evaluator.email}

We truly appreciate the time and effort you put into your application and encourage you to apply again in the future.

Best regards,  
Evaluation Committee`
      );
    }
  }, [isOpen, evaluator]);

  if (!isOpen || !evaluator) return null;

  /* ============================
     SEND EMAIL
  ============================ */
  const handleSubmit = (e) => {
    e.preventDefault();

    onSend({
      to: evaluator.email,
      subject,
      message
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-bold text-gray-800">
            Send Evaluator Status Email
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">

          {/* TO */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              To
            </label>
            <input
              type="email"
              value={evaluator.email}
              readOnly
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          {/* SUBJECT */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border rounded-lg h-44 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-2">
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
