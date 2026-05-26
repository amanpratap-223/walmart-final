import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: "Summer Sale",
    subtitle: "Up to 60% off on Electronics",
    cta: "Shop Electronics",
    link: "/category/electronics",
    bg: "from-blue-900/90 to-blue-900/10",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c028b?w=1200&auto=format&fit=crop&q=80",
    badge: "Limited Time",
  },
  {
    title: "New Fashion Arrivals",
    subtitle: "Discover the latest trends for Men & Women",
    cta: "Shop Fashion",
    link: "/category/women",
    bg: "from-pink-900/90 to-pink-900/10",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&auto=format&fit=crop&q=80",
    badge: "New In",
  },
  {
    title: "Home & Furniture",
    subtitle: "Transform your living space for less",
    cta: "Shop Furniture",
    link: "/category/furniture",
    bg: "from-orange-900/90 to-orange-900/10",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&auto=format&fit=crop&q=80",
    badge: "Save Big",
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
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  };

  const slide = slides[current];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '520px' }}>
      {/* Background image */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${animating ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: `url(${slide.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg}`} />

      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col justify-center px-10 md:px-24 transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <span className="inline-block bg-white text-blue-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 w-fit">
          {slide.badge}
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
          {slide.title}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-xl font-medium">
          {slide.subtitle}
        </p>
        <Link
          to={slide.link}
          className="inline-block bg-white text-blue-900 font-bold text-lg px-8 py-3 rounded-full hover:bg-blue-50 transition-all duration-200 shadow-xl w-fit hover:scale-105"
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
            className={`transition-all duration-300 rounded-full ${i === current ? 'w-8 h-3 bg-white' : 'w-3 h-3 bg-white/40'}`}
          />
        ))}
      </div>

      {/* Arrow buttons */}
      <button
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl backdrop-blur-sm transition"
      >
        ‹
      </button>
      <button
        onClick={() => goTo((current + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl backdrop-blur-sm transition"
      >
        ›
      </button>
    </div>
  );
};

export default Hero;