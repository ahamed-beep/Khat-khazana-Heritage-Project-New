// LettersPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Nax from './Components/Nax';
import Footer from './Components/Footer';
import { fetchApprovedLetters } from './Components/Redux/submission';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ITEMS_PER_PAGE = 18;
const MAX_VISIBLE_PAGES = 3;

const LettersPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const approvedLetters = useSelector(state => state.submmission.approvedLetters);
  const loading = useSelector(state => state.submmission.loading);

  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDecade, setSelectedDecade] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchApprovedLetters());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
    handleSearch();
  }, [approvedLetters, localSearchTerm, selectedCategory, selectedDecade]);

  const getDecadeFromDate = (dateString) => {
    if (!dateString) return '';
    const year = parseInt(dateString.split('-')[0]);
    return `${Math.floor(year / 10) * 10}`;
  };

  const handleSearch = () => {
    let results = approvedLetters || [];
    if (location.pathname !== '/search') {
      if (selectedCategory) {
        results = results.filter(item => item.category === selectedCategory);
      }
      if (selectedDecade) {
        results = results.filter(item => getDecadeFromDate(item.dateimage) === selectedDecade);
      }
      if (localSearchTerm) {
        results = results.filter(item =>
          item.title?.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
          item.story?.toLowerCase().includes(localSearchTerm.toLowerCase())
        );
      }
    }
    setFilteredData(results);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const getVisiblePageNumbers = () => {
    let start = Math.max(currentPage - 1, 1);
    let end = start + MAX_VISIBLE_PAGES - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - MAX_VISIBLE_PAGES + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="bg-[#fdf8f3] text-[#333333] font-serif">
      <Nax />

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center bg-[url(/Images/feather.jpg)] flex justify-end items-center  border-b bg-no-repeat object-cover object-center  border-[#e7ddd0] bg-[#fcf5eb]  h-[500px]  bg-cover bg-center"
      >
        <div className='ml-20 mx-15 '>

        <h1 className="  text-6xl  font-extrabold uppercase tracking-widest text-black drop-shadow-sm">
          Letter Gallery
        </h1>

        <p className='  max-w-[600px]'> Memory traced across time in delicate letters, holding love, stories, and distant sentiments alive. </p>
        </div>
        
      </motion.section>

      <section className="py-16 px-4">
        {/* Filters */}
        <div className="max-w-7xl mx-auto mb-10 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            {['Love Letters', 'War Political', 'Family', 'Travel', 'Moviecards'].map(tag => {
              const value = tag.toLowerCase().replace(/ /g, '-');
              return (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedCategory(value);
                    handleSearch();
                  }}
                  className="px-5 py-2 bg-[#fcf5eb] hover:bg-[#e7ddd0] text-[#333333] rounded-full text-sm border border-[#e7ddd0] shadow-sm"
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>

      <div className="max-w-7xl mx-auto mb-12">
  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-[#fdf8f3] p-6 rounded-2xl ">
    <input
      type="text"
      placeholder="Search title or story..."
      className="col-span-2 px-4 py-3 rounded-xl border border-[#c5b7a3] bg-white text-gray-900 placeholder:text-[#60584c] placeholder:italic font-serif shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b75512]"
      value={localSearchTerm}
      onChange={(e) => setLocalSearchTerm(e.target.value)}
    />
    
    <select
      className="px-4 py-3 rounded-xl border border-[#c5b7a3] text-gray-800 bg-white font-serif shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b75512]"
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
      <option value="letter-by-famous-personalities">Famous Letters</option>
      <option value="others">Others</option>
    </select>

    <select
      className="px-4 py-3 rounded-xl border border-[#c5b7a3] text-gray-800 bg-white font-serif shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b75512]"
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


        {/* Letters Grid
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${selectedDecade}-${localSearchTerm}-${currentPage}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-10 max-w-7xl mx-auto"
          >
            {loading ? (
              <p className="col-span-full text-center text-gray-500">Loading...</p>
            ) : paginatedData.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">No results found.</p>
            ) : (
              paginatedData.map((item) => (
                <div
                  key={item._id}
                  className="relative group bg-[#fcf5eb]   p-4 flex flex-col hover:shadow-md transition-all"
                >
                     <h3 className="text-lg font-semibold leading-snug line-clamp-2 my-1 mx-2  text-black drop-shadow-md">{item.title}</h3>
                  <div className="relative w-full h-64 mb-4 overflow-hidden rounded-md">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover border border-[#e7ddd0] rounded-md"
                    />
                    <div className="absolute bottom-0 left-0 w-full px-4 py-3 bg-gradient-to-t from-black/60 to-transparent text-white z-10 rounded-b-md">
                      <p className="text-md font-semibold italic tracking-wide  text-white">{item.dateimage}</p>
                   
                    </div>
                    <Link
                      to={`/details/${item._id}`}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                    >
                      <span className="text-white bg-[#e75b1e] px-4 py-2 rounded shadow font-bold hover:bg-[#c44c14]">
                        Read More
                      </span>
                    </Link>
                  </div>
                  <p className="text-[#555555] text-justify line-clamp-3">{item.story}</p>
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence> */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-4 justify-items-center">
        <AnimatePresence>
          {paginatedData.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.5 }}
              className="bg-[#fcf5eb] shadow-md rounded-xl overflow-hidden w-full max-w-xl border border-[#e7ddd0]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[320px] object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold font-serif text-[#333333] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs uppercase font-semibold text-[#e75b1e] tracking-wider mb-2">
                  {item.dateimage}
                </p>
                <p className="text-[#555555] text-sm mb-4 line-clamp-3">{item.story}</p>
                <Link              to={`/details/${item._id}`}>
                  <button className="border border-[#e75b1e] text-[#e75b1e] px-4 py-2 rounded hover:bg-[#fde7db] transition flex items-center text-sm">
                    Continue Reading
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            <button
              className="px-4 py-2 rounded border bg-white text-[#e75b1e] hover:bg-[#e7ddd0]"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              Previous
            </button>

            {getVisiblePageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded border ${currentPage === page ? 'bg-[#e75b1e] text-white' : 'bg-white text-[#e75b1e] hover:bg-[#e7ddd0]'}`}
              >
                {page}
              </button>
            ))}

            <button
              className="px-4 py-2 rounded border bg-white text-[#e75b1e] hover:bg-[#e7ddd0]"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              Next
            </button>
          </div>
        )}
      </section>

      <section className="py-12 bg-[#fcf5eb] border-t border-[#e7ddd0] text-center">
        <h4 className="text-2xl font-bold mb-2 uppercase tracking-wide">Want more historic letters?</h4>
        <p className="mb-4 text-[#555555]">Join our archive mailing list and never miss an update.</p>
        <div className="flex justify-center items-center gap-2 flex-wrap max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="px-4 py-2 border border-[#e7ddd0] rounded-md"
          />
          <button className="bg-[#e75b1e] text-white px-4 py-2 rounded-md hover:bg-[#c44c14] transition">
            Subscribe
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LettersPage;