import React from "react";
import { Link } from "react-router-dom";

const Guidelines = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="text-red-800 text-center py-12 shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold">
          Official Hackathon Guidelines & Rules 📜
        </h1>
        {/* <Link to="/" className="text-yellow-400 hover:text-yellow-300 mt-2 inline-block">
          ← Back to Dashboard
        </Link> */}
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Intro Section */}
        <section className="bg-white shadow-md rounded-lg border border-red-100 p-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            These guidelines govern the{" "}
            <span className="font-semibold text-red-600">
              JSPM JSCOE Hackathon 2025
            </span>
            . All participants must adhere strictly to these rules. Violation of
            any guideline may lead to immediate disqualification.
          </p>
        </section>

        {/* Eligibility and Team Composition */}
        <section className="bg-white shadow-md rounded-lg border border-red-100 p-6">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">
            1. Eligibility and Team Composition
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed">
            <li>
              <strong className="text-red-600">Eligibility:</strong> The
              hackathon is open to all UG and PG students currently enrolled in
              an AICTE/UGC-approved institution.
            </li>
            <li>
              <strong className="text-red-600">Team Size:</strong> Teams must
              consist of a minimum of 4 members and a maximum of 6 members.
            </li>
            <li>
              <strong className="text-red-600">Gender Ratio (Mandatory):</strong>{" "}
              Each team must include at least one female team member to promote
              gender diversity in tech.
            </li>
            <li>
              <strong className="text-red-600">Team Leader:</strong> Every team
              must nominate one Team Leader who will be the sole point of
              contact for all official communication.
            </li>
            <li>
              <strong className="text-red-600">Cross-Disciplinary Teams:</strong>{" "}
              We highly encourage teams to be cross-disciplinary (e.g.,
              combining CS/IT with Mechanical/Civil/Design students).
            </li>
          </ol>
        </section>

        {/* Problem Statement and Submission */}
        <section className="bg-white shadow-md rounded-lg border border-red-100 p-6">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">
            2. Problem Statement and Submission
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 leading-relaxed">
            <li>
              <strong className="text-red-600">Problem Statements (PS):</strong>{" "}
              Teams must select one problem statement from the list provided on
              the{" "}
              <Link
                to="/problems"
                className="text-yellow-500 hover:underline font-semibold"
              >
                Problem Statements
              </Link>{" "}
              page. PS change requests after registration are generally not
              permitted.
            </li>
            <li>
              <strong className="text-red-600">Idea Originality:</strong> The
              core idea and implementation must be developed primarily during
              the 36-hour hackathon period. Use of open-source libraries is
              allowed, but plagiarism will result in disqualification.
            </li>
            <li>
              <strong className="text-red-600">Required Deliverables:</strong>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>A working Minimum Viable Product (MVP) or prototype.</li>
                <li>
                  A short (5-slide max) Presentation Deck outlining the solution
                  and tech stack.
                </li>
                <li>
                  A link to the complete source code repository
                  (GitHub/GitLab).
                </li>
              </ul>
            </li>
            <li>
              <strong className="text-red-600">Submission Platform:</strong> All
              final deliverables must be uploaded to the official JSCOE
              Hackathon submission portal before the final deadline.
            </li>
          </ol>
        </section>

        {/* Judging and Evaluation */}
        <section className="bg-white shadow-md rounded-lg border border-red-100 p-6">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">
            3. Judging and Evaluation
          </h2>
          <p className="text-gray-700 mb-4">
            Solutions will be judged by a panel of experts based on the
            following weighted criteria:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
            <li>
              <strong className="text-red-600">Novelty & Innovation (30%):</strong>{" "}
              Uniqueness and complexity of the problem tackled.
            </li>
            <li>
              <strong className="text-red-600">
                Technical Implementation (30%):
              </strong>{" "}
              Robustness, efficiency, and use of relevant technologies.
            </li>
            <li>
              <strong className="text-red-600">Impact & Scalability (25%):</strong>{" "}
              Potential benefit and feasibility of scaling the solution.
            </li>
            <li>
              <strong className="text-red-600">Presentation & Demo (15%):</strong>{" "}
              Clarity and effectiveness of the presentation and working demo.
            </li>
          </ul>
        </section>

        {/* Code of Conduct */}
        <section className="bg-white shadow-md rounded-lg border border-red-100 p-6">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">
            4. Code of Conduct
          </h2>
          <p className="text-gray-700 font-medium mb-3">
            All participants must maintain the highest standards of
            professionalism and ethics.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
            <li>
              Any form of cheating, harassment, or disruptive behavior will lead
              to immediate disqualification.
            </li>
            <li>
              The organizing committee’s decision regarding judging and
              disqualification will be final and binding.
            </li>
            <li>
              Respect the campus infrastructure and maintain cleanliness at all
              times.
            </li>
          </ul>
        </section>

        {/* Footer Button */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-block bg-yellow-400 text-red-700 font-semibold px-6 py-3 rounded-md shadow hover:bg-yellow-500 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Guidelines;
