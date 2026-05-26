// src/pages/MyOrderPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STATUS_CONFIG = {
  Processing: { color: 'bg-yellow-100 text-yellow-700', icon: '🔄' },
  Shipped:    { color: 'bg-blue-100 text-blue-700',   icon: '🚚' },
  Delivered:  { color: 'bg-green-100 text-green-700', icon: '✅' },
  Cancelled:  { color: 'bg-red-100 text-red-700',     icon: '❌' },
  Paid:       { color: 'bg-green-100 text-green-700', icon: '💳' },
  Unpaid:     { color: 'bg-gray-100 text-gray-600',   icon: '⏳' },
};

const StatusBadge = ({ label }) => {
  const cfg = STATUS_CONFIG[label] || { color: 'bg-gray-100 text-gray-600', icon: '•' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.color}`}>
      <span>{cfg.icon}</span> {label}
    </span>
  );
};

const MOCK_ORDERS = [
  {
    _id: 'WM-20240001',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    shippingAddress: { city: 'Mumbai', country: 'India' },
    orderItems: [
      { name: 'Beach Sunset Canvas', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&auto=format&fit=crop' },
    ],
    totalPrice: 1999,
    isPaid: true,
    status: 'Delivered',
  },
  {
    _id: 'WM-20240002',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    shippingAddress: { city: 'Delhi', country: 'India' },
    orderItems: [
      { name: 'Stylish Chair', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&auto=format&fit=crop' },
      { name: 'Office Desk Lamp', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&auto=format&fit=crop' },
    ],
    totalPrice: 5499,
    isPaid: true,
    status: 'Shipped',
  },
  {
    _id: 'WM-20240003',
    createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    shippingAddress: { city: 'Bangalore', country: 'India' },
    orderItems: [
      { name: 'Sony Earbuds', image: 'https://m.media-amazon.com/images/I/51B6+Iyd3ML._AC_UY218_.jpg' },
    ],
    totalPrice: 2899,
    isPaid: false,
    status: 'Processing',
  },
];

const MyOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOrders(MOCK_ORDERS);
      setLoading(false);
    }, 600);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className="bg-gray-100 rounded-2xl h-24 animate-pulse" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-gray-700">No orders yet</h3>
        <p className="text-gray-400 mt-2 mb-5">Your order history will appear here.</p>
        <Link to="/" className="inline-block bg-[#0071ce] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#004f9a] transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 mb-2">My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
          {/* Order header */}
          <div className="flex flex-wrap items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100 gap-2">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Order ID</p>
                <p className="text-sm font-bold text-gray-800">#{order._id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Date</p>
                <p className="text-sm font-medium text-gray-700">{order.createdAt}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Deliver to</p>
                <p className="text-sm font-medium text-gray-700">{order.shippingAddress.city}, {order.shippingAddress.country}</p>
              </div>
            </div>
            <StatusBadge label={order.status} />
          </div>

          {/* Order items */}
          <div className="px-5 py-4 flex flex-wrap items-center gap-4">
            <div className="flex -space-x-3">
              {order.orderItems.slice(0, 3).map((item, idx) => (
                <img
                  key={idx}
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow"
                />
              ))}
              {order.orderItems.length > 3 && (
                <div className="w-14 h-14 rounded-xl bg-gray-100 border-2 border-white shadow flex items-center justify-center text-xs font-bold text-gray-500">
                  +{order.orderItems.length - 3}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {order.orderItems.map(i => i.name).join(', ')}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{order.orderItems.length} item{order.orderItems.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-gray-400">Total</p>
              <p className="text-lg font-bold text-gray-900">₹{order.totalPrice.toLocaleString()}</p>
              <StatusBadge label={order.isPaid ? 'Paid' : 'Unpaid'} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrderPage;
