


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   HiOutlineUser,
//   HiOutlineShoppingBag,
//   HiBars3BottomRight,
//   HiXMark,
//   HiMagnifyingGlass,
// } from 'react-icons/hi2';
// import SearchBar from '../Common/SearchBar';
// import CartDrawer from './CartDrawer';
// import { useCart } from '../../context/CartContext';
// import AdminLayout from '../Admin/AdminLayout';

// const menuItems = [
//   { label: "Men", category: "men" },
//   { label: "Women", category: "women" },
//   { label: "Trending", category: "trending" },
//   { label: "Only at Walmart", category: "only-at-walmart" },
//   { label: "Furniture", category: "furniture" },
//   { label: "Electronics", category: "electronics" },
//   { label: "Grocery", category: "grocery" },
// ];

// const Mainnavbar = () => {
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const toggleCartDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   const { cartProducts } = useCart();
//   const totalItems = cartProducts.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <>
//       {!isSearchOpen && (
//         <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
//           <div className="container mx-auto flex items-center justify-between py-3 px-6">
//             {/* Logo */}
//             <Link to="/" className="text-3xl font-extrabold text-gray-900 tracking-tight">
//               Walmart
//             </Link>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
//               {menuItems.map((item) => (
//                 <Link
//                   key={item.category}
//                   to={`/category/${item.category}`}
//                   className="text-sm font-semibold uppercase text-gray-800 hover:underline underline-offset-4"
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </div>

//             {/* Desktop Icons */}
//             <div className="hidden md:flex items-center space-x-6">
//               <Link to="/admin" className='block bg-black px-2 rounded text-sm text-white'>Admin</Link>
//               <button onClick={() => setIsSearchOpen(true)} aria-label="Open search">
//                 <HiMagnifyingGlass className="h-6 w-6 text-gray-800 cursor-pointer" />
//               </button>
//               <Link to="/login">
//               <Link to="/wishlist">
//                 <HiOutlineUser className="h-6 w-6 text-gray-800 cursor-pointer" />
//               </Link>
//               <Link to="/wishlist" className="text-sm font-semibold">
//   Wishlist
// </Link>
              
//               </Link>
//               <div className="relative cursor-pointer" onClick={toggleCartDrawer}>
//                 <HiOutlineShoppingBag className="h-6 w-6 text-gray-800" />
//                 {totalItems > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-[#ea2e0e] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
//                     {totalItems}
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Mobile - Search Icon & Hamburger */}
//             <div className="md:hidden flex items-center space-x-4">
//               <button onClick={() => setIsSearchOpen(true)} aria-label="Open search">
//                 <HiMagnifyingGlass className="h-6 w-6 text-gray-800 cursor-pointer" />
//               </button>
//               <button onClick={toggleMobileMenu} aria-label="Toggle menu">
//                 {mobileMenuOpen ? (
//                   <HiXMark className="h-6 w-6 text-gray-800 cursor-pointer" />
//                 ) : (
//                   <HiBars3BottomRight className="h-6 w-6 text-gray-800 cursor-pointer" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu Dropdown */}
//           {mobileMenuOpen && (
//             <div className="md:hidden px-6 pb-4 space-y-4">
//               {menuItems.map((item) => (
//                 <Link
//                   key={item.category}
//                   to={`/category/${item.category}`}
//                   className="block text-sm font-semibold uppercase text-gray-800 hover:underline"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//               <div className="flex space-x-6 pt-2 border-t pt-4">
//                 <button onClick={() => setIsSearchOpen(true)} aria-label="Open search">
//                   <HiMagnifyingGlass className="h-6 w-6 text-gray-800 cursor-pointer" />
//                 </button>
//                 <Link to="/login">
//                   <HiOutlineUser className="h-6 w-6 text-gray-800 cursor-pointer" />
//                 </Link>
//                 <div className="relative cursor-pointer" onClick={toggleCartDrawer}>
//                   <HiOutlineShoppingBag className="h-6 w-6 text-gray-800" />
//                   {totalItems > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-[#ea2e0e] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
//                       {totalItems}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </nav>
//       )}

//       {/* SearchBar overlays navbar when open */}
//       {isSearchOpen && <SearchBar isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />}
//       <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
//     </>
//   );
// };

// export default Mainnavbar;

// src/components/Layout/Mainnavbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const { cartProducts } = useCart();
  const totalItems = cartProducts.reduce((sum, i) => sum + i.quantity, 0);

  const user = JSON.parse(localStorage.getItem("user"));

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
              <Link to={user ? "/profile" : "/login"}>
                <HiOutlineUser size={24} className="text-gray-800" />
              </Link>
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
              <div className="flex space-x-6 pt-4 border-t">
                {user?.role === 'admin' && (
                  <Link to="/admin" className="px-2 py-1 bg-black text-white rounded text-sm font-semibold flex items-center justify-center" onClick={() => setMobileMenuOpen(false)}>
                    Admin
                  </Link>
                )}
                <button onClick={() => setIsSearchOpen(true)}>
                  <HiMagnifyingGlass size={24} className="text-gray-800" />
                </button>
                <Link to={user ? "/profile" : "/login"} onClick={() => setMobileMenuOpen(false)}>
                  <HiOutlineUser size={24} className="text-gray-800" />
                </Link>
                <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)}>
                  <HiOutlineHeart size={24} className="text-gray-800" />
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
            </div>
          )}
        </nav>
      )}

      {/* search overlay + cart drawer */}
      {isSearchOpen && (
        <SearchBar
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}    // ← pass onClose
        />
      )}
      <CartDrawer
        drawerOpen={drawerOpen}
        toggleCartDrawer={() => setDrawerOpen(o => !o)}
      />
    </>
  );
}
