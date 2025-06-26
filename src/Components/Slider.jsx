import React, { useEffect, useState } from "react";



const Slider = () => {


  return (
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] bg-black overflow-hidden">
      <video
        className="w-full h-full object-cover pointer-events-none"
        src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay text */}
      <div className="absolute  inset-0 flex flex-col items-end justify-center px-4">
        <h1 className="text-white text-center text-2xl md:text-4xl lg:text-5xl font-serif drop-shadow-md">
          Bringing history out of the attic <br />
          <span className="text-lg md:text-2xl font-light">(and suitcases, shoeboxes & chests)</span>
        </h1><br></br><br></br>
         <button className="mt-2 w-fit px-6 py-2 bg-white text-black md:mr-60 font-medium rounded hover:bg-gray-200 transition justify-end">
            Learn More
          </button>
      </div>
    </div>
  );
};

export default Slider;
