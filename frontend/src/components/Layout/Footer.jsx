import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 pt-14 pb-6 mt-12">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

      {/* Brand */}
      <div>
        <h2 className="text-white text-3xl font-extrabold mb-3">Walmart</h2>
        <p className="text-sm leading-relaxed text-gray-400">
          Save money. Live better. India's favourite destination for everyday essentials, fashion, electronics and more.
        </p>
        <div className="flex space-x-4 mt-5">
          <a href="#" className="w-9 h-9 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition text-white text-sm font-bold">f</a>
          <a href="#" className="w-9 h-9 bg-gray-700 hover:bg-sky-500 rounded-full flex items-center justify-center transition text-white text-sm font-bold">𝕏</a>
          <a href="#" className="w-9 h-9 bg-gray-700 hover:bg-pink-500 rounded-full flex items-center justify-center transition text-white text-sm font-bold">ig</a>
          <a href="#" className="w-9 h-9 bg-gray-700 hover:bg-red-600 rounded-full flex items-center justify-center transition text-white text-sm font-bold">▶</a>
        </div>
      </div>

      {/* Shop */}
      <div>
        <h3 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">Shop</h3>
        <ul className="space-y-2 text-sm">
          {[
            { label: 'Men', to: '/category/men' },
            { label: 'Women', to: '/category/women' },
            { label: 'Electronics', to: '/category/electronics' },
            { label: 'Furniture', to: '/category/furniture' },
            { label: 'Grocery', to: '/category/grocery' },
            { label: 'Trending', to: '/category/trending' },
          ].map(link => (
            <li key={link.to}>
              <Link to={link.to} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Account */}
      <div>
        <h3 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">My Account</h3>
        <ul className="space-y-2 text-sm">
          {[
            { label: 'Sign In / Register', to: '/login' },
            { label: 'My Orders', to: '/orders' },
            { label: 'My Profile', to: '/profile' },
            { label: 'Wishlist', to: '/wishlist' },
            { label: 'Track Order', to: '/orders' },
          ].map(link => (
            <li key={link.label}>
              <Link to={link.to} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Customer Service */}
      <div>
        <h3 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">Help & Info</h3>
        <ul className="space-y-2 text-sm">
          {['Customer Support', 'Returns & Refunds', 'Shipping Policy', 'Privacy Policy', 'Terms of Service', 'FAQs'].map(item => (
            <li key={item}>
              <a href="#" className="hover:text-white transition-colors">{item}</a>
            </li>
          ))}
        </ul>
        <div className="mt-5 bg-gray-800 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">📞 Customer Care</p>
          <p className="text-white font-bold text-sm">1800-000-WALMART</p>
          <p className="text-xs text-gray-400 mt-1">Mon–Sat, 9am – 6pm</p>
        </div>
      </div>
    </div>

    {/* Trust badges */}
    <div className="max-w-7xl mx-auto px-6 mt-10 pt-8 border-t border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      {[
        { icon: '🚚', text: 'Free Delivery over ₹999' },
        { icon: '🔄', text: '30-Day Easy Returns' },
        { icon: '🔒', text: '100% Secure Payments' },
        { icon: '🎁', text: 'Exclusive Daily Deals' },
      ].map(b => (
        <div key={b.text} className="flex flex-col items-center space-y-1">
          <span className="text-2xl">{b.icon}</span>
          <span className="text-xs text-gray-400">{b.text}</span>
        </div>
      ))}
    </div>

    {/* Copyright */}
    <div className="text-center text-xs text-gray-600 mt-8">
      © {new Date().getFullYear()} Walmart Inc. All rights reserved. Built with ❤️
    </div>
  </footer>
);

export default Footer;
