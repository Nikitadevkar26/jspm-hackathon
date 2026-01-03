import React, { useState } from "react";

const IdeaSubmission = () => {
  const [idea, setIdea] = useState({
    title: "",
    description: "",
    summary: "",
    driveLink: "",
    github: "",
    youtube: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIdea((prev) => ({ ...prev, [name]: value }));
  };

  /* =========================
     HANDLE SUBMIT (API CALL)
  ========================= */
  const handleSubmit = async () => {
    console.log("Submit clicked");

    if (!idea.title || !idea.description || !idea.summary || !idea.driveLink) {
      alert("Please fill all required fields and provide Google Drive link.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5001/api/idea-submission",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            team_id: 1,
            team_name: "Innovators Squad",
            title: idea.title,
            description: idea.description,
            summary: idea.summary,
            drive_link: idea.driveLink,
            github_link: idea.github,
            youtube_link: idea.youtube,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed");
      }

      setSubmitted(true);
      alert("Idea submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit idea. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-red-700">
          Idea Submission Portal
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Submit your innovative idea along with a publicly accessible Google
          Drive link for evaluation.
        </p>
      </div>

      {/* FORM CONTAINER */}
      <div className="bg-white max-w-4xl mx-auto rounded-2xl shadow-lg border border-gray-200">
        <div className="p-8 space-y-8">
          {/* SECTION: IDEA DETAILS */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Idea Details
            </h2>

            {/* TITLE */}
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-1">
                Idea Title <span className="text-sm text-gray-500">(Max 100 characters)</span>
              </label>
              <textarea
                name="title"
                rows="2"
                maxLength="100"
                value={idea.title}
                onChange={handleChange}
                disabled={submitted}
                placeholder="Enter a concise and impactful title"
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-1">
                Detailed Description <span className="text-sm text-gray-500">(Max 750 characters)</span>
              </label>
              <textarea
                name="description"
                rows="4"
                maxLength="750"
                value={idea.description}
                onChange={handleChange}
                disabled={submitted}
                placeholder="Describe the problem, solution, and technical approach"
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* SUMMARY */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Executive Summary <span className="text-sm text-gray-500">(Max 750 characters)</span>
              </label>
              <textarea
                name="summary"
                rows="3"
                maxLength="750"
                value={idea.summary}
                onChange={handleChange}
                disabled={submitted}
                placeholder="Short summary for evaluators and jury members"
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* SECTION: DOCUMENT LINK */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Idea Documentation
            </h2>

            <label className="block font-medium text-gray-700 mb-1">
              Google Drive Link <span className="text-red-600">*</span>
            </label>
            <input
              type="url"
              name="driveLink"
              value={idea.driveLink}
              onChange={handleChange}
              disabled={submitted}
              placeholder="https://drive.google.com/..."
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-red-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Upload your PPT / document to Google Drive and set access to
              <strong> “Anyone with the link – View”</strong>.
            </p>
          </div>

          {/* SECTION: OPTIONAL LINKS */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Reference Links (Optional)
            </h2>

            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-1">
                GitHub Repository
              </label>
              <input
                type="url"
                name="github"
                value={idea.github}
                onChange={handleChange}
                disabled={submitted}
                placeholder="https://github.com/username/repository"
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                YouTube Demo Link
              </label>
              <input
                type="url"
                name="youtube"
                value={idea.youtube}
                onChange={handleChange}
                disabled={submitted}
                placeholder="https://youtu.be/demo"
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </div>

        {/* ACTION BAR */}
        <div className="border-t bg-gray-50 px-8 py-5 flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitted}
            className={`px-8 py-2 rounded-lg font-semibold text-white ${submitted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
              }`}
          >
            {submitted ? "Submitted" : loading ? "Submitting..." : "Submit Idea"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default IdeaSubmission;
