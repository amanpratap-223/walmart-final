import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <div className="text-8xl mb-6">💝</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6">Save items you love and come back to them anytime.</p>
        <Link
          to="/"
          className="bg-[#0071ce] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#004f9a] transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-500 text-sm mt-1">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {wishlist.map(item => (
            <div key={item.id || item._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col">
              {/* Image */}
              <div className="relative bg-gray-50" style={{ height: '200px' }}>
                <button
                  onClick={() => removeFromWishlist(item.id || item._id)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition"
                  title="Remove from wishlist"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <Link to={`/product/${item.id || item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 p-4">
                <Link to={`/product/${item.id || item._id}`}>
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-lg font-bold text-gray-900 mt-1">₹{(item.price || 0).toLocaleString()}</p>
                <p className="text-xs text-green-600 font-medium">Free delivery</p>

                <div className="flex gap-2 mt-auto pt-3">
                  <button
                    onClick={() => addToCart({ ...item, quantity: 1 })}
                    className="flex-1 bg-[#0071ce] hover:bg-[#004f9a] text-white py-2 rounded-xl text-sm font-semibold transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id || item._id)}
                    className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-300 transition"
                    title="Remove"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
