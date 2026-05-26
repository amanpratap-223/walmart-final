import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const StarRating = ({ rating = 4.2 }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map(s => (
      <svg key={s} width="12" height="12" viewBox="0 0 24 24"
        fill={s <= Math.round(rating) ? '#fbbf24' : '#e5e7eb'}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

export default function SearchResults() {
  const query = useQuery().get("q") || useQuery().get("query") || "";
  const clean = query.replace(/[^\p{L}\p{N}\s]/gu, "").trim();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("featured");
  const [addedId, setAddedId] = useState(null);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/search?q=${encodeURIComponent(clean)}`)
      .then(r => r.json())
      .then(data => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [clean]);

  const isInWishlist = id => wishlist.some(w => w.id === id);
  const toggleWishlist = p => isInWishlist(p.id) ? removeFromWishlist(p.id) : addToWishlist(p);

  const handleAdd = (p) => {
    addToCart({ ...p, quantity: 1 });
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const sorted = [...items].sort((a, b) => {
    if (sort === "price_asc") return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    if (sort === "name_asc") return a.name?.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-400 mb-1">
            <Link to="/" className="hover:underline">Home</Link> › Search results
          </p>
          <h1 className="text-2xl font-bold text-gray-900">
            {loading ? "Searching…" : `Results for "${clean}"`}
          </h1>
          {!loading && (
            <p className="text-gray-500 text-sm mt-1">{items.length} item{items.length !== 1 ? 's' : ''} found</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Sort bar */}
        {!loading && items.length > 0 && (
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-500">{sorted.length} results</p>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name: A–Z</option>
              </select>
            </div>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-72 animate-pulse border border-gray-100" />
            ))}
          </div>
        )}

        {/* No results */}
        {!loading && items.length === 0 && (
          <div className="text-center py-24">
            <div className="text-7xl mb-5">🔍</div>
            <h2 className="text-2xl font-semibold text-gray-700">No results for "{clean}"</h2>
            <p className="text-gray-400 mt-2 mb-6">Check the spelling or try a different search term</p>
            <Link to="/" className="inline-block bg-[#0071ce] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#004f9a] transition">
              Back to Home
            </Link>
          </div>
        )}

        {/* Product grid */}
        {!loading && sorted.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sorted.map(p => (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col">
                {/* Image */}
                <div className="relative bg-gray-50" style={{ height: '200px' }}>
                  <button
                    onClick={() => toggleWishlist(p)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24"
                      fill={isInWishlist(p.id) ? '#ef4444' : 'none'}
                      stroke={isInWishlist(p.id) ? '#ef4444' : '#9ca3af'} strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  <Link to={`/product/${p.id}`}>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
                {/* Info */}
                <div className="flex flex-col flex-1 p-4">
                  <Link to={`/product/${p.id}`}>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors">
                      {p.name}
                    </h3>
                  </Link>
                  <StarRating rating={4 + Math.random() * 0.9} />
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-base font-bold text-gray-900">₹{(p.price || 0).toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-green-600 font-medium">Free delivery</p>
                  <button
                    onClick={() => handleAdd(p)}
                    className={`mt-auto w-full py-2 rounded-xl text-sm font-semibold transition-all mt-3 ${
                      addedId === p.id ? 'bg-green-500 text-white' : 'bg-[#0071ce] hover:bg-[#004f9a] text-white'
                    }`}
                  >
                    {addedId === p.id ? '✓ Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
