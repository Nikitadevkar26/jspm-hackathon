import React from "react";
import { Link } from "react-router-dom";

const Guidelines = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="text-red-800 text-center py-12 shadow-md bg-white">
        <h1 className="text-3xl md:text-4xl font-bold">
          International Innovation Challenge 2026
        </h1>
        <p className="mt-3 text-gray-600 text-lg">
          Official Guidelines, Rules & Submission Standards
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {/* Intro */}
        <section className="bg-white shadow-md rounded-lg border border-red-100 p-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            These guidelines govern the{" "}
            <span className="font-semibold text-red-600">
              JSPM JSCOE International Innovation Challenge 2026
            </span>.
            All participating teams must strictly adhere to the rules and
            submission standards outlined below. Non-compliance at any stage
            may result in disqualification.
          </p>
        </section>

        {/* Eligibility */}
        <section className="bg-white shadow-md rounded-lg border border-red-100 p-6">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">
            1. Eligibility & Team Composition
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              <strong className="text-red-600">Global Participation:</strong>{" "}
              Open to students currently enrolled in recognized Engineering
              undergraduate programs in India or internationally.
            </li>
            <li>
              <strong className="text-red-600">Team Size:</strong>{" "}
              Each team can consist <strong>upto 4 members, including the Team Leader</strong>.
            </li>
            <li>
              <strong className="text-red-600">Mandatory Diversity:</strong>{" "}
              At least one female member is compulsory for team eligibility.
            </li>
            <li>
              <strong className="text-red-600">Institutional Unity:</strong>{" "}
              All six members must belong to the same institution. Cross-college
              or cross-university teams are not permitted.
            </li>
            <li>
              <strong className="text-red-600">Technical Balance:</strong>{" "}
              Software tracks require strong programming expertise, while
              hardware tracks are encouraged to include multi-disciplinary
              members (Electronics, Mechanical, UI/UX, etc.).
            </li>
          </ol>
        </section>

        {/* Registration */}
        <section className="bg-white shadow-md rounded-lg border border-red-100 p-6">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">
            2. Registration & Team Identity
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              <strong className="text-red-600">Direct Registration:</strong>{" "}
              Since there is no SPOC, the Team Leader must register the team
              directly on the official event portal.
            </li>
            <li>
              <strong className="text-red-600">Unique Team Name:</strong>{" "}
              Team names must be unique and must not contain the name of your
              college or university in any form.
            </li>
          </ol>
        </section>

        {/* Idea Submission */}
        <section className="bg-white shadow-md rounded-lg border border-red-100 p-6">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">
            3. Idea Submission Standards
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>
              <strong className="text-red-600">Idea Title & Category:</strong>{" "}
              Clearly specify whether the idea falls under a defined Problem
              Statement or the Open Innovation category.
            </li>
            <li>
              <strong className="text-red-600">Technical Documentation:</strong>{" "}
              Submission must include both a PDF and PPT detailing architecture,
              workflow, and technology stack.
            </li>
            <li>
              <strong className="text-red-600">Novelty Declaration:</strong>{" "}
              Teams must certify that the idea is original and has not been
              submitted to any previous competitions or hackathons.
            </li>
          </ul>
        </section>

        {/* PDF Format */}
        <section className="bg-white shadow-md rounded-lg border border-red-100 p-6">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">
            4. Idea Submission PDF Format (Mandatory)
          </h2>
          <p className="text-gray-700 mb-4">
            All teams must strictly follow the official Idea Submission PDF
            format. Submissions not adhering to this structure may be rejected
            during the initial screening.
          </p>

          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Team Details & Problem Statement</li>
            <li>Abstract (100–150 words)</li>
            <li>Architecture & System Design</li>
            <li>Algorithms & Flowcharts</li>
            <li>Technology Stack</li>
            <li>Business Plan & Market Viability</li>
            <li>Conclusion & References</li>
          </ul>

          <div className="mt-6 text-center">
            <a
              href="/pdf/JSCOE IC - Guidelines - for our ref.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 text-white px-6 py-3 rounded-md shadow hover:bg-red-700 transition"
            >
              View Official PDF Submission Format
            </a>
          </div>
        </section>

        {/* Evaluation */}
        <section className="bg-white shadow-md rounded-lg border border-red-100 p-6">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">
            5. Evaluation & Shortlisting Criteria
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Novelty & Technical Complexity</li>
            <li>Feasibility & Scalability</li>
            <li>User Experience (UX) & Design Quality</li>
            <li>Sustainability & Long-Term Impact</li>
          </ul>
        </section>

        {/* Finale */}
        <section className="bg-white shadow-md rounded-lg border border-red-100 p-6">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">
            6. Grand Finale (Offline)
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Shortlisted teams must travel to the host campus for the offline
              grand finale.
            </li>
            <li>
              Food and refreshments will be arranged by the college during the
              finale.
            </li>
            <li>
              A stamped college photo ID is mandatory for venue entry.
            </li>
          </ul>
        </section>

        {/* Footer */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-block bg-yellow-400 text-red-700 font-semibold px-6 py-3 rounded-md shadow hover:bg-yellow-500 transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Guidelines;
