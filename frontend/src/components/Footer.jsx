import React from 'react';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiExternalLink,
  FiGlobe,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Quick Links
const QUICK_LINKS = [
  { name: 'Home', to: '/' },
  { name: 'About Hackathon', to: '/about' },
  { name: 'Guidelines', to: '/guidelines' },
  { name: 'FAQs', to: '/faqs' },
  { name: 'Contact Us', to: '/contact' },
];

const Footer = () => {
  return (
    <footer className="w-full bg-red-900 text-white mt-12 pt-10 pb-6 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Head Office */}
          <div>
            <h4 className="footer-title">
              <FiMapPin className="footer-icon" />
              Head Office (Tathawade)
            </h4>

            <p className="text-sm mb-3">
              Jayawant Shikshan Prasarak Mandal, Survey No. 80,
              Pune–Mumbai Bypass Highway, Tathawade, Pune 411033
            </p>

            <div className="space-y-1 text-sm">
              <div className="flex items-center">
                <FiPhone className="footer-sub-icon" />
                <span className="font-semibold mr-1">Tel:</span>
                (020) 22933423, 22934344
              </div>
              <div className="flex items-center">
                <FiPhone className="footer-sub-icon" />
                <span className="font-semibold mr-1">Tel/Fax:</span>
                (020) 22933424
              </div>
            </div>
          </div>

          {/* Corporate Office */}
          <div>
            <h4 className="footer-title">
              <FiMapPin className="footer-icon" />
              Corporate Office (Katraj)
            </h4>

            <p className="text-sm mb-3">
              JSPM, Sawant Corner, S.No. 84/2E/1/5, 3rd Floor,
              Katraj Chowk, Pune 411046
            </p>

            <div className="space-y-1 text-sm">
              <div className="flex items-center">
                <FiPhone className="footer-sub-icon" />
                <span className="font-semibold mr-1">Tel:</span>
                020-24317383 / 84 / 85
              </div>
              <div className="flex items-center">
                <FiPhone className="footer-sub-icon" />
                <span className="font-semibold mr-1">Tel/Fax:</span>
                020-24317389
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="footer-title">
              <FiExternalLink className="footer-icon" />
              Quick Links
            </h4>

            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-red-100 hover:text-orange-400 transition-colors duration-200 block"
                  >
                    &gt; {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-title">
              <FiMail className="footer-icon" />
              Contact Email
            </h4>

            <p className="text-sm mb-4">
              For general inquiries regarding JSPM Hackathon and institutes.
            </p>

            <a
              href="mailto:info@jspm.edu.in"
              className="text-lg font-semibold text-orange-400 hover:text-orange-500 transition-colors duration-200"
            >
              info@jspm.edu.in
            </a>

            <div className="mt-6">
              <h4 className="footer-title mb-2">
                <FiGlobe className="footer-icon" />
                Website
              </h4>

              <a
                href="https://jspm.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-100 hover:text-orange-400 transition-colors duration-200 text-sm"
              >
                jspm.edu.in
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-red-700 pt-6 text-center text-sm text-red-300">
          <p>
            &copy; {new Date().getFullYear()} Jayawant Shikshan Prasarak Mandal
            (JSPM). All Rights Reserved.
          </p>
          <p className="mt-1 text-xs">
            Maintained by JSPM’s Digital Content Development Cell.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
