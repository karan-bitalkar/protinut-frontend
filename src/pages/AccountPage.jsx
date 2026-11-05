import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext';
import { useOrders } from '../OrderContext';
import toast from 'react-hot-toast';
import InvoiceModal from '../InvoiceModal';
import './Pages.css';

const AccountPage = ({ wishlistCount = 0, onClearWishlist, onLogout, onOpenCart }) => {
  const { user, logout } = useAuth();
  const { totalCartCount, resetCart } = useCart();
  const { orders, resetOrders } = useOrders();
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    } else {
      logout();
      toast.success('Logged out successfully');
      navigate('/');
    }
  };

  const handleResetForTesting = () => {
    if (window.confirm('Reset Cart, Wishlist, and Orders to 0 items to test fresh login?')) {
      if (resetCart) resetCart();
      if (resetOrders) resetOrders();
      if (onClearWishlist) onClearWishlist();
      toast.success('State reset to 0 items across Cart, Wishlist, and Orders!');
    }
  };

  const handleCartAction = () => {
    if (onOpenCart) {
      onOpenCart();
    } else {
      navigate('/cart');
    }
  };

  const handleInvoiceAction = () => {
    if (orders.length > 0) {
      setIsInvoiceOpen(true);
    } else {
      toast.error('No orders placed yet. Please place an order first!');
    }
  };

  return (
    <div className="account-page min-h-[85vh] bg-[#faf5ee] pb-28 md:pb-16 font-sans">
      
      {/* ── Page Header / Breadcrumb (Desktop) ── */}
      <div className="bg-[#fffcf8] border-b border-[#ebdcd0] py-6 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#8c7a6e] uppercase tracking-wider">
              <Link to="/" className="text-[#ef5323] hover:underline">Home</Link> / <span>My Profile</span>
            </span>
            <h1 className="font-['Montserrat'] text-2xl sm:text-3xl font-black text-[#2b1810] mt-1 mb-0.5">
              My Account
            </h1>
            <p className="text-sm text-[#6a5a50] hidden sm:block">
              Manage your personal profile, orders, cart, and tax invoices.
            </p>
          </div>

          {/* Quick Logout Button (Desktop) */}
          <button
            type="button"
            onClick={handleLogoutClick}
            className="hidden md:inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold px-4 py-2 rounded-full transition"
          >
            <span>🚪 Logout</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 mt-5">
        
        {/* ── User Profile Banner (Native App Style) ── */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#ebdcd0] p-5 sm:p-7 shadow-sm mb-5">
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* User Avatar Initial */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#ef5323] to-[#d84417] text-white flex items-center justify-center text-2xl sm:text-3xl font-black font-['Montserrat'] shadow-md flex-shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'P'}
            </div>

            {/* User Meta */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 bg-[#fff3ec] text-[#ef5323] border border-[#fed6be] text-[10px] sm:text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
                <span>★</span> PROTINUT PRIME MEMBER
              </div>
              <h2 className="font-['Montserrat'] text-lg sm:text-2xl font-black text-[#2b1810] truncate">
                {user?.name || 'Valued Customer'}
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-[#6a5a50] mt-0.5">
                <span className="truncate">📧 {user?.email || user?.identifier || 'customer@protinut.com'}</span>
                <span>📱 {user?.phone || '+91 98765 43210'}</span>
              </div>
            </div>

            {/* Test Reset Button */}
            <button
              type="button"
              onClick={handleResetForTesting}
              title="Reset state to 0 for testing"
              className="hidden lg:inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-300 transition"
            >
              🔄 Reset
            </button>
          </div>
        </div>

        {/* ── Quick Stats Strip (3 Tabs) ── */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          
          <Link
            to="/orders"
            className="bg-white border border-[#ebdcd0] rounded-xl p-3 text-center shadow-xs hover:border-[#ef5323] transition flex flex-col justify-center no-underline"
          >
            <span className="text-[10px] sm:text-xs font-bold text-[#8c7a6e] uppercase tracking-wider">Orders</span>
            <span className="font-['Montserrat'] text-xl sm:text-2xl font-black text-[#2b1810] my-0.5">
              {orders.length}
            </span>
            <span className="text-[10px] sm:text-xs text-[#ef5323] font-bold">Past Orders</span>
          </Link>

          <Link
            to="/wishlist"
            className="bg-white border border-[#ebdcd0] rounded-xl p-3 text-center shadow-xs hover:border-[#ef5323] transition flex flex-col justify-center no-underline"
          >
            <span className="text-[10px] sm:text-xs font-bold text-[#8c7a6e] uppercase tracking-wider">Wishlist</span>
            <span className="font-['Montserrat'] text-xl sm:text-2xl font-black text-[#2b1810] my-0.5">
              {wishlistCount}
            </span>
            <span className="text-[10px] sm:text-xs text-[#ef5323] font-bold">Saved Jars</span>
          </Link>

          <button
            type="button"
            onClick={handleCartAction}
            className="bg-white border border-[#ebdcd0] rounded-xl p-3 text-center shadow-xs hover:border-[#ef5323] transition flex flex-col justify-center cursor-pointer"
          >
            <span className="text-[10px] sm:text-xs font-bold text-[#8c7a6e] uppercase tracking-wider">Cart</span>
            <span className="font-['Montserrat'] text-xl sm:text-2xl font-black text-[#2b1810] my-0.5">
              {totalCartCount}
            </span>
            <span className="text-[10px] sm:text-xs text-[#ef5323] font-bold">In Cart</span>
          </button>

        </div>

        {/* ── LARGE, LIST-STYLE BUTTONS (Native Flipkart/Myntra Profile Menu) ── */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#ebdcd0] shadow-sm overflow-hidden divide-y divide-gray-100 mb-6">
          
          {/* 1. My Orders */}
          <Link
            to="/orders"
            className="flex items-center justify-between p-4 sm:p-5 hover:bg-[#fff9f5] active:bg-[#fff3ec] transition no-underline group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-orange-50 text-[#ef5323] flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform">
                📦
              </div>
              <div>
                <h3 className="font-['Montserrat'] text-sm sm:text-base font-bold text-gray-900 m-0">
                  My Orders
                </h3>
                <p className="text-xs text-gray-500 m-0 mt-0.5">
                  Track active shipments, view history & download receipts
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {orders.length > 0 && (
                <span className="bg-orange-100 text-[#ef5323] text-xs font-black px-2.5 py-0.5 rounded-full">
                  {orders.length}
                </span>
              )}
              <svg className="w-5 h-5 text-gray-400 group-hover:text-[#ef5323] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* 2. My Wishlist */}
          <Link
            to="/wishlist"
            className="flex items-center justify-between p-4 sm:p-5 hover:bg-[#fff9f5] active:bg-[#fff3ec] transition no-underline group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform">
                ❤️
              </div>
              <div>
                <h3 className="font-['Montserrat'] text-sm sm:text-base font-bold text-gray-900 m-0">
                  My Wishlist
                </h3>
                <p className="text-xs text-gray-500 m-0 mt-0.5">
                  Your saved peanut butter flavors & favorites
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {wishlistCount > 0 && (
                <span className="bg-rose-100 text-rose-700 text-xs font-black px-2.5 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
              <svg className="w-5 h-5 text-gray-400 group-hover:text-[#ef5323] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* 3. My Shopping Cart */}
          <button
            type="button"
            onClick={handleCartAction}
            className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-[#fff9f5] active:bg-[#fff3ec] transition text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform">
                🛍️
              </div>
              <div>
                <h3 className="font-['Montserrat'] text-sm sm:text-base font-bold text-gray-900 m-0">
                  My Shopping Cart
                </h3>
                <p className="text-xs text-gray-500 m-0 mt-0.5">
                  Review selected jars, apply coupons & checkout
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {totalCartCount > 0 && (
                <span className="bg-amber-100 text-amber-800 text-xs font-black px-2.5 py-0.5 rounded-full">
                  {totalCartCount} Jars
                </span>
              )}
              <svg className="w-5 h-5 text-gray-400 group-hover:text-[#ef5323] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          {/* 4. Tax Invoice */}
          <button
            type="button"
            onClick={handleInvoiceAction}
            className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-[#fff9f5] active:bg-[#fff3ec] transition text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform">
                🧾
              </div>
              <div>
                <h3 className="font-['Montserrat'] text-sm sm:text-base font-bold text-gray-900 m-0">
                  Download Tax Invoice
                </h3>
                <p className="text-xs text-gray-500 m-0 mt-0.5">
                  Official GST invoice receipt (CGST 2.5% + SGST 2.5%)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                GSTIN Verified
              </span>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-[#ef5323] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          {/* 5. Explore Products */}
          <Link
            to="/products"
            className="flex items-center justify-between p-4 sm:p-5 hover:bg-[#fff9f5] active:bg-[#fff3ec] transition no-underline group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-orange-50 text-[#ef5323] flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform">
                🥜
              </div>
              <div>
                <h3 className="font-['Montserrat'] text-sm sm:text-base font-bold text-gray-900 m-0">
                  Explore Products
                </h3>
                <p className="text-xs text-gray-500 m-0 mt-0.5">
                  Browse 100% slow-roasted natural peanut butter range
                </p>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-[#ef5323] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {/* 6. Help & Support */}
          <Link
            to="/contact"
            className="flex items-center justify-between p-4 sm:p-5 hover:bg-[#fff9f5] active:bg-[#fff3ec] transition no-underline group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform">
                💬
              </div>
              <div>
                <h3 className="font-['Montserrat'] text-sm sm:text-base font-bold text-gray-900 m-0">
                  Help & Customer Support
                </h3>
                <p className="text-xs text-gray-500 m-0 mt-0.5">
                  Direct support: +91 830 830 2301 • Dharashiv, Maharashtra
                </p>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-[#ef5323] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </Link>

        </div>

        {/* ── Prominent Large Tap Logout Button (Mobile & Desktop) ── */}
        <div className="mb-8">
          <button
            type="button"
            onClick={handleLogoutClick}
            className="w-full bg-white hover:bg-red-50 active:bg-red-100 text-red-600 border-1.5 border-red-200 hover:border-red-400 font-['Montserrat'] font-extrabold text-sm sm:text-base py-4 px-6 rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout from Account</span>
          </button>
        </div>

      </div>

      {/* Official Tax Invoice Modal */}
      {isInvoiceOpen && orders.length > 0 && (
        <InvoiceModal
          isOpen={isInvoiceOpen}
          onClose={() => setIsInvoiceOpen(false)}
          order={orders[0]}
        />
      )}
    </div>
  );
};

export default AccountPage;
