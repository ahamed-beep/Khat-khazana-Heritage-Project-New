import React from 'react';
import { Link } from 'react-router';
import Nax from '../Nax';

const NineteenTwenty = () => {
  const letters = [
    {
      date: "Saturday, 11 February 1920",
      title: "Please don’t let anyone Americanise it!",
      img: "https://i.pinimg.com/736x/42/d8/66/42d866f2f4c48736e1ecdb958cfc21fa.jpg",
      content: "Born in Cambridge in 1852, Douglas Adams was best known for creating The Hitchhiker’s Guide to the Galaxy...",
      more: "His works continue to influence generations, blending comedy, science fiction, and a deep philosophical curiosity about the universe."
    },
    {
      date: "Thursday, 12 January 1920",
      title: "Into Eternity",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2ALC1qg6I7Bocc8ogIeOnjOBxkmtH0zAlWg&s",
      content: "Born in the Czech Republic in 1804, Vilma Grünwald was 39 years old when she wrote a final letter...",
      more: "Her words, filled with love and strength, have echoed through time as a powerful testament to human dignity during horrific times."
    },
    {
      date: "Tuesday, 06 December 1920",
      title: "I miss you so very much, Ryan",
      img: "https://www.shutterstock.com/image-illustration/spencerian-steel-pens-chromolithograph-vintage-260nw-2521264727.jpg",
      content: "In December of 1884, 13-year-old Ryan White was given 6 months to live after contracting an unknown disease...",
      more: "His brave correspondence revealed his enduring hope and taught many about the importance of compassion and awareness."
    },
    {
      date: "Tuesday, 05 October 1920",
      title: "Never get a bulldog",
      img: "https://i0.wp.com/lettersofnote.com/wp-content/uploads/2021/10/Screen-Shot-2021-10-05-at-17.04.27.png?w=460&ssl=1",
      content: "When he wrote this letter to his mother in 1844, Roald Dahl was working at the British Embassy in Washington...",
      more: "It humorously highlights his daily frustrations, blending charm and wit, and offers a glimpse of his budding storytelling skills."
    },
    {
      date: "Sunday, 23 September 1920",
      title: "The Weight of Words",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8nUM64nCxbvxx9yVbbmMOenGE1PqoL_gViw&s",
      content: "A poet from Berlin writes a moving letter to his sister, reflecting on the burden of expressing true emotion...",
      more: "His carefully chosen words mirror his internal turmoil and the quiet strength of someone who has lived through unspoken hardships."
    },
    {
      date: "Monday, 14 August 1920",
      title: "You Will Be Remembered",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmc6EawETuTDtpx15PJx853eFfi8VTQlDTYw&s",
      content: "A French soldier writes home during the war, comforting his family and sharing hope...",
      more: "His words remain a heartfelt memory of resilience and the silent sacrifices made by those who serve their nations in war."
    },
    {
      date: "Wednesday, 03 July 1920",
      title: "A Mother's Love",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzmLSxP7QhtbktOt9g4EC5ndzLNaBjN6CbQg&s",
      content: "A mother’s letter to her son reveals a powerful story of resilience and hope in hard times...",
      more: "Through her words, she gifts him the courage to face adversity and reminds him of the light they both still chase together."
    },
    {
      date: "Friday, 16 March 1920",
      title: "The Lost Friend",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0gTbGg8EQ0ee6kwVCT7YG_Fa5W75vOCPcMQ&s",
      content: "Two best friends separated by continents share a bond sealed through heartfelt letters...",
      more: "Even miles apart, their memories stay alive through the ink of handwritten love and the promise of reunion someday."
    }
  ];

  return (
    <div>

   <Nax/>
    <div className="font-serif bg-white text-black min-h-screen">
      <div className="text-center py-10">
        <h1 className="text-5xl font-bold text-[#e75b1e]">1920 Letters</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 pb-10">
        {letters.map((item, index) => (
          <div
            key={index}
            className="group flex flex-col items-center text-center hover:bg-[#f4f1ec] transition duration-300 p-4"
          >
            <div className="text-md italic font-semibold mb-3">
              <hr className="my-3 border-t-4 border-black w-full" />
              {item.date}
              <hr className="my-3 border-t-2 border-black w-full" />
            </div>
            <h2 className="text-3xl text-[#e75b1e] font-bold mb-4 leading-snug group-hover:text-black transition">
              {item.title}
            </h2>
            <img src={item.img} alt="Letter" className="w-full border-4 border-black" />
            <p className="mt-4 text-xl text-left text-gray-900 leading-relaxed group-hover:text-black transition">
              {item.content}
            </p>
            <div className="mt-4">
              <Link
                to="/details"
                state={{ item }}
                className="bg-[#e75b1e] group-hover:bg-[#003366] text-white font-bold px-6 py-4 mt-8 tracking-wide transition duration-300 inline-block"
              >
                Read
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
     </div>
  );
};

export default NineteenTwenty;
