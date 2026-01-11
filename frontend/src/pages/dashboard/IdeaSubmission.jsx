// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const IdeaSubmission = () => {
//   const location = useLocation();

//   const [idea, setIdea] = useState({
//     title: "",
//     description: "",
//     summary: "",
//     driveLink: "",
//     github: "",
//     youtube: "",
//   });

//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   /* =========================
//      RESET STATE ON ROUTE ENTRY
//      (FIX FOR ROUTER REUSE BUG)
//   ========================= */
//   useEffect(() => {
//     setLoading(false);
//     setSubmitted(false);
//   }, [location.pathname]);

//   /* =========================
//      HANDLE INPUT CHANGE
//   ========================= */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setIdea((prev) => ({ ...prev, [name]: value }));
//   };

//   // /* =========================
//   //    HANDLE SUBMIT (API CALL)
//   // ========================= */
//   // const handleSubmit = async () => {
//   //   // 🔥 DEBUG — THIS MUST PRINT
//   //   console.log("🚀 HANDLE SUBMIT FIRED");

//   //   if (!idea.title || !idea.description || !idea.summary || !idea.driveLink) {
//   //     alert("Please fill all required fields.");
//   //     return;
//   //   }

//   //   setLoading(true);

//   //   try {
//   //     const response = await fetch(
//   //       "http://127.0.0.1:8088/api/idea-submission",
//   //       {
//   //         method: "POST",
//   //         headers: { "Content-Type": "application/json" },
//   //         body: JSON.stringify({
//   //           team_id: 1,
//   //           team_name: "Innovators Squad",
//   //           title: idea.title,
//   //           description: idea.description,
//   //           summary: idea.summary,
//   //           drive_link: idea.driveLink,
//   //           github_link: idea.github,
//   //           youtube_link: idea.youtube,
//   //         }),
//   //       }
//   //     );

//   //     if (!response.ok) {
//   //       throw new Error("Submission failed");
//   //     }

//   //     setSubmitted(true);
//   //     alert("Idea submitted successfully!");
//   //   } catch (err) {
//   //     console.error("❌ SUBMIT ERROR:", err);
//   //     alert("Failed to submit idea");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   /* =========================
//      HANDLE SUBMIT (API CALL)
//   ========================= */
//   const handleSubmit = async () => {
//     // 🔥 DEBUG — THIS MUST PRINT
//     console.log("🚀 HANDLE SUBMIT FIRED");

//     if (!idea.title || !idea.description || !idea.summary || !idea.driveLink) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8088/api/idea-submission",
//         {
//           team_id: 1,
//           team_name: "Innovators Squad",
//           title: idea.title,
//           description: idea.description,
//           summary: idea.summary,
//           drive_link: idea.driveLink,
//           github_link: idea.github,
//           youtube_link: idea.youtube,
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       setSubmitted(true);
//       alert("Idea submitted successfully!");
//     } catch (err) {
//       console.error("❌ SUBMIT ERROR:", err);
//       alert("Failed to submit idea");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       {/* HEADER */}
//       <div className="text-center mb-10">
//         <h1 className="text-3xl md:text-4xl font-bold text-red-700">
//           Idea Submission Portal
//         </h1>
//         <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
//           Submit your innovative idea along with a publicly accessible Google
//           Drive link for evaluation.
//         </p>
//       </div>

//       {/* FORM CONTAINER */}
//       <div className="bg-white max-w-4xl mx-auto rounded-2xl shadow-lg border border-gray-200">
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleSubmit();
//           }}
//         >
//           <div className="p-8 space-y-8">
//             {/* SECTION: IDEA DETAILS */}
//             <div>
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                 Idea Details
//               </h2>

//               {/* TITLE */}
//               <div className="mb-4">
//                 <label className="block font-medium text-gray-700 mb-1">
//                   Idea Title{" "}
//                   <span className="text-sm text-gray-500">
//                     (Max 100 characters)
//                   </span>
//                 </label>
//                 <textarea
//                   name="title"
//                   rows="2"
//                   maxLength="100"
//                   value={idea.title}
//                   onChange={handleChange}
//                   disabled={submitted}
//                   placeholder="Enter a concise and impactful title"
//                   className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-red-500"
//                 />
//               </div>

//               {/* DESCRIPTION */}
//               <div className="mb-4">
//                 <label className="block font-medium text-gray-700 mb-1">
//                   Detailed Description{" "}
//                   <span className="text-sm text-gray-500">
//                     (Max 750 characters)
//                   </span>
//                 </label>
//                 <textarea
//                   name="description"
//                   rows="4"
//                   maxLength="750"
//                   value={idea.description}
//                   onChange={handleChange}
//                   disabled={submitted}
//                   placeholder="Describe the problem, solution, and technical approach"
//                   className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-red-500"
//                 />
//               </div>

//               {/* SUMMARY */}
//               <div>
//                 <label className="block font-medium text-gray-700 mb-1">
//                   Executive Summary{" "}
//                   <span className="text-sm text-gray-500">
//                     (Max 750 characters)
//                   </span>
//                 </label>
//                 <textarea
//                   name="summary"
//                   rows="3"
//                   maxLength="750"
//                   value={idea.summary}
//                   onChange={handleChange}
//                   disabled={submitted}
//                   placeholder="Short summary for evaluators and jury members"
//                   className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-red-500"
//                 />
//               </div>
//             </div>

//             {/* SECTION: DOCUMENT LINK */}
//             <div>
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                 Idea Documentation
//               </h2>

//               <label className="block font-medium text-gray-700 mb-1">
//                 Google Drive Link <span className="text-red-600">*</span>
//               </label>
//               <input
//                 type="url"
//                 name="driveLink"
//                 value={idea.driveLink}
//                 onChange={handleChange}
//                 disabled={submitted}
//                 placeholder="https://drive.google.com/..."
//                 className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-red-500"
//               />
//               <p className="text-sm text-gray-500 mt-1">
//                 Upload your PPT / document to Google Drive and set access to
//                 <strong> “Anyone with the link – View”</strong>.
//               </p>
//             </div>

//             {/* SECTION: OPTIONAL LINKS */}
//             <div>
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                 Reference Links (Optional)
//               </h2>

//               <div className="mb-4">
//                 <label className="block font-medium text-gray-700 mb-1">
//                   GitHub Repository
//                 </label>
//                 <input
//                   type="url"
//                   name="github"
//                   value={idea.github}
//                   onChange={handleChange}
//                   disabled={submitted}
//                   placeholder="https://github.com/username/repository"
//                   className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-red-500"
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium text-gray-700 mb-1">
//                   YouTube Demo Link
//                 </label>
//                 <input
//                   type="url"
//                   name="youtube"
//                   value={idea.youtube}
//                   onChange={handleChange}
//                   disabled={submitted}
//                   placeholder="https://youtu.be/demo"
//                   className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-red-500"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* ACTION BAR */}
//           <div className="border-t bg-gray-50 px-8 py-5 flex justify-center">
//             <button
//               type="submit"
//               disabled={loading || submitted}
//               className={`px-8 py-2 rounded-lg font-semibold text-white ${loading || submitted
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-red-600 hover:bg-red-700"
//                 }`}
//             >
//               {loading
//                 ? "Submitting..."
//                 : submitted
//                   ? "Submitted"
//                   : "Submit Idea"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default IdeaSubmission;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const IdeaSubmission = () => {
  const location = useLocation();

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
  const teamUser = JSON.parse(localStorage.getItem("teamUser"));
  const email = teamUser?.email;

  /* =========================
     RESET STATE ON ROUTE ENTRY
     (FIX FOR ROUTER REUSE BUG)
  ========================= */
  useEffect(() => {
    setLoading(false);
    setSubmitted(false);
  }, [location.pathname]);

  /* =========================
     CHECK SUBMISSION STATUS
  ========================= */
  useEffect(() => {
    if (!email) return;

    const checkSubmissionStatus = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8088/api/idea-submission/team/${email}`
        );

        if (res.data.submitted) {
          const i = res.data.idea;

          setIdea({
            title: i.title,
            description: i.description,
            summary: i.summary,
            driveLink: i.drive_link,
            github: i.github_link || "",
            youtube: i.youtube_link || "",
          });

          setSubmitted(true);
        }
      } catch (err) {
        console.error("Failed to check submission status", err);
      }
    };

    checkSubmissionStatus();
  }, [email]);

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIdea((prev) => ({ ...prev, [name]: value }));
  };

  /* =========================
     HANDLE SUBMIT
  ========================= */
  const handleSubmit = async () => {
    console.log("🚀 HANDLE SUBMIT FIRED");

    // 🔒 Do not submit again
    if (submitted) return;

    if (!idea.title || !idea.description || !idea.summary || !idea.driveLink) {
      alert("Please fill all required fields.");
      return;
    }

    if (!email) {
      alert("User email not found. Please log in again.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "http://127.0.0.1:8088/api/idea-submission",
        {
          email, // ✅ REQUIRED
          title: idea.title,
          description: idea.description,
          summary: idea.summary,
          drive_link: idea.driveLink,
          github_link: idea.github,
          youtube_link: idea.youtube,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setSubmitted(true);
      alert("Idea submitted successfully!");
    } catch (err) {
      if (err.response?.status === 409) {
        setSubmitted(true);
        alert("Idea already submitted. Editing is disabled.");
      } else {
        console.error("❌ SUBMIT ERROR:", err);
        alert("Failed to submit idea");
      }
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="p-8 space-y-8">
            {/* SECTION: IDEA DETAILS */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Idea Details
              </h2>

              {/* TITLE */}
              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-1">
                  Idea Title{" "}
                  <span className="text-sm text-gray-500">
                    (Max 100 characters)
                  </span>
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
                  Detailed Description{" "}
                  <span className="text-sm text-gray-500">
                    (Max 750 characters)
                  </span>
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
                  Executive Summary{" "}
                  <span className="text-sm text-gray-500">
                    (Max 750 characters)
                  </span>
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
            </div>

            {/* SECTION: OPTIONAL LINKS */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Reference Links (Optional)
              </h2>

              <label className="block font-medium text-gray-700 mb-1">
                GitHub Profile Link <span className="text-red-600">*</span>
              </label>
              <input
                type="url"
                name="github"
                value={idea.github}
                onChange={handleChange}
                disabled={submitted}
                className="w-full rounded-lg border border-gray-300 p-3 mb-4"
              />

              <label className="block font-medium text-gray-700 mb-1">
                Youtube Channel Link <span className="text-red-600">*</span>
              </label>
              <input
                type="url"
                name="youtube"
                value={idea.youtube}
                onChange={handleChange}
                disabled={submitted}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>
          </div>

          {/* ACTION BAR */}
          <div className="border-t bg-gray-50 px-8 py-5 flex justify-center">
            <button
              type="submit"
              disabled={loading || submitted}
              className={`px-8 py-2 rounded-lg font-semibold text-white ${
                loading || submitted
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {loading
                ? "Submitting..."
                : submitted
                ? "Submitted"
                : "Submit Idea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IdeaSubmission;
