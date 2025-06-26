import React, { useEffect, useState } from "react";

const images = [
  "https://image.pbs.org/video-assets/HjMGjJ7-asset-mezzanine-16x9-ZcyukN7.jpg",
  "https://wallpapers.com/images/hd/michigan-pictures-2400-x-1350-ofusno7c1rhv65ep.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFCZQL7wvWaI2okKUaNn2UAeXTc3ZoyvK1Jv47HT0oncd3b_NCqu1TOn8mAxe9DtgKurM&usqp=CAU",
  "https://static.vinwonders.com/production/my-son-sanctuary_optimized-1.jpg"
];

const Sliderss = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // every 4 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index + 1}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default Sliderss;
