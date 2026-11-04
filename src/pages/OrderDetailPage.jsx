import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useOrders } from '../OrderContext';
import InvoiceModal from '../InvoiceModal';
import CancelOrderModal from '../CancelOrderModal';
import toast from 'react-hot-toast';

const STEPS = [
  'Order Placed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const { getOrderById, cancelOrder } = useOrders();
  const navigate = useNavigate();

  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [orderId]);

  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f1f3f6] py-16 px-4 text-center font-sans">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <div className="text-4xl mb-3">🔍</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-sm text-gray-500 mb-6">
            We couldn't find an order with ID <span className="font-mono font-bold">#{orderId}</span>.
          </p>
          <Link
            to="/orders"
            className="inline-block bg-primary hover:bg-primary-hover text-white font-bold text-sm px-6 py-2.5 rounded-lg shadow"
          >
            ← View All Orders
          </Link>
        </div>
      </div>
    );
  }

  const isCancelled = order.status === 'Cancelled';
  let currentStepIdx = order.statusIndex;
  if (order.status === 'Order Placed') currentStepIdx = 0;
  else if (order.status === 'Processing') currentStepIdx = 1;
  else if (order.status === 'Shipped') currentStepIdx = 2;
  else if (order.status === 'Out for Delivery') currentStepIdx = 3;
  else if (order.status === 'Delivered') currentStepIdx = 4;

  const handleCancel = () => {
    setIsCancelModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] py-8 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Link to="/orders" className="text-primary hover:underline font-bold">← All Orders</Link>
            <span>/</span>
            <span className="text-gray-700">Order #{order.id}</span>
          </div>
          <span className="text-gray-400">Placed on {order.date}</span>
        </div>

        {/* ── 1. FLIPKART VISUAL TIMELINE TRACKER ── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-gray-200 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                Tracking Details
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 font-['Montserrat'] mt-0.5">
                Order #{order.id}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Dispatched from PROTINUT Nutrition facility in <strong className="text-gray-800">Dharashiv, Maharashtra</strong>.
              </p>
            </div>

            {/* Actions: Download Invoice & Cancel Order */}
            <div className="flex items-center gap-3 flex-wrap">
              
              {/* Flipkart Download Invoice Button (Hidden if cancelled) */}
              {!isCancelled && (
                <button
                  type="button"
                  onClick={() => setIsInvoiceOpen(true)}
                  className="px-4 py-2.5 text-xs font-bold text-gray-700 hover:text-gray-950 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg shadow-sm transition flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Invoice</span>
                </button>
              )}

              {/* Cancel Button (Enabled if order is not yet Shipped) */}
              {order.canCancel && !isCancelled ? (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2.5 text-xs font-bold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 border border-red-300 rounded-lg shadow-sm transition-all duration-150 flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Cancel Order</span>
                </button>
              ) : isCancelled ? (
                <span className="px-3 py-1.5 bg-red-100 text-red-800 text-xs font-bold rounded-full border border-red-200 flex items-center gap-1">
                  ✕ Order Cancelled
                </span>
              ) : (
                <span className="px-3.5 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
                  Shipped (Cannot be cancelled)
                </span>
              )}
            </div>
          </div>

          {/* If Cancelled, show cancellation callout */}
          {isCancelled && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-start gap-3 text-red-900">
              <span className="text-xl">⚠️</span>
              <div>
                <strong className="text-sm font-bold block">
                  This order has been cancelled {order.cancelReason ? `(${order.cancelReason})` : ''}
                </strong>
                <p className="text-xs text-red-700 mt-0.5">
                  Refund of ₹{order.pricing.grandTotal} will be credited to your original payment method ({order.paymentMethod}) within 2-4 business days.
                </p>
              </div>
            </div>
          )}

          {/* Desktop Stepper Bar */}
          <div className="relative my-4 hidden md:block">
            {/* Horizontal Line background */}
            <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200 -z-0" />
            
            {/* Active Green Progress Line */}
            {!isCancelled && (
              <div
                className="absolute top-5 left-10 h-1 bg-green-500 transition-all duration-500 -z-0"
                style={{
                  width: `${(currentStepIdx / (STEPS.length - 1)) * (100 - 15)}%`
                }}
              />
            )}

            <div className="grid grid-cols-5 relative z-10 text-center">
              {STEPS.map((stepName, idx) => {
                const isCompleted = !isCancelled && idx <= currentStepIdx;
                const isCurrent = !isCancelled && idx === currentStepIdx;
                const timelineEntry = order.timeline?.find(t => t.step === stepName);

                return (
                  <div key={stepName} className="flex flex-col items-center">
                    
                    {/* Circle / Icon */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm ${
                        isCompleted
                          ? 'bg-green-600 text-white ring-4 ring-green-100'
                          : isCancelled && idx <= currentStepIdx
                          ? 'bg-red-500 text-white'
                          : 'bg-white border-2 border-gray-300 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    {/* Step Title */}
                    <div className="mt-3">
                      <span
                        className={`text-xs font-bold block ${
                          isCurrent
                            ? 'text-green-700 font-extrabold'
                            : isCompleted
                            ? 'text-gray-900'
                            : 'text-gray-400'
                        }`}
                      >
                        {stepName}
                        {isCurrent && (
                          <span className="inline-block w-2 h-2 rounded-full bg-green-600 ml-1 animate-ping" />
                        )}
                      </span>

                      {/* Date */}
                      <span className="text-[11px] text-gray-500 block mt-0.5 max-w-[130px] mx-auto leading-tight">
                        {timelineEntry?.date || (idx < currentStepIdx ? 'Completed' : 'Upcoming')}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Vertical Stepper */}
          <div className="md:hidden space-y-6 pl-4 border-l-2 border-gray-200 my-6">
            {STEPS.map((stepName, idx) => {
              const isCompleted = !isCancelled && idx <= currentStepIdx;
              const isCurrent = !isCancelled && idx === currentStepIdx;
              const timelineEntry = order.timeline?.find(t => t.step === stepName);

              return (
                <div key={stepName} className="relative pl-6">
                  <div
                    className={`absolute -left-[25px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCompleted
                        ? 'bg-green-600 text-white ring-4 ring-green-100'
                        : isCancelled && idx <= currentStepIdx
                        ? 'bg-red-500 text-white'
                        : 'bg-white border-2 border-gray-300 text-gray-400'
                    }`}
                  >
                    {isCompleted ? '✓' : idx + 1}
                  </div>

                  <div>
                    <h4 className={`text-sm font-bold ${isCurrent ? 'text-green-700' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                      {stepName}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {timelineEntry?.date || (idx < currentStepIdx ? 'Completed' : 'Upcoming')}
                    </p>
                    {timelineEntry?.desc && (
                      <p className="text-xs text-gray-400 mt-0.5">{timelineEntry.desc}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timeline Step Explanations (Flipkart Style) */}
          <div className="mt-8 bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Detailed Activity Log
            </h4>
            <div className="space-y-2 text-xs">
              {order.timeline?.map((entry, i) => (
                <div key={i} className="flex items-start justify-between gap-4 py-1.5 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${entry.completed ? 'bg-green-600' : 'bg-gray-300'}`} />
                    <span className="font-bold text-gray-800">{entry.step}</span>
                    <span className="text-gray-500">— {entry.desc}</span>
                  </div>
                  <span className="text-gray-400 font-mono whitespace-nowrap">{entry.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── 2. ORDER DETAILS GRID (Address, Items, Price Details) ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Items List & Delivery Address */}
          <div className="md:col-span-8 space-y-6">
            
            {/* Ordered Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Ordered Products ({order.items.length} {order.items.length === 1 ? 'item' : 'items'})
                </h3>
              </div>

              <div className="p-4 divide-y divide-gray-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-amber-50 rounded-xl p-1.5 flex items-center justify-center border border-amber-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 font-['Montserrat']">{item.name}</h4>
                        <div className="text-xs text-gray-500 mt-0.5">
                          Size: <span className="font-semibold text-gray-700">{item.weight}</span> • Qty: {item.quantity}
                        </div>
                        <div className="text-xs text-green-700 font-bold mt-1">
                          100% Quality Guaranteed
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black text-gray-900 font-['Montserrat'] block">
                        ₹{item.finalPrice * item.quantity}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{(item.originalPrice || Math.round(item.finalPrice * 1.35)) * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Delivery Address
              </h3>
              <div className="text-sm">
                <div className="flex items-center gap-2">
                  <strong className="text-gray-900 font-bold text-base">{order.address.name}</strong>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded font-bold uppercase">
                    HOME
                  </span>
                </div>
                <p className="text-gray-600 text-xs mt-1.5">
                  {order.address.addressLine}, {order.address.city}, {order.address.state} - <strong className="text-gray-900">{order.address.pincode}</strong>
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  Phone Number: <strong className="text-gray-800">{order.address.mobile}</strong>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Price Details & Payment Summary */}
          <div className="md:col-span-4 space-y-6">
            
            {/* Price Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Payment Breakdown
                </h3>
              </div>

              <div className="p-5 space-y-3 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{order.pricing.subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Discount</span>
                  <span className="font-bold text-green-600">− ₹{order.pricing.discount}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center gap-1.5">
                    <span>CGST (2.5%)</span>
                    <span className="bg-orange-100 text-primary text-[10px] font-black px-1.5 py-0.5 rounded">
                      2.5%
                    </span>
                  </span>
                  <span className="font-semibold">₹{order.pricing.cgst ?? Math.round(order.pricing.subtotal * 0.025)}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center gap-1.5">
                    <span>SGST (2.5%)</span>
                    <span className="bg-orange-100 text-primary text-[10px] font-black px-1.5 py-0.5 rounded">
                      2.5%
                    </span>
                  </span>
                  <span className="font-semibold">₹{order.pricing.sgst ?? Math.round(order.pricing.subtotal * 0.025)}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Delivery Charge</span>
                  {order.pricing.deliveryCharge === 0 ? (
                    <span className="font-bold text-green-600 uppercase">Free</span>
                  ) : (
                    <span className="font-semibold">₹{order.pricing.deliveryCharge}</span>
                  )}
                </div>

                <div className="flex justify-between text-base font-black text-gray-900 pt-3 border-t border-dashed border-gray-200 font-['Montserrat']">
                  <span>Total Amount</span>
                  <span className="text-primary text-lg">₹{order.pricing.grandTotal}</span>
                </div>

                <div className="pt-2 text-xs text-gray-500 flex items-center justify-between border-t border-gray-100">
                  <span>Payment Mode:</span>
                  <span className="font-bold text-gray-800">{order.paymentMethod}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-2">
                {!isCancelled && (
                  <button
                    type="button"
                    onClick={() => setIsInvoiceOpen(true)}
                    className="w-full bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-bold text-xs py-2.5 px-3 rounded-lg shadow-sm transition flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download Tax Invoice</span>
                  </button>
                )}

                <Link
                  to="/contact"
                  className="w-full text-center block text-xs font-bold text-primary hover:underline py-1"
                >
                  Need Help with this Order?
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ── Flipkart Style Tax Invoice Modal ── */}
      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        order={order}
      />

      {/* ── Flipkart Style Cancel Order Modal ── */}
      <CancelOrderModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirmCancel={cancelOrder}
        order={order}
      />

    </div>
  );
};

export default OrderDetailPage;
