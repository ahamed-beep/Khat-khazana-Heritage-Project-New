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
  const [searchError, setSearchError] = useState("");

  const validateSearchTerm = (term) => {
    if (term.trim().length < 2) return "Search term must be at least 2 characters";
    if (!/^[a-zA-Z0-9\s]+$/.test(term)) return "Only letters and numbers allowed";
    return "";
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      const error = validateSearchTerm(searchTerm);
      if (error) {
        setSearchError(error);
        return;
      }

      let q = searchTerm.trim().toLowerCase();
      let searchQuery = q;

      if (q.includes("letter")) searchQuery = "letters";
      else if (q.includes("photo") || q.includes("image")) searchQuery = "photographs";
      else if (q.includes("product") || q.includes("shop")) searchQuery = "products";

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
      {/* Top Logo/Header */}
      <div className="w-full text-center py-4 bg-white shadow-sm">
        <h1 className="text-3xl font-serif font-semibold tracking-widest uppercase text-gray-800">
          KHAT KHAZANA HERITAGE PROJECT
        </h1>
      </div>

      {/* Main Navigation */}
   <nav className="sticky top-0 w-full bg-white px-4 py-3 border-b border-gray-200 z-50">
  <div className="max-w-6xl mx-auto">
    {/* Search bar */}
    {showSearch ? (
      <div className="flex justify-center ">
        <div className="relative w-full md:w-[800px]">
          <div className="flex items-center     bg-white shadow-sm">
            <input
              type="text"
              autoFocus
              placeholder="Type then hit enter to search..."
              className="text-lg w-full outline-none font-serif bg-white text-gray-700"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
            />
            <button onClick={handleClearSearch} aria-label="Clear search">
              <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          {searchError && (
            <p className="text-xs text-red-500 mt-1">{searchError}</p>
          )}
        </div>
      </div>
    ) : (
      <div className="flex justify-center items-center flex-wrap gap-10 md:gap-16">
       <Link to="/" className="hover:text-gray-900 hidden md:block">
  <HomeIcon className="h-5 w-5 text-gray-700" />
</Link>


        <div className="hidden md:flex items-center gap-15">
          {navLinks.map((link) => {
            const isSupport = link.label === "SUPPORT";
            const isActive = location.pathname === link.to;

            const supportClass = isSupport
              ? "animate-pulse text-orange-600 font-extrabold"
              : isActive
              ? "text-black font-semibold"
              : "text-gray-700 hover:text-black";

            return (
              <Link
                key={link.label}
                to={link.to}
                className={`text-sm font-medium transition-all duration-300 ${supportClass}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

     {/* For large screens (unchanged) */}
<div className="hidden md:flex items-center space-x-4">
  <button onClick={() => setShowSearch(true)} aria-label="Search">
    <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
  </button>
</div>

{/* For small screens: Menu on left, Search on right */}
<div className="flex w-full justify-between items-center md:hidden mt-4 px-4">
  <button onClick={() => setIsSidebarOpen(true)} aria-label="Menu">
    <Bars3Icon className="h-6 w-6 text-gray-700" />
  </button>
  <button onClick={() => setShowSearch(true)} aria-label="Search">
    <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
  </button>
</div>


      </div>
    )}

    {/* Mobile Sidebar */}
    <MobileSidebar
      isOpen={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
      navLinks={navLinks}
      currentPath={location.pathname}
    />
  </div>
</nav>

    </>
  );
};

export default Nax;
