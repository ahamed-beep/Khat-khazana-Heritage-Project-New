import React, { useState, useEffect } from "react";
import Nax from "./Nax";
import Footer from "./Footer";
import Sliderss from "./Slidery";
import { Link } from "react-router";

const timelineData = [
  {
    year: "1950",
    image: "https://southstreetseaportmuseum.org/wp-content/uploads/2024/11/1980.089.0003.c_interior-left_20241028-2048x1229.jpg",
    text: "The Pakistani/Kashmiri community began arriving in Leeds as young economic migrants.",
  },
  {
    year: "1960",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpImJYrhGb5Q-DCjWSmB0iKkmob-zLMU9ZdA&s",
    text: "These early settlers contributed significantly to the city’s economy and community.",
  },
  {
    year: "Mid 60s",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVoqwTS-QRSMQ0CTgsRBorjO0XShaIl6nYmQ&s",
    text: "Community institutions began to form, preserving heritage while adapting to modern life.",
  },
  {
    year: "1960",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP2jMdIpH1v-3KBJn9Waob7BZQsplj96_zRw&s",
    text: "These early settlers contributed significantly to the city’s economy and community.",
  },
  {
    year: "Mid 70s",
    image: "https://images.squarespace-cdn.com/content/v1/545a686fe4b059216c7cb8cc/1629424601418-OLKZHC9VABATUBVGZ678/deg_28.jpg",
    text: "Community institutions began to form, preserving heritage while adapting to modern life.",
  },
];

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 bg-white text-[#e75b1e] p-3 rounded-full shadow-md hover:bg-orange-100 transition-opacity duration-500 z-50 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      style={{ width: "48px", height: "48px" }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-6 h-6 mx-auto">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
};

const AboutUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? timelineData.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev === timelineData.length - 1 ? 0 : prev + 1));

  return (
    <div className="bg-white text-black">
      <Nax />

      {/* Hero Banner */}
      <div className="relative">
        <div className="relative w-full overflow-hidden h-[250px] md:h-[400px]">
          <img
            src="https://www.shutterstock.com/image-photo/riyadh-saudi-arabia-al-diriyah-260nw-2571408341.jpg"
            alt="Leeds City View"
            className="w-full h-full object-cover"
          />
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
          >
            <polygon fill="#e75b1e" points="0,10 100,0 100,10" />
          </svg>
        </div>

        {/* About Section */}
        <div className="bg-[#e75b1e] text-white text-center py-16 px-6">
          <h2 className="text-3xl font-semibold mb-6">ABOUT US</h2>
          <p className="max-w-4xl mx-auto mb-6">
            Leeds Muslim Youth Forum is an organisation that supports young people by providing opportunities
            for growth, learning, and leadership.
          </p>
          <p className="max-w-4xl mx-auto">
            We do this by enrolling, supporting and training young people to create positive changes in
            their community while preserving cultural heritage.
          </p>

          {/* Why Needed Section */}
<div className="bg-[#e75b1e] text-white max-w-4xl mx-auto mt-16 p-8 rounded-md shadow-[0_4px_30px_rgba(0,0,0,0.4)] border border-white/20 text-left">
  <h3 className="text-xl font-semibold border-b border-black/30 pb-2 mb-4">Why it is Needed</h3>
  <p className="mb-4">
    Through this project we as young people were attempting to retain this history in the form of stories,
    film, archives and memorabilia and cascade this to our peer group and other sections of the community.
    In charting this history, we aim to give our community the knowledge and confidence to be proud of their
    heritage while still being confidently immersed in modern society today...
  </p>
  <h3 className="text-xl font-semibold border-b border-black/30 pb-2 mb-4">The Story</h3>
  <p>
    Looking back over sixty years the initiative, explores the arrival of the Pakistani / Kashmiri community
    who first arrived in the Leeds area in meaningful numbers in the 1950s and 1960s...
  </p>
</div>


          {/* Timeline Section */}
          <div className="mt-20">
            {/* Mobile Timeline Slider */}
            <div className="md:hidden relative max-w-xs mx-auto">
              <div className="p-6 rounded-xl bg-white text-black shadow-xl text-center border border-[#e75b1e] relative">
                <div className="text-2xl font-extrabold mb-4">{timelineData[currentIndex].year}</div>
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#e75b1e] shadow-md">
                  <img
                    src={timelineData[currentIndex].image}
                    alt={timelineData[currentIndex].year}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <p className="text-sm leading-relaxed">
                  {timelineData[currentIndex].text}
                </p>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={handlePrev}
                    className="text-[#e75b1e] p-2 rounded-full shadow-md hover:bg-orange-100 transition"
                  >
                    ◀
                  </button>
                  <button
                    onClick={handleNext}
                    className="text-[#e75b1e] p-2 rounded-full shadow-md hover:bg-orange-100 transition"
                  >
                    ▶
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Timeline */}
            <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto px-4 relative mt-20">
              {timelineData.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-1/5 relative z-10">
                  {index !== 0 && (
                    <div className="absolute top-1/2 left-0 w-1/2 border-t-2 border-white/60 z-0"></div>
                  )}
                  {index !== timelineData.length - 1 && (
                    <div className="absolute top-1/2 right-0 w-1/2 border-t-2 border-white/60 z-0"></div>
                  )}
                  <div className="text-md text-center font-bold text-white">{item.year}</div>
                  <div className="w-1 h-1 text-[#e75b1e]  rounded-full mt-1"></div>
                  <div className="w-0.5 h-12 bg-white/60"></div>
                  <div className="relative z-10 bg-white border-2 border-white shadow-md rounded-full w-24 h-24 overflow-hidden">
                    <img src={item.image} alt={item.year} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-0.5 h-9 bg-white/60"></div>
                  <div className="w-1 h-1 bg-white rounded-full mt-1"></div>
                  <div className="mt-1 text-sm text-center font-bold text-white min-h-[48px]">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Slider Heading + Component */}
      <div className="bg-[#FAF5EF] py-12 px-4 text-center">
        <h2 className="text-3xl font-bold text-[#e75b1e] uppercase tracking-wide mb-4">
          Featured Letters
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-sm md:text-base">
          Explore stories, interviews, and reflections shared by members of our community.
        </p>
      </div>

      <Link to="/letters">
        <Sliderss />
      </Link>

      <Footer />
    </div>
  );
};

export default AboutUs;
