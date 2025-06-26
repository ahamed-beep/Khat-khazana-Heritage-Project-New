import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  Bars3Icon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation, useNavigate } from "react-router";
import MobileSidebar from "./MobileSidebar";

const Nax = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownState, setDropdownState] = useState({ letters: false });
  const [searchError, setSearchError] = useState("");

  const toggleDropdown = (key) => {
    setDropdownState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const validateSearchTerm = (term) => {
    if (term.trim().length < 2) {
      return "Search term must be at least 2 characters";
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(term)) {
      return "Only letters and numbers allowed";
    }
    return "";
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      const error = validateSearchTerm(searchTerm);
      if (error) {
        setSearchError(error);
        return;
      }
      
      const q = searchTerm.trim().toLowerCase();
      let searchQuery = q;
      
      // Map common search terms to proper categories
      if (q.includes("letter")) {
        searchQuery = "letters";
      } else if (q.includes("photo") || q.includes("image")) {
        searchQuery = "photographs";
      } else if (q.includes("product") || q.includes("shop")) {
        searchQuery = "products";
      }

      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchError("");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchError("");
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setShowSearch(false);
    setSearchError("");
  };

  const navLinks = [
    { label: "ABOUT US", to: "/about" },
    { label: "LETTERS", to: "/letters" },
    { label: "PHOTOGRAPHS", to: "/photo" },
    { label: "SUBMISSION", to: "/sub" },
    { label: "SUPPORT", to: "/support" },
    { label: "CONTACT US", to: "/contact" },
  ];

  return (
    <>
      <div className="w-full text-center py-4 bg-white shadow-sm">
        <h1 className="text-3xl font-serif font-semibold tracking-widest uppercase text-gray-800">
          KHAT KHAZANA HERITAGE PROJECT
        </h1>
      </div>

<nav className="sticky top-0 w-full bg-white px-4 py-3 relative border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto">
          {/* Mobile View */}
          <div className="flex justify-between items-center md:hidden">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
              className="p-1"
            >
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            </button>

            {showSearch ? (
              <div className="flex-1 mx-2 relative">
                <div className="flex items-center gap-2 bg-white px-3 py-2 border border-gray-300 rounded-lg">
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search letters, photos..."
                    className="text-sm w-full outline-none bg-white"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchSubmit}
                  />
                  
                  <button 
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>
                {searchError && (
                  <p className="absolute top-full left-0 mt-1 text-xs text-red-500">
                    {searchError}
                  </p>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setShowSearch(true)}
                aria-label="Search"
                className="p-1"
              >
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
              </button>
            )}
          </div>

          {/* Desktop View */}
          <div className="hidden md:flex flex-col items-center">
            <div className="h-[1px] bg-gray-200 w-full mb-3" />

            <div className="flex items-center justify-between w-full">
                <div>

                <Link to="/" className="hover:text-gray-900">
                  <HomeIcon className="h-5 w-5 text-gray-700" />
                </Link>
                </div>
              <div className="flex items-center space-x-6">
              
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`text-sm font-medium px-1 py-2 transition-colors ${
                      location.pathname === link.to
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-700 hover:text-indigo-500"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="relative w-64">
                <div className="flex items-center bg-white px-3 py-2 border border-gray-300 rounded-lg">
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search letters, photos, products..."
                    className="text-sm w-full outline-none"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchSubmit}
                  />
                  {searchTerm && (
                    <button 
                      onClick={handleClearSearch}
                      aria-label="Clear search"
                    >
                      <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
                {searchError && (
                  <p className="absolute top-full left-0 mt-1 text-xs text-red-500">
                    {searchError}
                  </p>
                )}
              </div>
            </div>

            <div className="h-[1px] bg-gray-200 w-full mt-3" />
          </div>
        </div>

        <MobileSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          navLinks={navLinks}
          currentPath={location.pathname}
        />
      </nav>
    </>
  );
};

export default Nax;