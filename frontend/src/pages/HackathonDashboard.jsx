import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const JSPM_LOGO_URL =
    'https://akm-img-a-in.tosshub.com/sites/resources/campus/prod/img/logo/2023/10/ylogo254251400879.jpeg';

// Assuming you fixed the path in your local environment. 
const HACKATHON_FLYER_IMAGE = '/image_fe82e8.jpg';
const Flyer2 = '/Flyer2.jpeg'; // New image constant for Flyer 2
const Flyer3 = '/Flyer3.jpeg';
const mockStats = [
    { label: 'Participating Students', value: '13,91,884' },
    { label: 'Participating Institutes', value: '6497' },
    { label: 'Total Problem Statements', value: '2877' },
    { label: 'Alumni Network', value: '12800+' },
];

const mockThemes = [
    'Agriculture, FoodTech & Rural Development',
    'Smart Automation',
    'Smart Vehicles',
    'MedTech/BioTech/HealthTech',
    'Social Good/Accessibility',
    'Transportation & Logistics',
    'Defense / Security',
    'Space Technology',
    'Heritage & Culture',
    'Clean & Green Technology (Renewable Energy, Sustainability)',
    'Smart Education',
    'Games & Toys',
    'Fintech/Blockchain/Cybersecurity',
    'Robotics & Drones',
    'Disaster Management',
    'Tourism & Hospitality',
    'Miscellaneous',
];

// Custom light background and border colors for themes
const themeColors = [
    { bg: 'bg-indigo-50', border: 'border-indigo-300', text: 'text-indigo-700' },
    { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700' },
    { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-700' },
    { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700' },
    { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700' },
];

// Note: Ensure your first flyer entry corresponds to your image
const mockFlyers = [
    { title: 'Hackathon 2025 Grand Flyer', url: HACKATHON_FLYER_IMAGE },
    { title: 'Flyer 2', url: Flyer2 }, // Uses the new constant
    { title: "Flyer 3", url: Flyer3 },
];

const mockEvents = [
    {
        id: 1,
        title: 'Grand Finale Venue Confirmed',
        date: 'Oct 25, 2025',
        type: 'Venue',
        color: 'bg-red-100 text-red-800',
    },
    // ... (rest of mockEvents) ...
    {
        id: 2,
        title: 'Sports Competition Finals Schedule',
        date: 'Oct 27, 2025',
        type: 'Sports',
        color: 'bg-blue-100 text-blue-800',
    },
    {
        id: 3,
        title: 'Mandatory Team Check-in at 9 AM',
        date: 'Nov 2, 2025',
        type: 'Urgent',
        color: 'bg-green-100 text-green-800',
    },
    {
        id: 4,
        title: 'Project Submission Deadline Extension',
        date: 'Nov 8, 2025',
        type: 'Deadline',
        color: 'bg-green-100 text-green-800',
    },
    {
        id: 5,
        title: 'Cultural Night Participation Form Open',
        date: 'Nov 15, 2025',
        type: 'Cultural',
        color: 'bg-purple-100 text-purple-800',
    },
    {
        id: 6,
        title: 'Alumni Mentorship Slots Available',
        date: 'Dec 1, 2025',
        type: 'Mentorship',
        color: 'bg-yellow-100 text-yellow-800',
    },
    {
        id: 7,
        title: 'Ideation Session RSVP Link',
        date: 'Dec 5, 2025',
        type: 'RSVP',
        color: 'bg-red-100 text-red-800',
    },
    {
        id: 8,
        title: 'Annual Day Celebrations Date Confirmed',
        date: 'Dec 15, 2025',
        type: 'Celebration',
        color: 'bg-purple-100 text-purple-800',
    },
];

const routeData = [
    {
        origin: "Shivajinagar Bus Stand, Pune",
        destination: "JSPM JSCOE Hadapsar",
        distance: "14.3 km",
        duration: "30 mins",
        url: "https://www.google.com/maps/dir/Shivajinagar+Bus+Stand+Road,+Narveer+Tanaji+Wadi,+Shivajinagar,+Pune,+Maharashtra,+India/JSPM+Group+Of+Institutes,+Hadapsar,+FWGP%2B24P,+Kumar+Pebble+Park+Road,+Satar+Nagar,+Hadapsar,+Autadwadi+Handewadi,+Maharashtra,+India/data=!4m14!4m13!1m5!1m1!19sChIJ6_gVpIbAwjsRQE3fpI3Knmo!2m2!1d73.84903469999999!2d18.5335213!1m5!1m1!19sChIJZUovjfXpwjsRvvhrgpxFCNw!2m2!1d73.93532549999999!2d18.4750942!3e0",
        summary: "Via NH 65",
    },
    {
        origin: "Swargate, Pune",
        destination: "JSPM JSCOE Hadapsar",
        distance: "11.5 km",
        duration: "24 mins",
        url: "https://www.google.com/maps/dir/Swargate,+Pune,+Maharashtra,+India/JSPM+Group+Of+Institutes,+Hadapsar,+FWGP%2B24P,+Kumar+Pebble+Park+Road,+Satar+Nagar,+Hadapsar,+Autadwadi+Handewadi,+Maharashtra,+India/data=!4m14!4m13!1m5!1m1!19sChIJxRgZJxTAwjsRP01JDD_mPPo!2m2!1d73.8635912!2d18.5018322!1m5!1m1!19sChIJZUovjfXpwjsRvvhrgpxFCNw!2m2!1d73.93532549999999!2d18.4750942!3e0",
        summary: "Via NH 65",
    },
];

const NoticeAndAnnouncements = ({ events }) => (
    <div className="bg-white rounded-lg shadow-xl p-4 border border-gray-200 lg:sticky lg:top-4">
        <h3 className="text-xl font-bold text-red-600 mb-4 border-b pb-2">
            Important Notices 📢
        </h3>
        <div className="h-[450px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {events.map((event) => (
                <div
                    key={event.id}
                    className="p-3 border-l-4 border-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors shadow-sm"
                >
                    <p className="font-semibold text-gray-800">{event.title}</p>
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-600">{event.date}</span>
                        <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${event.color}`}
                        >
                            {event.type}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// UPDATED: Carousel component for auto-scrolling and object-contain
const Carousel = ({ items, imageSource }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = items.length;

    useEffect(() => {
        // Set up the automatic transition every 3000ms (3 seconds)
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % totalSlides);
        }, 3000);

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [totalSlides]);

    // Calculate the translation style
    const transformStyle = {
        transform: `translateX(-${activeIndex * 100}%)`,
        transition: 'transform 0.5s ease-in-out',
    };

    return (
        <div className="relative w-full overflow-hidden rounded-xl shadow-lg border border-gray-200">
            <div className="flex" style={transformStyle}>
                {items.map((item, i) => (
                    // Each slide takes the full width of the container (100%)
                    <div
                        key={i}
                        className="w-full flex-shrink-0" 
                        style={{ minWidth: '100%' }}
                    >
                        <div className="p-4 bg-white">
                            <h3 className="text-xl font-bold text-red-700 text-center mb-3">{item.title}</h3>
                            <div className="w-full h-[300px] rounded-lg overflow-hidden border-2 border-red-300 flex items-center justify-center">
                                {i === 0 && imageSource ? (
                                    // Use the actual image for the first slide (object-contain)
                                    <img 
                                        src={imageSource} 
                                        alt={item.title} 
                                        className="w-full h-full object-contain bg-white p-2" 
                                    />
                                ) : (
                                    // Use object-contain for all other slides as well
                                    <img 
                                        src={item.url} 
                                        alt={item.title} 
                                        className="w-full h-full object-contain bg-white p-2" 
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            activeIndex === index ? 'bg-red-600 scale-110' : 'bg-gray-300 hover:bg-red-300'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

const DistanceSection = ({ routes }) => (
    <section className="bg-white p-6 rounded-lg shadow-md mb-10 border-t-4 border-red-500">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
            Know the Distance: How to Reach JSPM JSCOE 🚗
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {routes.map((route, index) => (
                <div key={index} className="bg-red-50 border border-red-300 rounded-lg p-4 shadow-inner">
                    <h3 className="text-xl font-semibold text-red-700 mb-2">
                        {route.origin} → JSPM JSCOE
                    </h3>
                    <p className="text-gray-700 mb-3">
                        <strong>Distance:</strong> <span className="font-bold text-red-600">{route.distance}</span>
                        <br />
                        <strong>Approx. Driving Time:</strong> <span className="font-bold text-red-600">{route.duration}</span>
                        <br />
                        <strong>Route Summary:</strong> {route.summary}
                    </p>
                    <a
                        href={route.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-red-500 text-white text-sm px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                        View Full Route on Map
                    </a>
                </div>
            ))}
        </div>
        <div className="mt-6">
            <strong className="block mb-2 text-lg text-gray-800">Map Visualization:</strong>
            <p className="text-gray-700">
                The map below shows the driving route from 
                <strong>Shivajinagar Bus Stand, Pune</strong> and 
                <strong>Swargate, Pune</strong> to 
                <strong>JSPM Group Of Institutes, Hadapsar</strong>.
            </p>
        </div>
    </section>
);


const ContactUsSection = () => (
    <section className="bg-white rounded-lg shadow-md border-t-4 border-red-500 p-6 mb-10">
        <h2 className="text-2xl font-bold text-red-600 text-center mb-6">
            Contact Us 📞
        </h2>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1 bg-red-50 border border-red-300 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-900 border-b border-red-300 pb-2 mb-3">
                    JSPM's JSCOE (Reference Host)
                </h3>
                <p className="text-gray-700">
                    <strong>Address:</strong> Survey No. 58, Indrayani Nagar, Handewadi
                    Road, Hadapsar, Pune, Maharashtra - 411028
                </p>
                <p className="text-gray-700">
                    <strong>General Phone:</strong> 020-26970886
                </p>
                <p className="text-gray-700">
                    <strong>General Email:</strong> jscoe.admin@gmail.com
                </p>
            </div>
            <div className="flex-1 bg-red-50 border border-red-300 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-900 border-b border-red-300 pb-2 mb-3">
                    Hackathon Support / Admissions
                </h3>
                <p className="text-gray-700">
                    For Hackathon technical queries or Admission related questions:
                </p>
                <p className="text-gray-700">
                    <strong>Admission Contact:</strong> +91 9890570405
                </p>
                <p className="text-gray-700">
                    <strong>Admission Email:</strong> admission@jspmjscoe.edu.in
                </p>
            </div>
        </div>

        <a
            href="https://jspmjscoe.edu.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full max-w-xs mx-auto text-center bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition-colors"
        >
            Visit JSPM JSCOE Website
        </a>
    </section>
);


const HackathonDashboard = () => {
    
    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Section (Main Content) */}
                    <div className="w-full lg:w-3/4">
                        
                        {/* Flyer Carousel Section */}
                        <section className="mb-10 bg-white p-6 rounded-lg shadow-xl border-t-4 border-red-700">
                            <h2 className="text-2xl font-bold text-red-700 mb-4 border-b pb-2">
                                Current Flyers & Announcements
                            </h2>
                            <Carousel items={mockFlyers} imageSource={HACKATHON_FLYER_IMAGE} />
                        </section>

                        <section className="flex flex-col lg:flex-row gap-8 mb-10">
                            <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md p-6 border border-gray-200">
                                <h2 className="text-2xl font-bold text-red-600 border-b-2 border-red-400 pb-2 mb-4">
                                    What is the Hackathon?
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    This Hackathon is a premier nationwide initiative designed to
                                    engage students in solving some of the most pressing
                                    challenges faced in everyday life. Launched to foster a
                                    culture of innovation and practical problem-solving, it
                                    provides a dynamic platform for students to develop and
                                    showcase their creative solutions to real-world problems.
                                </p>
                                <Link
                                    to="/about"
                                    className="inline-block bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition-colors"
                                >
                                    Read More
                                </Link>
                            </div>

                            <div className="w-full lg:w-1/3 bg-red-50 rounded-lg shadow-md p-6 grid grid-cols-2 gap-4 border border-red-200">
                                <h3 className="col-span-2 text-xl font-semibold text-red-600 border-b border-red-300 pb-2 mb-2">
                                    Key Milestones
                                </h3>
                                {mockStats.map((stat, i) => (
                                    <div
                                        key={i}
                                        className="bg-white text-center border border-red-300 rounded-lg py-4 px-2 shadow-sm"
                                    >
                                        <span className="block text-2xl font-bold text-red-500">
                                            {stat.value}
                                        </span>
                                        <span className="text-sm text-gray-600">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* THEMES SECTION - Reverted to color-coded cards */}
                        <section className="bg-white p-6 rounded-lg shadow-md mb-10">
                            <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
                                Hackathon Themes 💡
                            </h2>
                            <div className="flex overflow-x-auto gap-6 pb-6 custom-scrollbar">
                                {mockThemes.map((theme, i) => {
                                    // Get color scheme based on index
                                    const color = themeColors[i % themeColors.length];

                                    return (
                                        <div
                                            key={i}
                                            // Dynamic classes for background, border, and hover state
                                            className={`min-w-[400px] h-[230px] ${color.bg} ${color.border} border rounded-xl p-6 flex flex-col justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex-shrink-0`}
                                        >
                                            <h4 className={`text-lg font-bold ${color.text} mb-3 text-center`}>
                                                {theme}
                                            </h4>
                                            <p className="text-gray-700 text-sm text-center leading-snug">
                                                Explore innovative and impactful ideas related to{' '}
                                                {theme.toLowerCase()}.
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            
                        </section>
                        
                        {/* Distance Information */}
                        <DistanceSection routes={routeData} />

                        {/* Contact Information */}
                        <ContactUsSection />
                    </div>

                    {/* Right Section (Notices and Announcements) */}
                    <div className="w-full lg:w-1/4">
                        <NoticeAndAnnouncements events={mockEvents} />
                    </div>
                </div>
            </main> 
        </div>
    );
};

export default HackathonDashboard;