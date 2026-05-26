import React, { useEffect, useState } from 'react';
import MyOrderPage from './MyOrderPage';
import { useNavigate, Link } from 'react-router-dom';

const TABS = ['Orders', 'Account'];

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Orders');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) navigate("/login");
    else setUser(storedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const initials = user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile hero */}
      <div className="bg-gradient-to-r from-[#0071ce] to-[#004f9a] text-white py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#ffc220] flex items-center justify-center text-2xl font-bold text-black flex-shrink-0">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-blue-100 text-sm">{user.email}</p>
            <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold capitalize ${
              user.role === 'admin' ? 'bg-[#ffc220] text-black' : 'bg-white/20 text-white'
            }`}>
              {user.role}
            </span>
          </div>
          {user.role === 'admin' && (
            <Link to="/admin" className="ml-auto bg-[#ffc220] text-black px-5 py-2 rounded-xl font-semibold hover:bg-yellow-300 transition text-sm">
              Admin Dashboard →
            </Link>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 flex gap-6">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-[#0071ce] text-[#0071ce]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {activeTab === 'Orders' && <MyOrderPage />}

        {activeTab === 'Account' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-md">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Account Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Full Name</p>
                <p className="text-base font-medium text-gray-800">{user.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Email Address</p>
                <p className="text-base font-medium text-gray-800">{user.email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Account Role</p>
                <p className="text-base font-medium text-gray-800 capitalize">{user.role}</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 rounded-xl transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
