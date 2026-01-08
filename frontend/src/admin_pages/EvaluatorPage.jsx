"use client";

import { Check, Eye, Mail, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

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
      setError("");
      const token = localStorage.getItem("adminToken");

      const { data } = await axios.get(
        "http://localhost:8088/api/admin/evaluators",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEvaluators(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch evaluators error:", err);
      setError("Failed to load evaluators");
      setEvaluators([]);
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

      const token = localStorage.getItem("adminToken");

      await axios.put(
        `http://localhost:8088/api/admin/evaluators/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchEvaluators();
    } catch (err) {
      console.error("Status update error:", err);
      setError(
        err.response?.data?.message || "Failed to update evaluator status"
      );
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
      const token = localStorage.getItem("adminToken");

      await axios.post(
        `http://localhost:8088/api/admin/evaluators/${selectedEvaluator.evaluator_id}/send-email`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Email sent successfully");
    } catch (err) {
      console.error("Send email error:", err);
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
            {Array.isArray(evaluators) &&
              evaluators.map((ev) => (
                <tr
                  key={ev.evaluator_id}
                  className="hover:bg-slate-50"
                >
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
                        onClick={() =>
                          setSelectedEvaluatorId(ev.evaluator_id)
                        }
                        className="bg-slate-600 text-white px-3 py-1 rounded flex items-center gap-1"
                      >
                        <Eye size={14} /> View
                      </button>

                      {/* APPROVE / REJECT  */}
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
