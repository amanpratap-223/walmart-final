import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name: A–Z', value: 'name_asc' },
];

const StarRating = ({ rating = 4.2, count = 128 }) => (
  <div className="flex items-center gap-1 mt-1">
    {[1,2,3,4,5].map(s => (
      <svg key={s} width="13" height="13" viewBox="0 0 24 24"
        fill={s <= Math.round(rating) ? '#fbbf24' : '#e5e7eb'}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
    <span className="text-xs text-gray-400 ml-1">({count})</span>
  </div>
);

const ProductCard = ({ prod, onAddToCart, onToggleWishlist, inWishlist }) => {
  const [added, setAdded] = useState(false);
  const discount = prod.originalPrice ? Math.round((1 - prod.price / prod.originalPrice) * 100) : null;

  const handleAdd = () => {
    onAddToCart(prod);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col">
      {/* Image area */}
      <div className="relative overflow-hidden bg-gray-50" style={{ height: '220px' }}>
        {discount && (
          <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        <button
          onClick={() => onToggleWishlist(prod)}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center transition hover:scale-110"
        >
          <svg width="16" height="16" viewBox="0 0 24 24"
            fill={inWishlist ? '#ef4444' : 'none'}
            stroke={inWishlist ? '#ef4444' : '#9ca3af'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <Link to={`/product/${prod.id || prod._id}`}>
          <img
            src={prod.image}
            alt={prod.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-4"
          />
        </Link>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4">
        <Link to={`/product/${prod.id || prod._id}`}>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors leading-snug">
            {prod.name}
          </h3>
        </Link>
        <StarRating rating={4.1 + Math.random() * 0.8} count={Math.floor(50 + Math.random() * 400)} />
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-gray-900">₹{(prod.price || 0).toLocaleString()}</span>
          {prod.originalPrice && (
            <span className="text-sm text-gray-400 line-through">₹{prod.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <p className="text-xs text-green-600 font-medium mt-1">Free delivery</p>

        <button
          onClick={handleAdd}
          className={`mt-auto w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-[#0071ce] hover:bg-[#004f9a] text-white'
          }`}
        >
          {added ? '✓ Added to Cart!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/category/${categoryName}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        const max = Math.max(...data.map(p => p.price || 0), 1000);
        setMaxPrice(max);
        setPriceRange([0, max]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryName]);

  const isInWishlist = (prod) => wishlist.some(w => w.id === (prod.id || prod._id));

  const toggleWishlist = (prod) => {
    if (isInWishlist(prod)) removeFromWishlist(prod.id || prod._id);
    else addToWishlist(prod);
  };

  const sorted = [...products]
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      if (sort === 'name_asc') return a.name?.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-[#0071ce] to-[#004f9a] text-white py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-200 text-sm mb-1">
            <Link to="/" className="hover:underline">Home</Link> › {categoryName.replace(/-/g, ' ')}
          </p>
          <h1 className="text-3xl font-bold capitalize">{categoryName.replace(/-/g, ' ')}</h1>
          <p className="text-blue-100 mt-1">{products.length} products found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-4">Filters</h3>

            {/* Price range */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 block mb-3">Price Range</label>
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={priceRange[1]}
                onChange={e => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>₹0</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-3">Sort By</label>
              <div className="flex flex-col gap-2">
                {SORT_OPTIONS.map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="sort"
                      value={opt.value}
                      checked={sort === opt.value}
                      onChange={() => setSort(opt.value)}
                      className="accent-blue-600"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main grid */}
        <div className="flex-1">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-500">{sorted.length} results</p>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="lg:hidden border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100" />
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {sorted.map(prod => (
                <ProductCard
                  key={prod.id || prod._id}
                  prod={prod}
                  onAddToCart={p => addToCart({ ...p, quantity: 1 })}
                  onToggleWishlist={toggleWishlist}
                  inWishlist={isInWishlist(prod)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
