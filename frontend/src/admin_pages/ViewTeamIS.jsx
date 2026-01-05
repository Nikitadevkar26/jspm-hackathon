"use client";

import React, { useEffect, useState } from "react";

const STATUS_COLORS = {
  SUBMITTED: "bg-blue-100 text-blue-700",
  UNDER_REVIEW: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700"
};

export default function ViewTeamIS() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/admin-view-idea-submission")
      .then(res => res.json())
      .then(data => {
        setIdeas(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-600">Loading idea submissions...</p>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Team Idea Submissions
      </h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Team Name</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Summary</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Submitted At</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {ideas.map(idea => (
              <React.Fragment key={idea.id}>
                <tr className="border-t">
                  <td className="p-3">{idea.team_name}</td>
                  <td className="p-3 font-medium">{idea.title}</td>
                  <td className="p-3 text-sm text-gray-600">
                    {idea.summary.slice(0, 60)}...
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        STATUS_COLORS[idea.submission_status]
                      }`}
                    >
                      {idea.submission_status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-500">
                    {new Date(idea.submitted_at).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === idea.id ? null : idea.id)
                      }
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      {expandedId === idea.id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {expandedId === idea.id && (
                  <tr className="bg-gray-50 border-t">
                    <td colSpan="6" className="p-4 space-y-3 text-sm">
                      <p>
                        <strong>Description:</strong><br />
                        {idea.description}
                      </p>

                      <p>
                        <strong>Drive Link:</strong>{" "}
                        <a
                          href={idea.drive_link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          Open
                        </a>
                      </p>

                      <p>
                        <strong>GitHub:</strong>{" "}
                        <a
                          href={idea.github_link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          Repository
                        </a>
                      </p>

                      <p>
                        <strong>YouTube:</strong>{" "}
                        <a
                          href={idea.youtube_link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          Demo Video
                        </a>
                      </p>

                      <p className="text-gray-500">
                        Last Updated:{" "}
                        {new Date(idea.updated_at).toLocaleString()}
                      </p>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
