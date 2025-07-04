import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import Nax from './Nax';
import Footer from './Footer';
import { fetchApprovedPhotographs } from './Redux/submission';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '../SearchContext';

const PhotoGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { searchTerm: globalSearchTerm } = useSearch();

  const approvedPhotographs = useSelector(state => state.submmission.approvedPhotographs);
  const loading = useSelector(state => state.submmission.loading);

  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDecade, setSelectedDecade] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  useEffect(() => {
    dispatch(fetchApprovedPhotographs());
  }, [dispatch]);

  const getDecadeFromDate = (dateString) => {
    if (!dateString) return '';
    const year = parseInt(dateString.split('-')[0]);
    return `${Math.floor(year / 10) * 10}`;
  };

  const filteredData = useMemo(() => {
    let data = approvedPhotographs || [];
    const searchTerm = location.pathname === '/search' ? globalSearchTerm : localSearchTerm;

    if (selectedCategory) {
      data = data.filter(item => item.category === selectedCategory);
    }

    if (selectedDecade) {
      data = data.filter(item => getDecadeFromDate(item.dateimage) === selectedDecade);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      data = data.filter(
        item =>
          item.title?.toLowerCase().includes(term) ||
          item.story?.toLowerCase().includes(term)
      );
    }

    return data;
  }, [
    approvedPhotographs,
    globalSearchTerm,
    localSearchTerm,
    selectedCategory,
    selectedDecade,
    location.pathname,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [localSearchTerm, selectedCategory, selectedDecade, globalSearchTerm]);

  const handleImageClick = (id) => {
    navigate(`/details/${id}`);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="bg-[#fdf8f3] text-[#333333] font-serif">
      <Nax />

      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/Images/compass.jpg')`,
        }}
        className="text-center flex justify-start items-center border-b border-[#e7ddd0] bg-[#fcf5eb] h-[400px] md:h-[500px] bg-cover bg-center"
      >
        <div className="ml-6 md:ml-20 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-widest text-white drop-shadow-sm">
            Photo Gallery
          </h1>
          <p className="text-white mt-2 max-w-md md:max-w-lg">
            Memory traced across time in delicate letters, holding love, stories, and distant sentiments alive.
          </p>
        </div>
      </motion.section>

      {/* Category Tags */}
      <div className="max-w-7xl mx-auto mt-10 mb-8 text-center px-4">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {['Love Letters', 'War Political', 'Family', 'Travel', 'Moviecards'].map(tag => {
            const value = tag.toLowerCase().replace(/ /g, '-');
            return (
              <button
                key={tag}
                onClick={() => {
                  setSelectedCategory(value);
                }}
                className="px-4 py-2 text-xs md:text-sm font-medium text-[#5a3921] bg-[#f7ede2] hover:bg-[#e7ddd0] border border-[#decfbf] rounded-full shadow-sm transition duration-200"
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-[#fdf8f3] rounded-2xl">
          <input
            type="text"
            placeholder="Search title or story..."
            className="col-span-1 md:col-span-2 px-4 py-2 border border-[#1f1f1f] rounded-lg bg-white text-gray-900 placeholder:text-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#b75512]"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
          />

          <select
            className="px-4 py-2 rounded-lg border border-[#60584c] text-gray-800 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-[#b75512]"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">By Category</option>
            <option value="love-letters">Love Letters</option>
            <option value="family">Family</option>
            <option value="war-political-turmoil">War Political</option>
            <option value="travel">Travel</option>
            <option value="dairypages-newspaper">Dairy News</option>
            <option value="cards-postcards">Cards Postcard</option>
            <option value="moviecards">Moviecards</option>
            <option value="calenders">Calender</option>
            <option value="letter-by-famous-personalities">Famous letters</option>
            <option value="others">Others</option>
          </select>

          <select
            className="px-4 py-2 rounded-lg border border-[#60584c] text-gray-800 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-[#b75512]"
            value={selectedDecade}
            onChange={(e) => setSelectedDecade(e.target.value)}
          >
            <option value="">By Decade</option>
            {[...Array(12)].map((_, i) => {
              const decade = 1900 + i * 10;
              return <option key={decade}>{decade}</option>;
            })}
          </select>
        </div>
      </div>

      {/* Result Count */}
      {filteredData.length > 0 && (
        <div className="text-center mt-6 text-gray-600 text-sm md:text-lg">
          Showing <strong>{filteredData.length}</strong> result{filteredData.length > 1 ? 's' : ''}
          {selectedCategory && ` in “${selectedCategory.replace(/-/g, ' ')}”`}
        </div>
      )}

      {/* Gallery Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedCategory}-${selectedDecade}-${localSearchTerm}-${currentPage}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="columns-1 sm:columns-2 lg:columns-3 max-w-6xl mx-auto px-4 py-10 space-y-4"
        >
          {loading && approvedPhotographs.length === 0 ? (
            Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg w-full" />
              ))
          ) : filteredData.length === 0 ? (
            <p className="text-center col-span-full text-gray-500 w-full">No results found.</p>
          ) : (
            filteredData
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleImageClick(item._id)}
                  className="mb-4 break-inside-avoid cursor-pointer group overflow-hidden shadow hover:shadow-xl transition-shadow duration-300 bg-white"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <h2 className="text-white text-lg font-semibold">{item.title}</h2>
                      <p className="text-sm text-gray-300 italic">{item.dateimage}</p>
                    </div>
                  </div>
                </div>
              ))
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-10 mb-10 gap-2 px-4">
          <button
            className="px-4 py-2 rounded border bg-white text-[#e75b1e] hover:bg-[#e7ddd0]"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            Previous
          </button>

          {(() => {
            const start = Math.max(currentPage - 1, 1);
            const end = Math.min(start + 2, totalPages);
            const visiblePages = [];

            for (let i = start; i <= end; i++) {
              visiblePages.push(i);
            }

            return visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded border ${
                  currentPage === page
                    ? 'bg-[#e75b1e] text-white'
                    : 'bg-white text-[#e75b1e] hover:bg-[#e7ddd0]'
                }`}
              >
                {page}
              </button>
            ));
          })()}

          <button
            className="px-4 py-2 rounded border bg-white text-[#e75b1e] hover:bg-[#e7ddd0]"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PhotoGallery;
