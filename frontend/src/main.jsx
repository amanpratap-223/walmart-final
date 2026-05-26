
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext';  // ✅ import CartProvider
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  let [resource, config] = args;
  if (typeof resource === 'string' && resource.startsWith('/api')) {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:9000';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    resource = `${cleanBase}${resource}`;
  }
  return originalFetch(resource, config);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider> {/* ✅ wrap App inside CartProvider */}
      <App />
    </CartProvider>
  </StrictMode>
);
