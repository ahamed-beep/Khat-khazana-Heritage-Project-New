

import React from 'react';
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router'; // ✅ Corrected import
import Nax from './Nax';
import Footer from './Footer';

const HathiwalasPage = () => {
  return (
    <div className=" min-h-screen">
      <Nax />

      {/* Main Content Layout */}
      <div className="flex flex-col md:flex-row justify-center md:gap-10 mx-4 md:mx-auto max-w-6xl mb-10">
        {/* Left Column - Articles */}
      <div className="flex flex-col md:flex-row justify-center md:gap-10 mx-4 md:mx-auto max-w-6xl mb-10">
        {/* Left Column - Articles */}
        <div className="flex-1">
          {/* Article Card 1 */}
          <div className="mt-10 bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300">
            <h1 className="text-3xl font-bold text-[#374151] mb-4">
              The Forgotten Hathiwalas Of Surat
            </h1>
            <img
              src="https://c8.alamy.com/comp/J3T2KD/the-kashmiri-people-in-the-early-1900s-were-part-of-the-rich-cultural-J3T2KD.jpg"
              alt="The Forgotten Hathiwalas Of Surat"
              className="w-full h-auto mb-4 rounded-md transform transition-transform duration-500 hover:scale-105"
            />
            <p className="text-[#374151]">
              A few years ago, while I was trying to piece together my extended Surati Bohra family tree...
            </p>
            <Link to="/article/1">
              <button className="mt-4 border border-gray-300 px-4 py-2 rounded text-sm text-[#1F2937] hover:bg-[#FDE68A] transition flex items-center">
                Continue Reading <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Article Card 2 */}
          <div className="mt-10 bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300">
            <h1 className="text-3xl font-bold text-[#374151] mb-4">
              “I Am A Refugee In Love!”
            </h1>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Old_heritage_in_lahore_-_Lahore_Fort.jpg/1200px-Old_heritage_in_lahore_-_Lahore_Fort.jpg"
              alt="I Am A Refugee In Love"
              className="w-full h-auto mb-4 rounded-md transform transition-transform duration-500 hover:scale-105"
            />
            <p className="text-[#374151]">
              This is a photograph of my paternal grandparents Kewal Krishan Puri and Reva Puri...
            </p>
            <Link to="/article/2">
              <button className="mt-4 border border-gray-300 px-4 py-2 rounded text-sm text-[#1F2937] hover:bg-[#FDE68A] transition flex items-center">
                Continue Reading <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>

        {/* Right Sidebar */}
        <div className="hidden md:block w-full max-w-xs px-6 mt-12">
          <div className="mb-6">
            <h2 className="border-l-4 border-yellow-400 pl-3 uppercase font-semibold text-gray-700 tracking-wide">Guidelines</h2>
            <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2 text-sm">
              <li>Image rights belong to the guardian/s of the photograph.</li>
              <li>Text rights belong to Indian Memory Project / The Memory Company.</li>
              <li>No images or text can be used without permission.</li>
              <li>Unauthorized use will lead to legal action.</li>
              <li><span className="underline cursor-pointer text-blue-600">Email for Permissions</span></li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="border-l-4 border-yellow-400 pl-3 uppercase font-semibold text-gray-700 tracking-wide">Subjects</h2>
            <select className="mt-2 w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-700">
              <option>Select Category</option>
            </select>
          </div>

          <div className="border-l-4 border-yellow-400 pl-3 mb-4">
            <h2 className="uppercase font-bold text-[11px] tracking-wider text-gray-700">Popular Tags</h2>
          </div>
          <div className="flex flex-wrap gap-2 text-yellow-800 text-sm">
            <span>1920</span><span>1930</span><span className="font-bold text-base">1940</span>
            <span>India</span><span className="font-semibold">Pakistan</span><span>Partition</span>
          </div>

          <div className="mt-10">
            <hr className="border-black mb-4" />
            <h2 className="border-l-4 border-yellow-400 pl-2 mb-3 uppercase font-bold text-[11px] tracking-wider text-gray-700">Interactive Timeline</h2>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzwDna5CVJMDpa0ldQubXRosmUZi8k6Kw-dA&s" alt="Timeline" className="w-full h-auto mb-6 rounded" />
            <hr className="border-black mb-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Photograph_of_an_Indian_miniature_painting_depicting_Aram_Shah_of_the_Mamluk_Sultanate%2C_published_in_%27Tawarikh-i-Ghuri%27_by_Munshi_Bulaqi_Das_Sahib_%281881%29.jpg" alt="Family Story" className="w-full h-auto rounded" />
          </div>
        </div>
      </div>

      {/* Promote Products Section */}
      <div className="mx-4 mb-10 md:mx-auto max-w-6xl">
        <div className="bg-[#FFFBEA] border-l-4 border-yellow-500 text-yellow-900 p-4 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Text */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1 text-[#374151]">Discover More!</h3>
              <p className="text-sm mb-3 text-[#374151]">
                Explore our exclusive collection of products that tell stories from the past.
              </p>
              <Link to="/productlist">
                <button className="inline-flex items-center px-4 py-2 bg-[#FCD34D] text-gray-800 rounded hover:bg-[#FDE68A] transition">
                  Go to Products <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </Link>
            </div>
            {/* Image */}
            <img
              src="https://i0.wp.com/lettersofnote.com/wp-content/uploads/2023/03/hem1.jpeg?resize=768%2C1086&ssl=1"
              alt="Featured Product"
              className="w-full md:w-48 h-48 object-cover rounded transform transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
     <Footer/>
    </div>
  );
};

export default HathiwalasPage;