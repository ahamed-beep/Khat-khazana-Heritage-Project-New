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
      className={`fixed bottom-6 right-6 bg-[#f1e9dc] text-[#6e4a27] p-3 rounded-full shadow-md hover:bg-[#e5d7c3] transition-opacity duration-500 z-50 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
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
    <div className="bg-[#f4f1ec] text-[#2e2e2e] font-serif">
      <Nax />

      {/* Hero Banner */}
      <div className="relative">
        <div className="relative w-full overflow-hidden h-[250px] md:h-[400px]">
          <img
            src="https://www.shutterstock.com/image-photo/riyadh-saudi-arabia-al-diriyah-260nw-2571408341.jpg"
            alt="Leeds City View"
            className="w-full h-full object-cover grayscale opacity-90"
          />
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
          >
            <polygon fill="#9c6b34" points="0,10 100,0 100,10" />
          </svg>
        </div>

        <div className="bg-[#9c6b34] text-white text-center py-16 px-6">
          <h2 className="text-3xl font-semibold mb-6 tracking-widest">ABOUT US</h2>
          <p className="max-w-4xl mx-auto mb-6 italic">
            Leeds Muslim Youth Forum is an organisation that supports young people by providing opportunities
            for growth, learning, and leadership.
          </p>
          <p className="max-w-4xl mx-auto italic">
            We do this by enrolling, supporting and training young people to create positive changes in
            their community while preserving cultural heritage.
          </p>
        </div>

        <div className="bg-[#f8f3ea] text-[#3d2b1f] max-w-4xl mx-auto mt-12 p-8 rounded-md shadow-inner border border-[#d2c3a3]">
          <h3 className="text-2xl mb-4">Why it is Needed</h3>
          <p className="mb-6">
            Through this project we as young people were attempting to retain this history in the form of stories,
            film, archives and memorabilia and cascade this to our peer group and other sections of the community.
            In charting this history, we aim to give our community the knowledge and confidence to be proud of their
            heritage while still being confidently immersed in modern society today.
          </p>
          <h3 className="text-2xl mb-4">The Story</h3>
          <p>
            Looking back over sixty years the initiative explores the arrival of the Pakistani / Kashmiri community
            who first arrived in the Leeds area in meaningful numbers in the 1950s and 1960s.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="mt-20 px-4">
          {/* Mobile Timeline Slider */}
          <div className="md:hidden relative max-w-xs mx-auto">
            <div className="p-6 rounded-xl bg-white text-black shadow-xl text-center border border-[#d2c3a3] relative">
              <div className="text-xl font-bold mb-4 text-[#6e4a27]">{timelineData[currentIndex].year}</div>
              <div className="w-32 h-32 mx-auto mb-4 rounded-md overflow-hidden border-4 border-[#c2a36c] shadow-md">
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
                <button onClick={handlePrev} className="text-[#6e4a27] p-2 rounded-full hover:bg-[#e8dbc6]">◀</button>
                <button onClick={handleNext} className="text-[#6e4a27] p-2 rounded-full hover:bg-[#e8dbc6]">▶</button>
              </div>
            </div>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto px-4 relative mt-20">
            {timelineData.map((item, index) => (
              <div key={index} className="flex flex-col items-center w-1/5 relative z-10">
                {index !== 0 && <div className="absolute top-1/2 left-0 w-1/2 border-t-2 border-[#c2a36c]/50 z-0"></div>}
                {index !== timelineData.length - 1 && <div className="absolute top-1/2 right-0 w-1/2 border-t-2 border-[#c2a36c]/50 z-0"></div>}
                <div className="text-md text-center font-bold text-[#6e4a27]">{item.year}</div>
                <div className="w-0.5 h-12 bg-[#c2a36c]/50"></div>
                <div className="relative z-10 bg-white border border-[#d2c3a3] shadow-md rounded-md w-24 h-24 overflow-hidden">
                  <img src={item.image} alt={item.year} className="w-full h-full object-cover" />
                </div>
                <div className="mt-2 text-sm text-center text-[#3d2b1f] font-medium">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ScrollToTopButton />

      <div className="bg-[#f1e9dc] py-12 px-4 text-center">
        <h2 className="text-3xl font-bold text-[#6e4a27] uppercase tracking-widest mb-4">
          Featured Letters
        </h2>
        <p className="text-[#3d2b1f] max-w-2xl mx-auto text-base italic">
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