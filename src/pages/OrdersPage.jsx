import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useOrders } from '../OrderContext';
import { useAuth } from '../AuthContext';
import InvoiceModal from '../InvoiceModal';
import CancelOrderModal from '../CancelOrderModal';

const OrdersPage = () => {
  const { orders, cancelOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const [selectedCancelOrder, setSelectedCancelOrder] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('invoice') === 'latest' && orders.length > 0) {
      setSelectedInvoiceOrder(orders[0]);
    }
  }, [location.search, orders]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Shipped':
      case 'Out for Delivery':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] py-8 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <Link to="/" className="text-primary hover:underline font-bold">Home</Link>
          <span>/</span>
          <span className="text-gray-700">My Orders</span>
        </div>

        {/* Page Title */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 font-['Montserrat'] flex items-center gap-2">
              <span>My Orders</span>
              <span className="text-xl">📦</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Track, view history, and manage all orders placed by <strong>{user?.name || 'Customer'}</strong>.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            {orders.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedInvoiceOrder(orders[0])}
                className="inline-flex items-center gap-1.5 bg-orange-50 hover:bg-orange-100 text-[#ea580c] border border-orange-300 text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition"
              >
                <span>🧾 Tax Invoice</span>
              </button>
            )}
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg shadow transition"
            >
              <span>Browse Products</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {orders.length === 0 ? (
          /* Empty Orders State */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-16 px-6 text-center max-w-lg mx-auto my-8">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl shadow-inner">
              📦
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 font-['Montserrat']">No Orders Found. Start Shopping!</h2>
            <p className="text-sm text-gray-500 mb-6">
              You haven't ordered any Protinut peanut butters yet. Stock up on healthy, delicious protein jars now!
            </p>
            <Link
              to="/products"
              className="inline-block bg-primary hover:bg-primary-hover text-white font-bold text-sm px-6 py-3 rounded-lg shadow"
            >
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const firstItem = order.items[0];
              const remainingCount = order.items.length - 1;
              const isCancelled = order.status === 'Cancelled';

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Top Order Meta Bar (Flipkart Style) */}
                  <div className="bg-gray-50 px-5 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="text-gray-400 font-bold uppercase">ORDER PLACED</span>
                        <div className="text-gray-800 font-semibold">{order.date}</div>
                      </div>
                      <span className="text-gray-300">|</span>
                      <div>
                        <span className="text-gray-400 font-bold uppercase">TOTAL AMOUNT</span>
                        <div className="text-gray-900 font-black text-sm font-['Montserrat']">
                          ₹{order.pricing.grandTotal}
                        </div>
                      </div>
                      <span className="text-gray-300">|</span>
                      <div className="hidden sm:block">
                        <span className="text-gray-400 font-bold uppercase">SHIP TO</span>
                        <div className="text-gray-800 font-semibold">{order.address.name}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-gray-600 font-bold">
                        #{order.id}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(order.status)}`}>
                        ● {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Content */}
                  <div className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    
                    {/* Items Preview */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-50 rounded-xl p-2 flex items-center justify-center border border-amber-100 flex-shrink-0">
                        <img
                          src={firstItem?.image || '/products/classy-crunch.png'}
                          alt={firstItem?.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-gray-900 font-['Montserrat'] truncate">
                          {firstItem?.name}
                          {remainingCount > 0 && (
                            <span className="text-xs font-normal text-gray-500 ml-2">
                              + {remainingCount} other {remainingCount === 1 ? 'item' : 'items'}
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Weight: <span className="font-semibold text-gray-700">{firstItem?.weight}</span> • Qty: {firstItem?.quantity}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Payment: <span className="font-medium text-gray-700">{order.paymentMethod}</span>
                        </p>
                      </div>
                    </div>

                    {/* Actions: Download Invoice, Track Order & Cancel Order */}
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                      
                      {/* Download Invoice Button (Hidden for Cancelled orders or shows "Not Available") */}
                      {!isCancelled ? (
                        <button
                          type="button"
                          onClick={() => setSelectedInvoiceOrder(order)}
                          className="px-4 py-2 text-xs font-bold text-[#ea580c] hover:text-[#c2410c] bg-orange-50 hover:bg-orange-100 border border-orange-300 rounded-lg shadow-sm transition flex items-center gap-1.5"
                          title="Download Official Tax Invoice"
                        >
                          <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>🧾 Download Invoice</span>
                        </button>
                      ) : (
                        <span className="px-3 py-1.5 text-xs font-semibold text-gray-400 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-1">
                          <span>🧾 Invoice Not Available</span>
                        </span>
                      )}

                      {/* Cancel Order Button (Opens Modal) */}
                      {order.canCancel && !isCancelled && (
                        <button
                          type="button"
                          onClick={() => setSelectedCancelOrder(order)}
                          className="px-4 py-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition"
                        >
                          Cancel Order
                        </button>
                      )}

                      {/* Track Order Live Button */}
                      <Link
                        to={`/orders/${order.id}`}
                        className="px-5 py-2.5 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-lg shadow-sm transition flex items-center gap-1.5"
                      >
                        <span>Track Order Live</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Flipkart Style Tax Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          isOpen={Boolean(selectedInvoiceOrder)}
          onClose={() => setSelectedInvoiceOrder(null)}
          order={selectedInvoiceOrder}
        />
      )}

      {/* Flipkart Style Cancel Order Modal */}
      {selectedCancelOrder && (
        <CancelOrderModal
          isOpen={Boolean(selectedCancelOrder)}
          onClose={() => setSelectedCancelOrder(null)}
          onConfirmCancel={cancelOrder}
          order={selectedCancelOrder}
        />
      )}

    </div>
  );
};

export default OrdersPage;
