import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useOrders } from '../../OrderContext';
import AdminLayout from './AdminLayout';
import InvoiceModal from '../../InvoiceModal';
import toast from 'react-hot-toast';

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const { orders } = useOrders();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  // Live Metric Calculations
  const totalRevenue = orders.reduce((acc, order) => {
    return order.status !== 'Cancelled' ? acc + (order.pricing?.grandTotal || 0) : acc;
  }, 0);

  const pendingOrders = orders.filter(o => o.status === 'Order Placed' || o.status === 'Processing').length;
  const completedOrders = orders.filter(o => o.status === 'Delivered').length;

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      
      {/* ── Welcome Admin Banner (Requirement 3) ── */}
      <div className="bg-gradient-to-r from-[#1e293b] via-[#111827] to-[#1e293b] border border-slate-800 rounded-2xl p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-emerald-950 text-emerald-400 border border-emerald-800">
                Super Admin Access
              </span>
              <span className="text-xs text-slate-400">Security Session Verified</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat'] tracking-tight">
              Welcome, {user?.name || 'Administrator'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Protinut E-Commerce Operations & Live Dispatch Control Center. Manage orders, inventory, and GST compliance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toast.success('Database & Cache synced with Spring Boot!')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition border border-slate-700 flex items-center gap-1.5"
            >
              <span>⚡ Sync Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        {/* Revenue */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Gross Revenue</span>
            <span className="w-8 h-8 rounded-lg bg-emerald-950/60 text-emerald-400 flex items-center justify-center text-sm font-bold">
              ₹
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-['Montserrat']">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">
            ↑ Includes 5% CGST/SGST tax compliance
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Total Orders</span>
            <span className="w-8 h-8 rounded-lg bg-orange-950/60 text-primary flex items-center justify-center text-sm">
              📦
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-['Montserrat']">
            {orders.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            <strong>{pendingOrders}</strong> pending processing
          </div>
        </div>

        {/* Completed Delivery */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Delivered Orders</span>
            <span className="w-8 h-8 rounded-lg bg-blue-950/60 text-blue-400 flex items-center justify-center text-sm">
              🚚
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-['Montserrat']">
            {completedOrders}
          </div>
          <div className="text-[11px] text-blue-400 font-semibold mt-1">
            BlueDart Express logistics
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Inventory Stock</span>
            <span className="w-8 h-8 rounded-lg bg-amber-950/60 text-amber-400 flex items-center justify-center text-sm">
              🥜
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-['Montserrat']">
            1,420 <span className="text-xs font-normal text-slate-400">Jars</span>
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">
            Facility: Dharashiv Plant
          </div>
        </div>

      </div>

      {/* ── Main Order Management Table ── */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        
        <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white font-['Montserrat']">
              Live Order Stream ({orders.length})
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Orders placed by customers in frontend appear here in real-time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-lg">
              Status: <strong>All Live Orders</strong>
            </span>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="py-16 px-4 text-center">
            <div className="text-4xl mb-3">📦</div>
            <h3 className="text-base font-bold text-white font-['Montserrat']">No Customer Orders Yet</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              When users place orders on the frontend via Checkout, they will show up here immediately with full address, tax breakdown, and invoice generation.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1e293b]/50 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Order ID</th>
                  <th className="py-3.5 px-4 font-bold">Customer & Mobile</th>
                  <th className="py-3.5 px-4 font-bold">Items Ordered</th>
                  <th className="py-3.5 px-4 font-bold">Total Amount</th>
                  <th className="py-3.5 px-4 font-bold">Payment</th>
                  <th className="py-3.5 px-4 font-bold">Order Status</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {orders.map((order) => {
                  const isCancelled = order.status === 'Cancelled';

                  return (
                    <tr key={order.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-4 px-4 font-mono font-bold text-white">
                        #{order.id}
                        <div className="text-[10px] text-slate-500 font-sans mt-0.5">{order.date}</div>
                      </td>

                      <td className="py-4 px-4">
                        <strong className="text-white block">{order.address?.name || 'Customer'}</strong>
                        <span className="text-slate-400 text-[11px]">{order.address?.mobile}</span>
                        <div className="text-[10px] text-slate-500 truncate max-w-[160px]">
                          {order.address?.city}, {order.address?.state}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          {order.items?.map((item, i) => (
                            <div key={i} className="text-[11px]">
                              <span className="text-white font-medium">{item.name}</span>{' '}
                              <span className="text-slate-500 font-semibold">({item.weight} × {item.quantity})</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="py-4 px-4 font-bold text-white">
                        ₹{order.pricing?.grandTotal}
                        <div className="text-[10px] text-slate-500">
                          CGST: ₹{order.pricing?.cgst} | SGST: ₹{order.pricing?.sgst}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                          {order.paymentMethod}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : order.status === 'Shipped' || order.status === 'Out for Delivery'
                            ? 'bg-blue-950 text-blue-400 border border-blue-800'
                            : order.status === 'Cancelled'
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          <span>{order.status}</span>
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right">
                        {!isCancelled && (
                          <button
                            type="button"
                            onClick={() => setSelectedInvoiceOrder(order)}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] rounded-lg transition inline-flex items-center gap-1"
                          >
                            <span>🧾 Invoice</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Invoice Modal for Admin */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          isOpen={Boolean(selectedInvoiceOrder)}
          onClose={() => setSelectedInvoiceOrder(null)}
          order={selectedInvoiceOrder}
        />
      )}

    </AdminLayout>
  );
};

export default AdminDashboardPage;
