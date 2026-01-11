import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:8088";

const EvaluatorScoringPage = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();

  const [token] = useState(() => localStorage.getItem("evaluatorToken"));
  const [evaluator] = useState(() =>
    JSON.parse(localStorage.getItem("evaluator"))
  );

  const [team, setTeam] = useState(null);
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [scores, setScores] = useState({
    novelty: 0,
    clarity: 0,
    feasibility: 0,
    impact: 0,
    future: 0,
    comments: ""
  });

  const total =
    scores.novelty +
    scores.clarity +
    scores.feasibility +
    scores.impact +
    scores.future;

  /* ---------------- FETCH SCORING DETAILS ---------------- */
  useEffect(() => {
    if (!teamId || !evaluator || !token) {
      setError("Session expired. Please go back and retry.");
      setLoading(false);
      return;
    }

    const fetchScoringDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_BASE_URL}/api/evaluators/scoring-details`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { teamId }
          }
        );

        setTeam(response.data.team || null);
        setIdea(response.data.idea || null);

        if (response.data.existingScore !== null) {
          setError("This project has already been evaluated.");
          return;
        }
      } catch (err) {
        console.error("Fetch scoring details error:", err);
        setError("Unable to load scoring details");
      } finally {
        setLoading(false);
      }
    };

    fetchScoringDetails();
  }, [teamId, token, evaluator]);

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/evaluators/submit-score`,
        { teamId, ...scores, total_score: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate(-1);
    } catch (err) {
      console.error("Submit score error:", err);
      alert(err.response?.data?.message || "Failed to submit score");
    }
  };

  /* ---------------- STATES ---------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        Loading evaluation details…
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-16 bg-red-50 border border-red-200 text-red-700 p-5 rounded-lg">
        {error}
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-2xl font-bold mt-3 text-gray-900">
          {team?.project_title || "Project Evaluation"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Evaluate the project based on defined judging criteria
        </p>
      </div>

      {/* Project Details */}
      {idea && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Project Submission
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-medium text-gray-600">Title:</span>{" "}
              {idea.title}
            </p>
            <p>
              <span className="font-medium text-gray-600">Summary:</span>{" "}
              {idea.summary}
            </p>
          </div>

          <p className="text-sm text-gray-700">
            <span className="font-medium text-gray-600">Description:</span>{" "}
            {idea.description}
          </p>

          <div className="flex flex-wrap gap-4 text-sm pt-2">
            <a
              href={idea.drive_link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              📁 Drive Link
            </a>

            {idea.github_link && (
              <a
                href={idea.github_link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                💻 GitHub
              </a>
            )}

            {idea.youtube_link && (
              <a
                href={idea.youtube_link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                ▶ YouTube
              </a>
            )}
          </div>
        </div>
      )}

      {/* Scoring Section */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Evaluation Scores
        </h2>

        <div className="space-y-4">
          {[
            ["Novelty", "novelty"],
            ["Clarity", "clarity"],
            ["Feasibility", "feasibility"],
            ["Impact", "impact"],
            ["Future Scope", "future"]
          ].map(([label, key]) => (
            <div
              key={key}
              className="flex items-center justify-between border-b pb-3"
            >
              <span className="text-gray-700 font-medium">{label}</span>
              <input
                type="number"
                min="0"
                max="10"
                value={scores[key]}
                onChange={(e) =>
                  setScores({ ...scores, [key]: Number(e.target.value) })
                }
                className="w-20 text-center border rounded-md px-2 py-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mt-6 text-lg font-semibold">
          <span>Total Score</span>
          <span className="text-red-600">{total} / 50</span>
        </div>

        {/* Comments */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Evaluator Comments
          </label>
          <textarea
            rows={4}
            value={scores.comments}
            onChange={(e) =>
              setScores({ ...scores, comments: e.target.value })
            }
            placeholder="Provide qualitative feedback or justification for scores"
            className="w-full border rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-lg font-semibold"
        >
          Submit Evaluation
        </button>
      </div>
    </div>
  );
};

export default EvaluatorScoringPage;
