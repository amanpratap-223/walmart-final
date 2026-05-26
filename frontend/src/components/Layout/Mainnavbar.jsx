// src/components/Layout/Mainnavbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
  HiXMark,
  HiMagnifyingGlass,
} from 'react-icons/hi2';
import SearchBar from '../Common/SearchBar';
import CartDrawer from './CartDrawer';
import { useCart } from '../../context/CartContext';

const menuItems = [
  { label: "Men", category: "men" },
  { label: "Women", category: "women" },
  { label: "Trending", category: "trending" },
  { label: "Only at Walmart", category: "only-at-walmart" },
  { label: "Furniture", category: "furniture" },
  { label: "Electronics", category: "electronics" },
  { label: "Grocery", category: "grocery" },
];

export default function MainNavbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { cartProducts } = useCart();
  const totalItems = cartProducts.reduce((sum, i) => sum + i.quantity, 0);

  const user = JSON.parse(localStorage.getItem("user"));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUserMenuOpen(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      {/* Regular navbar */}
      {!isSearchOpen && (
        <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto flex items-center justify-between py-3 px-6">
            <Link to="/" className="text-3xl font-extrabold">Walmart</Link>

            {/* desktop links */}
            <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
              {menuItems.map(item => (
                <Link
                  key={item.category}
                  to={`/category/${item.category}`}
                  className="text-sm font-semibold uppercase hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* desktop icons */}
            <div className="hidden md:flex items-center space-x-6">
              {user?.role === 'admin' && (
                <Link to="/admin" className="px-2 py-1 bg-black text-white rounded text-sm font-semibold">
                  Admin
                </Link>
              )}
              <button onClick={() => setIsSearchOpen(true)}>
                <HiMagnifyingGlass size={24} className="text-gray-800" />
              </button>

              {/* User icon with dropdown */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(o => !o)}
                    className="flex items-center space-x-1 focus:outline-none"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        👤 My Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        📦 My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        ❤️ Wishlist
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <HiOutlineUser size={24} className="text-gray-800" />
                </Link>
              )}

              <Link to="/wishlist" className="flex items-center space-x-1">
                <HiOutlineHeart size={24} className="text-gray-800" />
                <span className="text-sm font-semibold text-gray-800">Wishlist</span>
              </Link>
              <button onClick={() => setDrawerOpen(o => !o)} className="relative">
                <HiOutlineShoppingBag size={24} className="text-gray-800" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* mobile: search + menu toggle */}
            <div className="md:hidden flex items-center space-x-4">
              <button onClick={() => setIsSearchOpen(true)}>
                <HiMagnifyingGlass size={24} className="text-gray-800" />
              </button>
              <button onClick={() => setMobileMenuOpen(o => !o)}>
                {mobileMenuOpen
                  ? <HiXMark size={24} className="text-gray-800" />
                  : <HiBars3BottomRight size={24} className="text-gray-800" />
                }
              </button>
            </div>
          </div>

          {/* mobile menu body */}
          {mobileMenuOpen && (
            <div className="md:hidden px-6 pb-4 space-y-4">
              {menuItems.map(item => (
                <Link
                  key={item.category}
                  to={`/category/${item.category}`}
                  className="block text-sm font-semibold uppercase hover:underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t">
                {user?.role === 'admin' && (
                  <Link to="/admin" className="px-2 py-1 bg-black text-white rounded text-sm font-semibold text-center" onClick={() => setMobileMenuOpen(false)}>
                    Admin
                  </Link>
                )}
                {user ? (
                  <>
                    <Link to="/profile" className="text-sm font-semibold hover:underline" onClick={() => setMobileMenuOpen(false)}>👤 My Profile</Link>
                    <Link to="/orders" className="text-sm font-semibold hover:underline" onClick={() => setMobileMenuOpen(false)}>📦 My Orders</Link>
                    <Link to="/wishlist" className="text-sm font-semibold hover:underline" onClick={() => setMobileMenuOpen(false)}>❤️ Wishlist</Link>
                    <button onClick={handleLogout} className="text-left text-sm font-semibold text-red-600 hover:underline">🚪 Logout</button>
                  </>
                ) : (
                  <Link to="/login" className="text-sm font-semibold hover:underline" onClick={() => setMobileMenuOpen(false)}>Login / Register</Link>
                )}
              </div>
            </div>
          )}
        </nav>
      )}

      {/* search overlay + cart drawer */}
      {isSearchOpen && (
        <SearchBar
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      )}
      <CartDrawer
        drawerOpen={drawerOpen}
        toggleCartDrawer={() => setDrawerOpen(o => !o)}
      />
    </>
  );
}
