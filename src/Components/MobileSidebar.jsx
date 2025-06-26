import React from "react";
import { Link } from "react-router";
import { HomeIcon } from "@heroicons/react/24/solid";

const MobileSidebar = ({ isOpen, onClose }) => {
  const otherLinks = [
    { label: "ABOUT US", to: "/about" },
    { label: "PHOTO GALLERY", to: "/photo" },
    { label: "SUBMISSION", to: "/sub" },
    { label: "SUPPORT", to: "/supp" },
    { label: "CONTACT US", to: "/contact" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-[#f4f1ec] z-50 border-r border-[#d3c7b2] transform transition-transform duration-300 ease-in-out font-serif ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full overflow-y-auto p-5 space-y-6">
        <button
          onClick={onClose}
          className="w-full text-right text-[#6a5e4e] hover:text-black text-lg"
        >
          ❌ Close
        </button>

        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-2 text-[#3b2f22] hover:text-black"
        >
          <HomeIcon className="h-5 w-5 text-[#7a6e5a]" />
          <span className="text-base font-semibold tracking-wide">HOME</span>
        </Link>

        <div className="space-y-2 pt-2 border-t border-[#d8cbb4]">
          {otherLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={onClose}
              className="block text-sm font-medium text-[#5c5143] hover:text-black tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </div>

        
        <div className="pt-4 border-t border-[#d8cbb4] space-y-2">
          <Link to={'/letters'} className="text-sm font-bold text-[#3b2f22] uppercase tracking-widest">
            LETTERS
          </Link>
        
        </div>
           <div className="pt-4 border-t border-[#d8cbb4] space-y-2">
          <Link to={'/photo'} className="text-sm font-bold text-[#3b2f22] uppercase tracking-widest">
            Photographs
          </Link>
        
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
