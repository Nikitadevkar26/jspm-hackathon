import React from 'react';
// The 'useNavigate' and the 'handleOptionSelect' function are no longer needed
// if you are using Link components for navigation.
import { Link } from "react-router-dom";

function OptionModal({ onClose }) {

  // Removed: const navigate = useNavigate();
  // Removed: const handleOptionSelect = (path) => { ... }

  return (
    // Basic modal structure (you'd style this with CSS/Tailwind)
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Choose Your Registration Type</h2>

        {/* Option 1: Register Team (Your existing change) */}
        <Link to="/teamRegistration">
          <button
            // *** ADDED: Close the modal when this button is clicked ***
            onClick={onClose}
            className="w-full mb-4 p-4 text-left border border-blue-500 rounded-lg hover:bg-blue-50 transition duration-150"
          >
            <p className="font-semibold text-blue-600">1. Register your Team! 🧑‍🤝‍🧑</p>
            <p className="text-sm text-gray-500">Sign up your group to participate in the event.</p>
          </button>
        </Link>

        {/* Option 2: Register Evaluator (Updated to match Option 1) */}
        <Link to="/evaluatorRegistration">
          <button
            // *** ADDED: Close the modal when this button is clicked ***
            onClick={onClose}
            className="w-full p-4 text-left border border-green-500 rounded-lg hover:bg-green-50 transition duration-150"
          >
            <p className="font-semibold text-green-600">2. Register as an Evaluator! 🧐</p>
            <p className="text-sm text-gray-500">Apply to be a judge and assess the teams.</p>
          </button>
        </Link>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default OptionModal;