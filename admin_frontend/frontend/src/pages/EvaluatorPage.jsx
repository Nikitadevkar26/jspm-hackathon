"use client";

import { useEffect, useState } from "react";
import { Eye, Check, XCircle, Mail } from "lucide-react";

import EvaluatorDetailModal from "../components/evaluator/EvaluatorDetailModal";
import EvaluatorEmailModal from "../components/evaluator/EvaluatorEmailModal";

export default function EvaluatorPage() {
  const [evaluators, setEvaluators] = useState([]);
  const [selectedEvaluatorId, setSelectedEvaluatorId] = useState(null);
  const [selectedEvaluator, setSelectedEvaluator] = useState(null);

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState("");

  /* ============================
     FETCH EVALUATORS
  ============================ */
  const fetchEvaluators = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/evaluators");
      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      setEvaluators(data);
    } catch (err) {
      setError("Failed to load evaluators");
    }
  };

  useEffect(() => {
    fetchEvaluators();
  }, []);

  /* ============================
     UPDATE STATUS (NO EMAIL)
  ============================ */
  const updateStatus = async (id, status) => {
    try {
      setLoadingId(id);
      setError("");

      const res = await fetch(
        `http://localhost:5001/api/evaluators/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status })
        }
      );

      if (!res.ok) throw new Error("Status update failed");

      await fetchEvaluators();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  /* ============================
     OPEN EMAIL MODAL
  ============================ */
  const openEmailModal = (evaluator) => {
    setSelectedEvaluator(evaluator);
    setShowEmailModal(true);
  };

  /* ============================
     SEND EMAIL (ACTUAL EMAIL)
  ============================ */
  const sendEmail = async (payload) => {
    try {
      await fetch(
        `http://localhost:5001/api/evaluators/${selectedEvaluator.evaluator_id}/send-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      alert("Email sent successfully");
    } catch {
      alert("Failed to send email");
    }
  };

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      <h1 className="text-3xl font-black mb-2">
        Admin Evaluator Approval Panel
      </h1>

      {error && (
        <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <div className="bg-white rounded-3xl shadow border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {evaluators.map((ev) => (
              <tr key={ev.evaluator_id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold">{ev.name}</td>
                <td className="px-6 py-4">{ev.email}</td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      ev.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : ev.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {ev.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">

                    {/* VIEW DETAILS */}
                    <button
                      onClick={() => setSelectedEvaluatorId(ev.evaluator_id)}
                      className="bg-slate-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <Eye size={14} /> View
                    </button>

                    {/* APPROVE / REJECT */}
                    {ev.status === "Pending" && (
                      <>
                        <button
                          disabled={loadingId === ev.evaluator_id}
                          onClick={() =>
                            updateStatus(ev.evaluator_id, "Approved")
                          }
                          className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 disabled:opacity-50"
                        >
                          <Check size={14} /> Approve
                        </button>

                        <button
                          disabled={loadingId === ev.evaluator_id}
                          onClick={() =>
                            updateStatus(ev.evaluator_id, "Rejected")
                          }
                          className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 disabled:opacity-50"
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      </>
                    )}

                    {/* SEND EMAIL */}
                    {ev.status !== "Pending" && (
                      <button
                        onClick={() => openEmailModal(ev)}
                        className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                      >
                        <Mail size={14} /> Send Email
                      </button>
                    )}

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= DETAIL MODAL ================= */}
      <EvaluatorDetailModal
        evaluatorId={selectedEvaluatorId}
        onClose={() => setSelectedEvaluatorId(null)}
        onSendEmail={(evaluator) => openEmailModal(evaluator)}
      />

      {/* ================= EMAIL MODAL ================= */}
      <EvaluatorEmailModal
        isOpen={showEmailModal}
        evaluator={selectedEvaluator}
        onClose={() => {
          setShowEmailModal(false);
          setSelectedEvaluator(null);
        }}
        onSend={sendEmail}
      />
    </div>
  );
}
