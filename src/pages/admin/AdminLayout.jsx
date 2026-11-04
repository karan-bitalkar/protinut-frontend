import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import toast from 'react-hot-toast';

const AdminLayout = ({ children, activeTab, onTabChange }) => {
  const { user, adminLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    adminLogout();
    toast.success('Admin logged out successfully');
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'orders', label: 'Orders Management', icon: '📦' },
    { id: 'inventory', label: 'Products & Stock', icon: '🥜' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'settings', label: 'System Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex font-sans">
      
      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#111827] border-r border-slate-800 flex flex-col transition-transform duration-300 md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Brand Bar */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
          <Link to="/admin/dashboard" className="flex items-center gap-2.5 text-decoration-none">
            <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-black text-white text-base">
              P
            </span>
            <div>
              <span className="font-black text-white text-base tracking-tight font-['Montserrat'] block">
                PROTINUT™
              </span>
              <span className="text-[10px] text-primary uppercase font-bold tracking-widest block -mt-1">
                Admin Console
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Admin User Mini Card */}
        <div className="p-4 mx-3 my-3 bg-[#1e293b]/70 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-amber-500 flex items-center justify-center font-bold text-white text-sm shadow">
            {user?.name ? user.name.charAt(0) : 'A'}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                {user?.role || 'ROLE_ADMIN'}
              </span>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (onTabChange) onTabChange(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold text-slate-300 bg-slate-800/60 hover:bg-slate-800 hover:text-white transition"
          >
            <span>🏪 View Public Store</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold text-red-400 bg-red-950/30 hover:bg-red-900/40 border border-red-900/40 transition cursor-pointer"
          >
            <span>🚪 Logout Admin</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 bg-[#111827] border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-slate-400 hover:text-white p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">
                Security Level 1
              </span>
              <h2 className="text-sm font-bold text-white capitalize font-['Montserrat']">
                {activeTab} Overview
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Spring Boot Gateway Active
            </span>

            <button
              type="button"
              onClick={handleLogout}
              className="text-xs font-bold text-red-400 hover:text-red-300 bg-red-950/40 px-3 py-1.5 rounded-lg border border-red-800/50 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 bg-[#0b0f19] overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;
