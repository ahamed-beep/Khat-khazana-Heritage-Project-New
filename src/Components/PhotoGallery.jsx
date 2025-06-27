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

  const handleImageClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div>
      <Nax />

      <div className="bg-white py-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-heritage font-bold text-black mb-6">
            Heritage Photographs
          </h1>
          <h2 className="text-2xl md:text-3xl font-heritage font-medium text-black mb-6 max-w-3xl mx-auto">
            FREE Vintage Illustrations for your creative projects!
          </h2>
          <p className="text-[#1a1a1a] text-[20px] leading-[1.8] tracking-wide mb-6 font-light max-w-3xl mx-auto">
            <strong className="font-semibold">
              The Heritage Library collects beautiful photographs from the past which are 100% free to use...
            </strong>
          </p>
        </div>
      </div>

      <div className="w-full min-h-screen bg-white flex flex-col items-center px-4 relative">
        <div className="h-20 w-full" />

        {/* Search Controls */}
        <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full items-stretch border border-gray-200 max-w-4xl">
          <input
            type="text"
            placeholder="Search for a title"
            className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200 focus:outline-none w-full"
            value={localSearchTerm}
            onChange={e => setLocalSearchTerm(e.target.value)}
          />
          <select
            className="p-4 border-t md:border-t-0 md:border-l border-gray-200 w-full md:w-1/4 focus:outline-none"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
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
            className="p-4 border-t md:border-t-0 md:border-l border-gray-200 w-full md:w-1/4 focus:outline-none"
            value={selectedDecade}
            onChange={e => setSelectedDecade(e.target.value)}
          >
            <option value="">By Decade</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={1900 + i * 10}>{1900 + i * 10}</option>
            ))}
          </select>
        </div>

        {filteredData.length > 0 && (
          <p className="mt-6 text-lg font-medium text-gray-700">
            Showing <span className="font-bold">{filteredData.length}</span> photograph
            {filteredData.length > 1 ? 's' : ''}
            {selectedCategory && ` in “${selectedCategory.replace(/-/g, ' ')}”`}
          </p>
        )}

        {/* Fade-in Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${selectedDecade}-${localSearchTerm}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 w-full max-w-6xl"
          >
            {loading && approvedPhotographs.length === 0 ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-lg" />
              ))
            ) : filteredData.length === 0 ? (
              <p className="text-center col-span-full text-gray-500">No results found.</p>
            ) : (
              filteredData.map(item => (
                <div
                  key={item._id}
                  onClick={() => handleImageClick(item._id)}
                  className="group flex flex-col items-center text-center bg-white hover:bg-[#f4f1ec] shadow-md hover:shadow-xl transition-all duration-300 p-4 rounded-lg cursor-pointer"
                >
                  <div className="text-md italic font-semibold mb-3">
                    <hr className="my-3 border-t-4 border-black w-full" />
                    {item.dateimage}
                    <hr className="my-3 border-t-2 border-black w-full" />
                  </div>
                  <h2 className="text-3xl text-[#e75b1e] font-bold mb-4 leading-snug group-hover:text-[#003366] transition-colors duration-300">
                    {item.title}
                  </h2>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full border-4 border-black transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

export default PhotoGallery;
