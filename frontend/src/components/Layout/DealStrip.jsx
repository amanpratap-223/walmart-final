import React from 'react';

const deals = [
  "🔥 Free shipping on orders over ₹999",
  "⚡ 50% off on Electronics — Today Only!",
  "👗 New arrivals in Women's Fashion",
  "🛒 Buy 2 Get 1 Free on Groceries",
  "🎁 Extra 10% off with code: WALMART10",
  "🚀 Same-day delivery available in select cities",
];

const DealStrip = () => (
  <div className="bg-blue-700 text-white text-sm font-medium py-2 overflow-hidden whitespace-nowrap">
    <div
      className="inline-block animate-[marquee_30s_linear_infinite]"
      style={{ animation: 'marquee 30s linear infinite' }}
    >
      {[...deals, ...deals].map((deal, i) => (
        <span key={i} className="mx-8">{deal}</span>
      ))}
    </div>
    <style>{`
      @keyframes marquee {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
  </div>
);

export default DealStrip;
