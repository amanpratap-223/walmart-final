import React from 'react';

const features = [
  { icon: '🚚', title: 'Free Delivery', desc: 'On all orders over ₹999' },
  { icon: '🔄', title: 'Easy Returns', desc: '30-day hassle-free returns' },
  { icon: '🔒', title: 'Secure Payments', desc: '100% protected checkout' },
  { icon: '🎁', title: 'Daily Deals', desc: 'New offers every single day' },
];

const TrustStrip = () => (
  <div className="bg-white border-y border-gray-100 py-6">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
      {features.map(f => (
        <div key={f.title} className="flex items-center space-x-3 group">
          <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{f.icon}</span>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{f.title}</p>
            <p className="text-xs text-gray-500">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TrustStrip;
