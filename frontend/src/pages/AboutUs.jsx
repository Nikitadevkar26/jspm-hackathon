import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="about-page bg-gray-50 min-h-screen text-gray-700">
      {/* Header */}
      <header className="about-header text-red-800 shadow-md py-12 text-center">
        <h1 className="text-4xl font-bold">About JSPM JSCOE Hackathon 2025 🚀</h1>
        <p className="text-lg mt-2 text-gray-600">
          Empowering innovation, collaboration, and real-world problem-solving.
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 space-y-12">
        {/* About Section */}
        <section className="about-section space-y-4">
          <h2 className="text-2xl font-bold text-red-600">Our Vision</h2>
          <p>
            The JSPM JSCOE Hackathon 2025 is a 36-hour innovation marathon that
            brings together bright minds from across the country to tackle
            real-world problems. Our goal is to inspire students to develop
            sustainable and impactful technological solutions that improve our
            community and the world at large.
          </p>
        </section>

        {/* Mission Section */}
        <section className="about-section space-y-4">
          <h2 className="text-2xl font-bold text-red-600">Our Mission</h2>
          <p>
            Through this hackathon, we aim to cultivate creativity,
            collaboration, and technical excellence. Participants will work in
            teams, guided by industry mentors and faculty experts, to prototype
            solutions addressing urban development, campus sustainability, and
            smart governance challenges.
          </p>
        </section>

        {/* Themes Section */}
        <section className="about-section space-y-4">
          <h2 className="text-2xl font-bold text-red-600">
            Hackathon Focus Areas
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Smart Campus Automation</li>
            <li>Clean & Green Pune Initiatives</li>
            <li>Digital Governance and E-Governance Solutions</li>
            <li>Innovations in Mobility and Infrastructure</li>
            <li>AI-Driven Sustainable Solutions</li>
          </ul>
        </section>

        {/* Organizers Section */}
        <section className="about-section space-y-4">
          <h2 className="text-2xl font-bold text-red-600">Organized By</h2>
          <p>
            JSPM’s Jayawantrao Sawant College of Engineering (JSCOE), Pune —
            under the guidance of the Department of Computer Engineering —
            proudly presents this hackathon as part of its commitment to
            promoting innovation, entrepreneurship, and hands-on learning among
            students.
          </p>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-12">
          <p className="mb-4 text-gray-700">
            Want to participate and bring your ideas to life?
          </p>
          <Link
            to="/registration"
            className="register-btn bg-yellow-400 text-red-600 font-semibold px-6 py-3 rounded hover:bg-yellow-500 hover:text-red-700 transition-colors"
          >
            Register Your Team Now
          </Link>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
