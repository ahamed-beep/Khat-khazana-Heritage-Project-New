import React, { useState } from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const [isQuickLinksOpen, setQuickLinksOpen] = useState(false);
  const [isAboutOpen, setAboutOpen] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);

  const toggleQuickLinks = () => setQuickLinksOpen(!isQuickLinksOpen);
  const toggleAbout = () => setAboutOpen(!isAboutOpen);
  const toggleServices = () => setServicesOpen(!isServicesOpen);

  return (
    <footer className="w-full bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto md:grid md:grid-cols-4 md:gap-10 gap-6 text-left">
        {/* Logo & Socials */}
        <div>
          <img src="/Images/logo2.jpeg" alt="Logo" className="md:h-25 h-20 rounded-2xl mb-6" />
          <div className="flex mt-4 space-x-4">
            <a href="#"><FaFacebookF className="text-gray-300 hover:text-white transition" /></a>
            <a href="#"><FaTwitter className="text-gray-300 hover:text-white transition" /></a>
            <a href="#"><FaInstagram className="text-gray-300 hover:text-white transition" /></a>
            <a href="#"><FaLinkedinIn className="text-gray-300 hover:text-white transition" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-sm md:block mt-4">
          <h2
            onClick={toggleQuickLinks}
            className="font-semibold mb-2 md:mb-4 text-white cursor-pointer md:cursor-default select-none"
          >
            Quick Links
            <span className="inline-block ml-2 md:hidden">
              {isQuickLinksOpen ? "▲" : "▼"}
            </span>
          </h2>
          <div
            className={`md:block overflow-hidden transition-all duration-300 ease-in-out ${
              isQuickLinksOpen ? "max-h-96" : "max-h-0 md:max-h-full"
            }`}
          >
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link to="/sub" className="hover:text-white transition">Submissions</Link></li>
            </ul>
          </div>
        </div>

        {/* About Us */}
        <div className="text-sm md:block mt-5">
          <h2
            onClick={toggleAbout}
            className="font-semibold mb-2 md:mb-4 text-white cursor-pointer md:cursor-default select-none"
          >
            About Us
            <span className="inline-block ml-2 md:hidden">
              {isAboutOpen ? "▲" : "▼"}
            </span>
          </h2>
          <div
            className={`md:block overflow-hidden transition-all duration-300 ease-in-out ${
              isAboutOpen ? "max-h-96" : "max-h-0 md:max-h-full"
            }`}
          >
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@example.com</li>
              <li>Location: 123 Main St, City</li>
              <li>Phone: +123 456 7890</li>
              <li>Working Hours: Mon - Fri, 9am - 6pm</li>
            </ul>
          </div>
        </div>

        {/* Submissions (replacing Services) */}
        <div className="text-sm md:block mt-5">
          <h2
            onClick={toggleServices}
            className="font-semibold mb-2 md:mb-4 text-white cursor-pointer md:cursor-default select-none"
          >
            Submissions
            <span className="inline-block ml-2 md:hidden">
              {isServicesOpen ? "▲" : "▼"}
            </span>
          </h2>
          <div
            className={`md:block overflow-hidden transition-all duration-300 ease-in-out ${
              isServicesOpen ? "max-h-96" : "max-h-0 md:max-h-full"
            }`}
          >
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/submission" className="hover:text-white transition">Submit a Letter</Link></li>
              <li><Link to="/submission" className="hover:text-white transition">View Submissions</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-left text-sm text-gray-500 mt-8 border-t border-gray-800 pt-4 max-w-7xl mx-auto">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
