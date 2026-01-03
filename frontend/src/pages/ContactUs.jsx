import React, { useState } from 'react';

const ContactUs = () => {
  const MAX_MESSAGE_LENGTH = 5000; // Character limit for ~1000 words
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [messageLength, setMessageLength] = useState(0); // New state for tracking length

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update the message length state if the field is 'message'
    if (name === 'message') {
      setMessageLength(value.length);
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Simulate API call success/failure here
    setSubmissionStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setMessageLength(0); // Reset length on successful submission
    setTimeout(() => setSubmissionStatus(null), 5000);
  };

  return (
    <div className="contact-page-layout bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="contact-header text-red-800 shadow-md py-10 text-center">
        <h1 className="text-4xl font-bold">Contact Us 📞</h1>
      </header>

      <main className="contact-main-content container mx-auto px-6 py-12 space-y-12">
        {/* Intro */}
        <p className="contact-intro text-gray-700">
          For any queries related to the JSPM JSCOE Hackathon 2025, please refer to the appropriate contact channel below or submit your question directly.
        </p>

        {/* Section 1: Hackathon Support */}
        <section className="contact-section hackathon-support space-y-6">
          <h2 className="section-title text-2xl font-bold text-red-600 mb-4">Hackathon Technical and Registration Support</h2>
          <div className="contact-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="contact-card support-card bg-white shadow-md rounded-lg border-t-4 border-red-500 p-6">
              <h4 className="font-semibold text-lg mb-3">Registration & Eligibility Queries</h4>
              <div className="detail-item mb-2">
                <strong>Contact Person:</strong>
                <p>Dr. P. A. Patil (SPOC - Single Point of Contact)</p>
              </div>
              <div className="detail-item mb-2">
                <strong>Mobile:</strong>
                <p>+91 98905 70405</p>
              </div>
              <div className="detail-item">
                <strong>Email:</strong>
                <p>sih_support@jspmjscoe.edu.in</p>
              </div>
            </div>

            <div className="contact-card support-card bg-white shadow-md rounded-lg border-t-4 border-red-500 p-6">
              <h4 className="font-semibold text-lg mb-3">Technical & Problem Statement Queries</h4>
              <div className="detail-item mb-2">
                <strong>Contact Person:</strong>
                <p>Prof. S. D. Kulkarni (Technical Coordinator)</p>
              </div>
              <div className="detail-item mb-2">
                <strong>Mobile:</strong>
                <p>+91 98220 12345</p>
              </div>
              <div className="detail-item">
                <strong>Email:</strong>
                <p>tech_support@jspmjscoe.edu.in</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Ask a Question Form */}
        <section className="contact-section ask-question-form-section space-y-6">
          <h2 className="section-title text-2xl font-bold text-red-600 mb-4">Have a Question? Ask the Organizing Team</h2>
          <p>If you have any queries please let us know</p>
          <form className="question-form bg-white shadow-md rounded-lg p-6 space-y-4" onSubmit={handleSubmit}>
            {submissionStatus === 'success' && (
              <p className="submission-message text-green-600 font-semibold">Thank you! Your question has been submitted successfully.</p>
            )}
            {submissionStatus === 'error' && (
              <p className="submission-message text-red-600 font-semibold">Submission failed. Please try again.</p>
            )}

            <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Full Name"
                required
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email Address"
                required
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
              />
            </div>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject of Inquiry"
              required
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your detailed question here (Max ~1000 words)..."
              rows="5"
              required
              // --- CHANGE 1: Set the character limit (5000 characters) ---
              maxLength={MAX_MESSAGE_LENGTH} 
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
            ></textarea>
            
            {/* --- CHANGE 2: Display the character counter --- */}
            <p className="text-right text-sm text-gray-500">
              {messageLength} / {MAX_MESSAGE_LENGTH} characters
            </p>

            <button
              type="submit"
              className="submit-question-btn bg-red-500 text-white font-semibold px-6 py-3 rounded hover:bg-red-600 transition-colors flex items-center space-x-2"
            >
              <span>Submit Question</span>
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </section>

        {/* Section 3: Host Institute Details */}
        <section className="contact-section nodal-center space-y-6">
          <h2 className="section-title text-2xl font-bold text-red-600 mb-4">Host Institute (Nodal Center) Details</h2>
          <div className="contact-card info-card single-card bg-white shadow-md rounded-lg border-t-4 border-red-500 p-6 space-y-3">
            <h3 className="font-semibold text-lg">JSPM's Jaywantrao Sawant College of Engineering (JSCOE)</h3>
            <div className="detail-item">
              <strong>Address:</strong>
              <p>Survey No. 58, Indrayani Nagar, Handewadi Road, Hadapsar, Pune, Maharashtra - 411028</p>
            </div>
            <div className="detail-item">
              <strong>General Enquiries:</strong>
              <p>+91 020-26970886 / 87</p>
            </div>
            <div className="detail-item">
              <strong>Principal's Office:</strong>
              <p>principal.jscoe@jspm.edu.in</p>
            </div>
            <a
              href="https://jspmjscoe.edu.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-visit-site inline-block bg-yellow-400 text-red-500 font-semibold px-4 py-2 rounded hover:bg-yellow-500 transition-colors mt-2"
            >
              Visit Institute Website
            </a>
          </div>
        </section>
      </main>

      {/* Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default ContactUs;