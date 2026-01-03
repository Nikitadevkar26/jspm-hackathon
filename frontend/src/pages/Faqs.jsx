import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---
const jscoeFaqs = [
    {
        id: 1,
        question: 'What is the theme/focus of the JSPM JSCOE Hackathon?',
        answer: 'Our hackathon focuses on "Smart Campus & Sustainable Pune Solutions." Teams are encouraged to develop solutions related to campus automation, local environmental challenges, smart governance, and infrastructure improvements within the Pune area.',
        category: 'General'
    },
    {
        id: 2,
        question: 'Who is eligible to participate in the JSPM JSCOE Hackathon?',
        answer: 'This hackathon is open to all students (UG, PG) currently enrolled in any AICTE/UGC-approved college across India. While we encourage students from JSCOE to participate, it is not mandatory.',
        category: 'Registration'
    },
    {
        id: 3,
        question: 'What is the required team size and composition?',
        answer: 'Teams must consist of a minimum of 4 members and a maximum of 6 members. Teams must nominate one team leader. It is mandatory for every team to include at least one female team member.',
        category: 'Registration'
    },
    {
        id: 4,
        question: 'Is there a registration fee?',
        answer: 'Yes, there is a nominal registration fee of ₹1,000 per team to cover the costs of food, infrastructure, and participation kits for the 36-hour event. Payment details will be provided upon initial idea submission.',
        category: 'Registration'
    },
    {
        id: 5,
        question: 'Will the hackathon be held online or offline?',
        answer: 'The JSPM JSCOE Hackathon Grand Finale will be held offline (in-person) at the JSCOE campus in Handewadi, Pune. Idea submission and initial screening will be conducted online.',
        category: 'Logistics'
    },
    {
        id: 6,
        question: 'What kind of support/mentorship will be provided?',
        answer: 'Each shortlisted team will be assigned a faculty mentor and will receive technical guidance from industry experts and senior faculty during the 36-hour hackathon. Power backup, high-speed Wi-Fi, and technical labs will be fully provided.',
        category: 'Logistics'
    },
    {
        id: 7,
        question: 'What is the total prize money?',
        answer: 'The total prize pool is ₹50,000, with cash prizes awarded to the top three teams and special category winners.',
        category: 'General'
    },
    {
        id: 8,
        question: 'Can we use pre-existing code or ideas?',
        answer: 'You may use existing open-source libraries and frameworks, but the core solution, implementation, and innovation must be developed primarily during the 36-hour grand finale. Plagiarism will lead to immediate disqualification.',
        category: 'General'
    }
];

// Accordion Item
const AccordionItem = ({ faq, isOpen, toggleItem }) => (
    <div className="faq-item border-b border-gray-200 last:border-b-0">
        <button
            className={`faq-question w-full text-left py-4 px-6 flex justify-between items-center font-medium text-red-600 hover:text-red-700 transition-colors ${isOpen ? 'font-bold' : ''}`}
            onClick={toggleItem}
        >
            {faq.question}
            <span className="faq-icon text-xl">{isOpen ? '−' : '+'}</span>
        </button>
        <div className={`faq-answer-container overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 py-2 px-6' : 'max-h-0'}`}>
            <p className="faq-answer text-gray-700">{faq.answer}</p>
        </div>
    </div>
);

const Faqs = () => {
    const [openId, setOpenId] = useState(null);

    const toggleItem = (id) => setOpenId(openId === id ? null : id);

    // Group FAQs by category
    const generalFaqs = jscoeFaqs.filter(faq => faq.category === 'General');
    const registrationFaqs = jscoeFaqs.filter(faq => faq.category === 'Registration');
    const logisticsFaqs = jscoeFaqs.filter(faq => faq.category === 'Logistics');

    return (
        <div className="faqs-page-layout bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="faqs-header text-red-800 shadow-md py-12 text-center">
                <h1 className="text-4xl font-bold">Frequently Asked Questions (FAQs) ❓</h1>
            </header>

            <main className="faqs-main-content container mx-auto px-6 py-12 space-y-12">
                <p className="faqs-intro text-gray-700">
                    Find answers to the most common questions regarding the JSPM JSCOE Hackathon 2025.
                </p>

                {/* General */}
                <section className="faq-category-section space-y-4">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">General Information</h2>
                    {generalFaqs.map(faq => (
                        <AccordionItem
                            key={faq.id}
                            faq={faq}
                            isOpen={openId === faq.id}
                            toggleItem={() => toggleItem(faq.id)}
                        />
                    ))}
                </section>

                {/* Registration */}
                <section className="faq-category-section space-y-4">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Registration & Team Formation</h2>
                    {registrationFaqs.map(faq => (
                        <AccordionItem
                            key={faq.id}
                            faq={faq}
                            isOpen={openId === faq.id}
                            toggleItem={() => toggleItem(faq.id)}
                        />
                    ))}
                </section>

                {/* Logistics */}
                <section className="faq-category-section space-y-4">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Logistics & Venue</h2>
                    {logisticsFaqs.map(faq => (
                        <AccordionItem
                            key={faq.id}
                            faq={faq}
                            isOpen={openId === faq.id}
                            toggleItem={() => toggleItem(faq.id)}
                        />
                    ))}
                </section>

                <div className="still-need-help text-center mt-8">
                    <p className="text-gray-700 mb-4">Still have questions? Reach out to our organizing committee.</p>
                    <Link
                        to="/contact"
                        className="contact-btn bg-yellow-400 text-red-600 font-semibold px-6 py-3 rounded hover:bg-yellow-500 hover:text-red-700 transition-colors"
                    >
                        Contact Support Team
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Faqs;
