import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OptionModal from './OptionModal';

// JSPM JSCOE Logo
const JSPM_LOGO_URL =
  'https://akm-img-a-in.tosshub.com/sites/resources/campus/prod/img/logo/2023/10/ylogo254251400879.jpeg';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <nav className="bg-red-500 text-white shadow-md px-10 py-3 flex justify-between items-center">
      
      {/* Logo */}
      <div className="flex items-center font-bold text-xl">
        <img
          src={JSPM_LOGO_URL}
          alt="JSPM JSCOE Logo"
          className="h-10 w-10 mr-4 rounded-full border-2 border-white object-cover"
        />
        Hackathon 2025
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-4">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/about" className="nav-link">About Hackathon</Link></li>
        <li><Link to="/guidelines" className="nav-link">Guidelines</Link></li>
        <li><Link to="/evaluatorapp" className="nav-link">Evaluator</Link></li>
        <li><Link to="/faqs" className="nav-link">FAQs</Link></li>
        <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
      </ul>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Link
          to="/login"
          className="px-4 py-2 rounded font-semibold bg-white text-red-500 hover:bg-gray-100 transition-colors duration-300"
        >
          Login
        </Link>

        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 rounded font-semibold bg-yellow-400 text-red-500 hover:bg-yellow-500 transition-colors duration-300"
        >
          Registration
        </button>

        {isModalOpen && <OptionModal onClose={closeModal} />}
      </div>
    </nav>
  );
};

export default Navbar;

