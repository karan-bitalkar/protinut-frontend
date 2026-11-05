import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useOrders } from '../OrderContext';
import { useAuth } from '../AuthContext';
import InvoiceModal from '../InvoiceModal';
import toast from 'react-hot-toast';

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orders } = useOrders();
  const { user } = useAuth();

  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Use order passed from navigation state, or fall back to the most recent order
  const order = location.state?.order || (orders.length > 0 ? orders[0] : null);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f1f3f6] py-16 px-4 font-sans text-center">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            📦
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2 font-['Montserrat']">No Recent Order Found</h2>
          <p className="text-sm text-gray-500 mb-6">
            Looks like you haven't placed an order recently or your session refreshed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/products"
              className="bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg shadow transition"
            >
              Start Shopping →
            </Link>
            <Link
              to="/orders"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleCopyOrderId = () => {
    try {
      navigator.clipboard.writeText(order.id);
      setCopied(true);
      toast.success('Order ID copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.success(`Order ID: ${order.id}`);
    }
  };

  const items = Array.isArray(order.items) ? order.items : [];
  const address = order.address || {};
  const pricing = order.pricing || {
    subtotal: order.subtotal || 0,
    discount: order.discount || 0,
    cgst: order.cgst || 0,
    sgst: order.sgst || 0,
    totalGst: order.totalGst || 0,
    deliveryCharge: order.deliveryCharge || 0,
    grandTotal: order.grandTotal || 0
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] py-8 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ── 1. SUCCESS BANNER ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10 text-center relative overflow-hidden">
          {/* Decorative background accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 via-primary to-[#fb641b]" />

          {/* Animated Success Checkmark */}
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner ring-8 ring-green-50">
            <svg className="w-10 h-10 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <span className="inline-block text-xs font-bold uppercase tracking-widest text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200 mb-2">
            ✓ Order Placed Successfully
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 font-['Montserrat']">
            Thank you for your order!
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-lg mx-auto">
            We have received your order. We are preparing your fresh peanut butter jars at our Dharashiv facility.
          </p>

          {/* Order ID & Date Pill */}
          <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 mt-4 text-xs sm:text-sm">
            <span className="text-gray-500">Order ID:</span>
            <strong className="font-mono text-gray-900 font-bold">{order.id}</strong>
            <button
              onClick={handleCopyOrderId}
              type="button"
              className="text-primary hover:text-primary-hover font-semibold ml-1 text-xs underline"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">Date: {order.date}</span>
          </div>

          {/* Action CTAs: Invoice, Track, Orders */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsInvoiceOpen(true)}
              className="bg-[#fb641b] hover:bg-[#e85a14] active:bg-[#d44e10] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg shadow-md transition flex items-center gap-2"
            >
              <span>🧾 Download Tax Invoice</span>
            </button>

            <button
              type="button"
              onClick={() => navigate(`/orders/${order.id}`)}
              className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg shadow-sm transition flex items-center gap-2"
            >
              <span>🚚 Track Order Live</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <Link
              to="/orders"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg transition"
            >
              View My Orders
            </Link>

            <Link
              to="/products"
              className="bg-transparent hover:bg-gray-50 text-primary border border-primary/40 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* ── 2. ORDER DETAILS GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT: Ordered Items */}
          <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                Items In This Order ({items.length})
              </h2>
              <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                Confirmed
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {items.map((item, idx) => (
                <div key={idx} className="p-4 sm:p-5 flex items-center gap-4 hover:bg-gray-50/50 transition">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#faf3e8] rounded-xl p-2 flex items-center justify-center border border-amber-100 flex-shrink-0">
                    <img
                      src={item.image || '/products/classy-crunch.png'}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate font-['Montserrat']">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Weight: <span className="font-semibold text-gray-700">{item.weight || item.selectedWeight || '550gm'}</span>
                      {' • '}Qty: <span className="font-semibold text-gray-700">{item.quantity}</span>
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm sm:text-base font-black text-gray-900">
                        ₹{item.finalPrice || item.price}
                      </span>
                      {item.originalPrice && item.originalPrice > (item.finalPrice || item.price) && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{item.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block">Total</span>
                    <span className="text-sm sm:text-base font-bold text-primary">
                      ₹{((item.finalPrice || item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Timeline Guarantee */}
            <div className="p-4 bg-orange-50/60 border-t border-orange-100 flex items-center gap-3 text-xs text-orange-950 font-medium">
              <span className="text-lg">🚚</span>
              <span>
                Estimated Delivery: <strong>2 - 4 Business Days</strong> via Express Courier.
              </span>
            </div>
          </div>

          {/* RIGHT: Delivery Address & Price Details */}
          <div className="lg:col-span-5 space-y-6">

            {/* Delivery Address Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Delivery Address
                </h3>
                <span className="text-[11px] font-bold text-primary">📍 Akurdi / Home</span>
              </div>
              <div className="text-sm">
                <div className="font-bold text-gray-900 text-base">
                  {address.name || user?.name || 'Customer'}
                </div>
                <div className="text-xs font-semibold text-gray-600 mt-0.5">
                  Mobile: {address.mobile || user?.phone || '9876543210'}
                </div>
                <div className="text-xs text-gray-600 mt-2 leading-relaxed">
                  {address.addressLine || 'Flat 101, Blossom Residency, Akurdi Station Road'}, {address.city || 'Pune'}, {address.state || 'Maharashtra'} - <strong className="text-gray-900">{address.pincode || '411035'}</strong>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
                <span>Payment Mode:</span>
                <strong className="text-gray-800">{order.paymentMethod || 'Online (UPI)'}</strong>
              </div>
            </div>

            {/* Final Price Breakdown (CGST 2.5% + SGST 2.5%) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-3 text-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 pb-2 border-b border-gray-100">
                Price Breakdown
              </h3>

              <div className="flex justify-between text-gray-700">
                <span>Items Subtotal</span>
                <span className="font-semibold">₹{Number(pricing.subtotal).toFixed(2)}</span>
              </div>

              {Number(pricing.discount) > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount</span>
                  <span>− ₹{Number(pricing.discount).toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-700">
                <span>Delivery Charges</span>
                {Number(pricing.deliveryCharge) === 0 ? (
                  <span className="font-bold text-green-600 uppercase">Free</span>
                ) : (
                  <span className="font-semibold">₹{Number(pricing.deliveryCharge).toFixed(2)}</span>
                )}
              </div>

              <div className="flex justify-between text-gray-700">
                <span className="flex items-center gap-1.5">
                  <span>CGST (2.5%)</span>
                  <span className="bg-orange-100 text-primary text-[10px] font-black px-1.5 py-0.5 rounded">2.5%</span>
                </span>
                <span className="font-semibold">₹{Number(pricing.cgst).toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span className="flex items-center gap-1.5">
                  <span>SGST (2.5%)</span>
                  <span className="bg-orange-100 text-primary text-[10px] font-black px-1.5 py-0.5 rounded">2.5%</span>
                </span>
                <span className="font-semibold">₹{Number(pricing.sgst).toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-base font-black text-gray-900 pt-3 border-t border-dashed border-gray-200 font-['Montserrat']">
                <span>Total Amount Paid</span>
                <span className="text-primary text-xl">₹{Number(pricing.grandTotal).toFixed(2)}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Unified Premium Tax Invoice Modal */}
      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        order={order}
      />
    </div>
  );
};

export default OrderSuccessPage;
