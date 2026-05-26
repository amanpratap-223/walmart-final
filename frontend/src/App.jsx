// // src/App.jsx
// import React from 'react'
// import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
// import { CartProvider } from './context/CartContext'
// import { WishlistProvider } from './context/WishlistContext'
// import { Toaster } from 'react-hot-toast'

// import Mainnavbar from './components/Layout/Mainnavbar'
// import ChatbotLoader from './components/ChatbotLoader'
// import Home from './pages/Home'
// import CategoryPage from './pages/CategoryPage'
// import SearchResults from './pages/SearchResult'
// import ProductDetail from './pages/ProductDetail'
// import MyOrderPage from './pages/MyOrderPage'
// import Profile from './pages/Profile'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import Checkout from './components/Cart/Checkout'

// import AdminLayout from './components/Admin/AdminLayout'
// import AdminHomePage from './pages/AdminHomePage'
// import UserManagement from './components/Admin/UserManagement'
// import ProductManagement from './components/Admin/ProductManagement'
// import OrderManagement from './components/Admin/OrderManagement'
// import WishlistPage from './pages/WishlistPage'

// export default function App() {
//   return (
//     <CartProvider>
//       <WishlistProvider>
//         <BrowserRouter>
//           <Toaster position="top-right" />

//           <Routes>
//             {/* Public routes wrapped in your header/footer layout */}
//             <Route element={<PublicLayout />}>
//               <Route path="/" element={<Home />} />
//               <Route path="/category/:categoryName" element={<CategoryPage />} />
//               <Route path="/search" element={<SearchResults />} />
//               <Route path="/product/:id" element={<ProductDetail />} />
//               <Route path="/checkout" element={<Checkout />} />
//               <Route path="/orders" element={<MyOrderPage />} />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/wishlist" element={<WishlistPage />} />
//             </Route>

//             {/* Admin routes */}
//             <Route path="/admin" element={<AdminLayout />}>
//               <Route index element={<AdminHomePage />} />
//               <Route path="users" element={<UserManagement />} />
//               <Route path="products" element={<ProductManagement />} />
//               <Route path="orders" element={<OrderManagement />} />
//             </Route>
//           </Routes>
//         </BrowserRouter>
//       </WishlistProvider>
//     </CartProvider>
//   )
// }

// function PublicLayout() {
//   return (
//     <>
//       <Mainnavbar />
//       <ChatbotLoader />
//       <Outlet /> {/* renders matched public page */}
//     </>
//   )
// }

import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { CartProvider }     from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Toaster }          from 'react-hot-toast';

import Mainnavbar          from './components/Layout/Mainnavbar';
import Chatbot             from './components/Chatbot';
import Home                from './pages/Home';
import CategoryPage        from './pages/CategoryPage';
import SearchResults       from './pages/SearchResult';
import ProductDetail       from './pages/ProductDetail';
import MyOrderPage         from './pages/MyOrderPage';
import Profile             from './pages/Profile';
import Login               from './pages/Login';
import Register            from './pages/Register';
import Checkout            from './components/Cart/Checkout';

import AdminLayout         from './components/Admin/AdminLayout';
import AdminHomePage       from './pages/AdminHomePage';
import UserManagement      from './components/Admin/UserManagement';
import ProductManagement   from './components/Admin/ProductManagement';
import OrderManagement     from './components/Admin/OrderManagement';
import WishlistPage        from './pages/WishlistPage';

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Toaster position="top-right" />

          <Routes>
            {/* Public */}
            <Route element={<PublicLayout />}>
              <Route path="/"                        element={<Home />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/search"                 element={<SearchResults />} />
              <Route path="/product/:id"            element={<ProductDetail />} />
              <Route path="/checkout"               element={<Checkout />} />
              <Route path="/orders"                 element={<MyOrderPage />} />
              <Route path="/profile"                element={<Profile />} />
              <Route path="/login"                  element={<Login />} />
              <Route path="/register"               element={<Register />} />
              <Route path="/wishlist"               element={<WishlistPage />} />
            </Route>

            {/* Admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index     element={<AdminHomePage />} />
              <Route path="users"    element={<UserManagement />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="orders"   element={<OrderManagement />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

function PublicLayout() {
  return (
    <>
      <Mainnavbar />
      <Chatbot />
      <Outlet />
    </>
  );
}
