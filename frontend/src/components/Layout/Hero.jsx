import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: "Summer Sale",
    subtitle: "Up to 60% off on Electronics",
    cta: "Shop Electronics",
    link: "/category/electronics",
    gradient: "from-black/80 via-black/50 to-transparent",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=900&fit=crop&q=80",
    badge: "Limited Time",
  },
  {
    title: "New Fashion Arrivals",
    subtitle: "Discover the latest trends for Men & Women",
    cta: "Shop Fashion",
    link: "/category/women",
    gradient: "from-black/80 via-black/50 to-transparent",
    image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=1920&h=900&fit=crop&q=80",
    badge: "New In",
  },
  {
    title: "Trending Now",
    subtitle: "Shop what everyone is talking about",
    cta: "Shop Trending",
    link: "/category/trending",
    gradient: "from-black/80 via-black/50 to-transparent",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1920&h=900&fit=crop&q=80",
    badge: "Hot 🔥",
  },
];


const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  };

  const slide = slides[current];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '520px' }}>
      {/* Background image using img tag for proper fitting */}
      <img
        src={slide.image}
        alt={slide.title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${animating ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* Gradient overlay — solid left, fading right so model shows on right side */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />

      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col justify-center px-10 md:px-24 max-w-2xl transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <span className="inline-block bg-white/90 text-gray-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 w-fit shadow">
          {slide.badge}
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
          {slide.title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 font-medium">
          {slide.subtitle}
        </p>
        <Link
          to={slide.link}
          className="inline-block bg-white text-gray-900 font-bold text-lg px-8 py-3 rounded-full hover:bg-yellow-300 transition-all duration-200 shadow-xl w-fit hover:scale-105"
        >
          {slide.cta} →
        </Link>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${i === current ? 'w-8 h-3 bg-white' : 'w-3 h-3 bg-white/40 hover:bg-white/60'}`}
          />
        ))}
      </div>

      {/* Arrow buttons */}
      <button
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl backdrop-blur-sm transition"
      >
        ‹
      </button>
      <button
        onClick={() => goTo((current + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl backdrop-blur-sm transition"
      >
        ›
      </button>
    </div>
  );
};

export default Hero;

