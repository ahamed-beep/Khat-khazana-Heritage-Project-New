import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import Nax from './Nax';
import Footer from './Footer';
import { fetchApprovedPhotographs } from './Redux/submission';
import { useSearch } from './SearchContext';

const PhotoGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { searchTerm: globalSearchTerm } = useSearch();
const [fadeIn, setFadeIn] = useState(false);
  const approvedPhotographs = useSelector(state => state.submmission.approvedPhotographs);
  const loading = useSelector(state => state.submmission.loading);

  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDecade, setSelectedDecade] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(fetchApprovedPhotographs());
  }, [dispatch]);

  useEffect(() => {
    handleSearch();
  }, [approvedPhotographs, localSearchTerm, globalSearchTerm, selectedCategory, selectedDecade]);

  const getDecadeFromDate = (dateString) => {
    if (!dateString) return '';
    const year = parseInt(dateString.split('-')[0]);
    return `${Math.floor(year / 10) * 10}`;
  };

  const handleSearch = () => {
    let results = approvedPhotographs || [];

    // Apply filters only if not on search results page
    if (location.pathname !== '/search') {
      if (selectedCategory) {
        results = results.filter(item => item.category === selectedCategory);
      }

      if (selectedDecade) {
        results = results.filter(item => {
          const decade = getDecadeFromDate(item.dateimage);
          return decade === selectedDecade;
        });
      }

      // Use local search term for gallery page, global for search page
      const effectiveSearchTerm = location.pathname === '/search' ? globalSearchTerm : localSearchTerm;
      if (effectiveSearchTerm) {
        results = results.filter(item =>
          item.title?.toLowerCase().includes(effectiveSearchTerm.toLowerCase()) ||
          item.story?.toLowerCase().includes(effectiveSearchTerm.toLowerCase())
        );
      }
    }

    setFilteredData(results);
  };

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
              The Heritage Library collects beautiful photographs from the past which are
              100% free to use...
            </strong>
          </p>
        </div>
      </div>

      {location.pathname !== '/search' && (
        <div className="w-full min-h-screen bg-white flex flex-col items-center px-4 relative">
          <div className="h-20 w-full" />

          {/* Search Section */}
          <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl items-center border border-gray-200">
            <input
              type="text"
              placeholder="Search for a title"
              className="flex-1 p-4 rounded-t-lg md:rounded-t-none md:rounded-l-lg border border-gray-200 focus:outline-none"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
            />
            <select
              className="p-4 border-t md:border-t-0 md:border-l border-gray-200 w-full md:w-1/4 focus:outline-none"
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
              className="p-4 border-t md:border-t-0 md:border-l border-gray-200 w-full md:w-1/4 focus:outline-none"
              value={selectedDecade}
              onChange={(e) => setSelectedDecade(e.target.value)}
            >
              <option value="">By Decade</option>
              <option>1900</option>
              <option>1910</option>
              <option>1920</option>
              <option>1930</option>
              <option>1940</option>
              <option>1950</option>
              <option>1960</option>
              <option>1970</option>
              <option>1980</option>
              <option>1990</option>
              <option>2000</option>
            </select>
            <button
              className="bg-orange-600 hover:bg-blue-600 text-white px-6 py-4 rounded-b-lg md:rounded-b-none md:rounded-r-lg w-full md:w-auto transition-all duration-300"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          {/* Filtered Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mt-10 w-full max-w-6xl">
            {loading ? (
              <p className="text-center col-span-full text-gray-500">Loading...</p>
            ) : filteredData.length === 0 ? (
              <p className="text-center col-span-full text-gray-500">No results found.</p>
            ) : (
              filteredData.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleImageClick(item._id)}
                  className="group flex flex-col items-center text-center hover:bg-[#f4f1ec] transition duration-300  cursor-pointer mb-10"
                >
                  <div className="text-md italic font-semibold mb-3">
                    <hr className="my-3 border-t-4 border-black w-full" />
                    {item.dateimage}
                    <hr className="my-3 border-t-2 border-black w-full" />
                  </div>
                 <h2 className="text-3xl text-[#e75b1e] font-bold mb-4 leading-snug group-hover:text-black transition">
  {item.title.slice(0, 18)}...
</h2>
<img
  src={item.image}
  alt={item.title}
  className="w-full border-4 border-black m-0 p-0"
/>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PhotoGallery;