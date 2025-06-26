import React, { useEffect, useState } from 'react';

/* ----------------- 1. Hero slider ke images ----------------- */
const images = [
  '/image1.avif',
  '/image2.avif',
  '/image3.avif',
  '/image4.avif',
];

/* ----------------- 2. Testimonials data ----------------- */
const testimonials = [
  {
    name: 'Areeba Khan',
    title: 'Marketing Manager, BrightCo',
    feedback:
      'Lions Team ne hamari online presence transform kar di. Design sleek tha & results turant nazar aaye. Highly professional!',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Usman Raza',
    title: 'Founder, QuickShop.pk',
    feedback:
      'UI/UX quality top-tier thi. Sab kuch modern & intuitive laga. Attention to detail loved it!',
    image: 'https://randomuser.me/api/portraits/men/44.jpg',
  },
  {
    name: 'Fatima Noor',
    title: 'CEO, StyleWave',
    feedback:
      'Lions Team ke saath kaam game-changer nikla. Brand vision samjha aur expectations se zyada deliver kiya.',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Bilal Shah',
    title: 'CTO, TechLoop',
    feedback:
      'Sabse talented teams me se ek. Communication, speed, quality – unmatched.',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
];

/* ------------------------------------------------------------ */

const Testimonials = () => {
  /* Hero slider state */
  const [index, setIndex] = useState(0);

  /* Auto-rotate hero images */
  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      3500,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="font-poppins">
      {/* ---------- Hero Image Slider ---------- */}
      {/* (Slider not shown in code – placeholder) */}

      {/* ---------- Testimonials Grid ---------- */}
      <div className="bg-white py-20 px-6 md:px-20">
        <h3 className="mb-14 text-center text-3xl md:text-4xl font-extrabold tracking-wide text-black">
          What&nbsp;Our&nbsp;Clients&nbsp;Say
        </h3>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {testimonials.map((t, i) => {
            /* 4 ya 5 star random for demo */
            const rating = Math.floor(Math.random() * 2) + 4;

            return (
              <article
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Avatar with blue background */}
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-16 w-16 rounded-full border-4 border-black object-cover bg-blue-500"
                />

                {/* Testimonial text */}
                <div>
                  <p className="mb-3 text-sm italic leading-relaxed text-gray-800">
                    “{t.feedback}”
                  </p>

                  {/* Stars */}
                  <div className="mb-2 flex gap-1">
                    {[...Array(5)].map((_, s) => (
                      <svg
                        key={s}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-4 w-4 ${
                          s < rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.1 3.385a1 1 0 00.95.69h3.562c.97 0 1.372 1.24.589 1.81l-2.883 2.095a1 1 0 00-.365 1.118l1.1 3.385c.3.922-.756 1.688-1.54 1.118l-2.883-2.094a1 1 0 00-1.175 0l-2.882 2.094c-.785.57-1.84-.196-1.54-1.118l1.1-3.385a1 1 0 00-.364-1.118L2.85 8.812c-.783-.57-.381-1.81.588-1.81h3.562a1 1 0 00.95-.69l1.1-3.385z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-sm font-semibold text-black">
                    {t.name}{' '}
                    <span className="text-gray-600">| {t.title}</span>
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
