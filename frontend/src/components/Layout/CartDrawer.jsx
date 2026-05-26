import React from 'react';
import { IoMdClose } from 'react-icons/io';
import CartContent from '../Cart/CartContent';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { cartProducts } = useCart();

  const subtotal = cartProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const itemCount = cartProducts.reduce((sum, p) => sum + p.quantity, 0);
  const savings = Math.round(subtotal * 0.12); // mock 12% savings

  const handleCheckout = () => {
    navigate('/checkout');
    toggleCartDrawer();
  };

  return (
    <>
      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={toggleCartDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={
          `fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-2xl transform transition-transform duration-300 z-50 flex flex-col ` +
          (drawerOpen ? 'translate-x-0' : 'translate-x-full')
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Shopping Cart</h2>
            <p className="text-xs text-gray-400">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={toggleCartDrawer}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            <IoMdClose className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Empty state */}
        {cartProducts.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-lg font-semibold text-gray-700">Your cart is empty</h3>
            <p className="text-gray-400 text-sm mt-2 mb-6">Add items to your cart to get started</p>
            <button
              onClick={toggleCartDrawer}
              className="bg-[#0071ce] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#004f9a] transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <CartContent />
            </div>

            {/* Order summary */}
            <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1.5">
                <span>Subtotal ({itemCount} items)</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600 mb-1.5">
                <span>💚 You're saving</span>
                <span>₹{savings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>Delivery</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-200 pt-3 mb-4">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-[#0071ce] hover:bg-[#004f9a] text-white py-3.5 rounded-xl font-bold text-base transition shadow-md hover:shadow-lg"
              >
                Proceed to Checkout →
              </button>
              <button
                onClick={toggleCartDrawer}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-3 transition"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
