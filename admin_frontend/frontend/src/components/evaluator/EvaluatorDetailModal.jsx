"use client";

import { useEffect, useState } from "react";
import { X, Phone, Calendar, FileText } from "lucide-react";

export default function EvaluatorDetailModal({
  evaluatorId,
  onClose
}) {
  const [evaluator, setEvaluator] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================================
     FETCH EVALUATOR DETAILS
  ================================ */
  useEffect(() => {
    if (!evaluatorId) return;

    const fetchEvaluator = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `http://localhost:5001/api/evaluators/${evaluatorId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch evaluator");
        }

        const data = await res.json();
        setEvaluator(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load evaluator details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluator();
  }, [evaluatorId]);

  if (!evaluatorId) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-3xl w-full rounded-xl overflow-hidden shadow-lg">

        {/* ================= HEADER ================= */}
        <div className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">
            Evaluator Application Details
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* ================= BODY ================= */}
        <div className="p-6 space-y-6">

          {/* LOADING */}
          {loading && (
            <p className="text-center text-gray-500">
              Loading evaluator details...
            </p>
          )}

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded">
              {error}
            </div>
          )}

          {/* CONTENT */}
          {!loading && evaluator && (
            <>
              {/* CONTACT + STATUS */}
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Contact Information</p>
                  <p className="text-lg font-bold">{evaluator.email}</p>
                  <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <Phone size={14} />
                    {evaluator.phone || "—"}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`px-4 py-1 rounded-full font-bold text-sm ${
                      evaluator.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : evaluator.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {evaluator.status}
                  </span>

                  {evaluator.created_at && (
                    <p className="flex justify-end items-center gap-1 text-sm text-gray-500 mt-2">
                      <Calendar size={14} />
                      Registered on{" "}
                      {new Date(evaluator.created_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {/* ORGANIZATION INFO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <Info label="Name" value={evaluator.name} />
                <Info label="Role" value={evaluator.role} />
                <Info label="Organization" value={evaluator.organization} />
                <Info label="Department" value={evaluator.department} />
                <Info label="Country" value={evaluator.country} />
                <Info label="State" value={evaluator.state} />
                <Info label="City" value={evaluator.city} />
                {/* <Info
                  label="Approved At"
                  value={
                    evaluator.approved_at
                      ? new Date(evaluator.approved_at).toLocaleString()
                      : "—"
                  }
                /> */}
              </div>

              {/* DOCUMENTS */}
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <FileText size={16} />
                  Uploaded Documents
                </h4>

                <ul className="text-sm space-y-2">
                  {/* <li>
                    <span className="font-medium">Profile Image:</span>{" "}
                    {evaluator.profile_image ? "Available" : "—"}
                  </li> */}

                  <li>
                    <span className="font-medium">ID Proof:</span>{" "}
                    {evaluator.id_proof_image ? "Available" : "—"}
                  </li>

                  <li>
                    <span className="font-medium">Resume (Drive Link):</span>{" "}
                    {evaluator.resume_drive_url ? (
                      <a
                        href={evaluator.resume_drive_url}
                        target="_blank"
                        className="text-indigo-600 underline"
                      >
                        Open Link
                      </a>
                    ) : (
                      "—"
                    )}
                  </li>
                </ul>
              </div>
            </>
          )}

          {/* ================= FOOTER ================= */}
          <div className="flex justify-end border-t pt-4">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= INFO ROW ================= */
const Info = ({ label, value }) => (
  <p className="text-sm">
    <span className="font-semibold text-gray-700">{label}:</span>{" "}
    <span className="text-gray-600">{value || "—"}</span>
  </p>
);
