import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import toast from 'react-hot-toast';

const CartPage = () => {
  const {
    cartItems,
    totalCartCount,
    originalPriceTotal,
    subtotal,
    discount,
    cgst,
    sgst,
    totalGst,
    deliveryCharge,
    grandTotal,
    updateQuantity,
    removeItem,
    clearCart,
    MAX_CART_LIMIT
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const freeDeliveryThreshold = 499;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="min-h-screen bg-[#f1f3f6] py-6 px-3 sm:px-6 lg:px-8 pb-28 md:pb-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Breadcrumb & Protinut / Flipkart Bar */}
        <div className="flex items-center justify-between mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-primary hover:underline font-bold">Home</Link>
            <span>/</span>
            <span className="text-gray-700">Shopping Cart</span>
          </div>
          <span className="text-gray-500 hidden sm:inline">
            Logged in as <strong className="text-gray-800">{user?.name || 'Member'}</strong>
          </span>
        </div>

        {cartItems.length === 0 ? (
          /* ── 3. EMPTY STATE: "Your Cart is Empty" with "Shop Now" button ── */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-16 px-6 text-center max-w-2xl mx-auto my-8">
            <div className="w-28 h-28 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <svg className="w-14 h-14 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1.5" />
                <circle cx="19" cy="21" r="1.5" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2 font-['Montserrat']">Your Cart is Empty</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
              Looks like you haven't added anything to your cart yet. Explore our delicious, 100% roasted peanut butters and start filling it up!
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8 text-xs font-semibold text-gray-600">
              <span className="bg-gray-100 px-3 py-1.5 rounded-full">🥜 100% Real Peanuts</span>
              <span className="bg-gray-100 px-3 py-1.5 rounded-full">💪 30g High Protein</span>
              <span className="bg-gray-100 px-3 py-1.5 rounded-full">🚫 Zero Trans Fat</span>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>Shop Now</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        ) : (
          /* ── CART GRID: Left items (68%), Right Price Summary (32%) ── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Deliver To / Quality Pin Strip */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-primary font-bold">
                    📍
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-semibold uppercase">Deliver to:</div>
                    <div className="text-sm font-bold text-gray-900">
                      {user?.name || 'Customer'} — <span className="text-gray-600 font-normal">Pune 411035</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-md border border-green-200">
                  ⚡ Express Dispatched from Dharashiv
                </div>
              </div>

              {/* Delivery Progress Banner */}
              {subtotal < freeDeliveryThreshold ? (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 flex items-center justify-between text-xs text-amber-900 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🚚</span>
                    <span>
                      Add items worth <strong>₹{amountNeededForFreeDelivery}</strong> more to get <strong>FREE Delivery</strong>! (Current fee: ₹40)
                    </span>
                  </div>
                  <Link to="/products" className="text-primary font-bold hover:underline ml-2 whitespace-nowrap">
                    + Add Jars
                  </Link>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-green-800 font-bold flex items-center gap-2">
                  <span>🎉</span>
                  <span>Congratulations! Your order qualifies for <strong>FREE Delivery</strong>.</span>
                </div>
              )}

              {/* Cart Items List */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-200">
                <div className="p-4 bg-gray-50 flex items-center justify-between border-b border-gray-200">
                  <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                    Protinut Cart ({totalCartCount} {totalCartCount === 1 ? 'Jar' : 'Jars'})
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {cartItems.map((item) => {
                  const itemOriginal = item.originalPrice || Math.round(item.finalPrice * 1.35);
                  const discountPct = Math.round(((itemOriginal - item.finalPrice) / itemOriginal) * 100);

                  return (
                    <div key={`${item.id}-${item.selectedWeight}`} className="p-4 sm:p-6 transition-colors hover:bg-gray-50/50">
                      <div className="flex gap-4 sm:gap-6">
                        
                        {/* Image */}
                        <div className="w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0 bg-[#faf3e8] rounded-xl p-2 flex items-center justify-center border border-amber-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain transform transition-transform hover:scale-105"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate font-['Montserrat']">
                                {item.name}
                              </h3>
                              <p className="text-xs text-gray-500 mt-0.5">
                                Size: <span className="font-semibold text-gray-700">{item.selectedWeight}</span> • Seller: PROTINUT Nutrition
                              </p>
                            </div>
                            <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200 hidden sm:inline-block">
                              In Stock
                            </span>
                          </div>

                          {/* Price Row (Flipkart Style) */}
                          <div className="flex items-baseline gap-2.5 mt-2.5">
                            <span className="text-lg sm:text-xl font-black text-gray-900 font-['Montserrat']">
                              ₹{item.finalPrice}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-400 line-through">
                              ₹{itemOriginal}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-green-600">
                              {discountPct}% Off
                            </span>
                          </div>

                          {/* Quantity Controls & Remove */}
                          <div className="flex items-center gap-4 mt-4 pt-2 border-t border-gray-100 flex-wrap">
                            <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden shadow-sm">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.selectedWeight, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition text-sm font-bold"
                                title="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="w-9 text-center text-sm font-bold text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.selectedWeight, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition text-sm font-bold"
                                title="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.id, item.selectedWeight)}
                              className="text-xs font-bold uppercase tracking-wide text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              <span>Remove</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => toast('Saved for later', { icon: '🔖' })}
                              className="text-xs font-bold uppercase tracking-wide text-gray-500 hover:text-gray-900 transition-colors hidden sm:inline"
                            >
                              Save for later
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}

                {/* Bottom Checkout Callout Strip */}
                <div className="p-4 bg-white flex justify-end">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full sm:w-auto bg-[#fb641b] hover:bg-[#e85a14] text-white font-extrabold uppercase text-sm tracking-wider px-10 py-3.5 rounded shadow hover:shadow-md transition duration-150 text-center"
                  >
                    Proceed to Checkout →
                  </button>
                </div>
              </div>

              {/* Safe & Secure Flipkart Strip */}
              <div className="flex items-center gap-4 text-xs text-gray-500 px-2 py-1">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  100% Safe and Secure Payments
                </span>
                <span>•</span>
                <span>Directly from Dharashiv, Maharashtra</span>
              </div>
            </div>

            {/* Right Column: PRICE DETAILS (Sticky) */}
            <div className="lg:col-span-4 sticky top-20">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                
                {/* Header */}
                <div className="px-5 py-4 border-b border-gray-200">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Price Details
                  </h2>
                </div>

                {/* Calculation Rows: Flipkart Style with CGST & SGST */}
                <div className="p-5 space-y-3 text-sm">
                  
                  {/* Price (Subtotal) */}
                  <div className="flex items-center justify-between text-gray-800">
                    <span>Price (Subtotal)</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>

                  {/* Discount */}
                  <div className="flex items-center justify-between text-gray-800">
                    <span>Discount</span>
                    <span className="font-bold text-green-600">− ₹{discount}</span>
                  </div>

                  {/* Delivery Charges */}
                  <div className="flex items-center justify-between text-gray-800">
                    <span>Delivery Charges</span>
                    {deliveryCharge === 0 ? (
                      <span className="font-bold text-green-600 uppercase">
                        <span className="line-through text-gray-400 font-normal mr-1">₹40</span> Free
                      </span>
                    ) : (
                      <span className="font-semibold text-gray-900">₹{deliveryCharge}</span>
                    )}
                  </div>

                  {/* CGST (2.5%) */}
                  <div className="flex items-center justify-between text-gray-800">
                    <span className="flex items-center gap-1.5">
                      <span>CGST (2.5%)</span>
                      <span className="bg-orange-100 text-primary text-[10px] font-black px-1.5 py-0.5 rounded">
                        2.5%
                      </span>
                    </span>
                    <span className="font-semibold text-gray-900">₹{cgst}</span>
                  </div>

                  {/* SGST (2.5%) */}
                  <div className="flex items-center justify-between text-gray-800">
                    <span className="flex items-center gap-1.5">
                      <span>SGST (2.5%)</span>
                      <span className="bg-orange-100 text-primary text-[10px] font-black px-1.5 py-0.5 rounded">
                        2.5%
                      </span>
                    </span>
                    <span className="font-semibold text-gray-900">₹{sgst}</span>
                  </div>

                  {/* Total GST Summary note */}
                  <div className="text-[11px] text-gray-400 flex justify-between px-1">
                    <span>Total GST (5%):</span>
                    <span>₹{totalGst}</span>
                  </div>

                  {/* Total Amount */}
                  <div className="flex items-center justify-between text-base sm:text-lg font-black text-gray-900 pt-3 border-t border-gray-200 border-dashed font-['Montserrat']">
                    <span>Total Amount</span>
                    <span className="text-primary text-xl">₹{grandTotal}</span>
                  </div>
                </div>

                {/* Flipkart Savings Green Banner */}
                {discount > 0 && (
                  <div className="bg-green-50 px-5 py-3 border-t border-green-200 text-xs font-bold text-green-800 flex items-center gap-2">
                    <span>🎉</span>
                    <span>You will save ₹{discount} on this order!</span>
                  </div>
                )}

                {/* Big Proceed Button */}
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-[#fb641b] hover:bg-[#e85a14] active:bg-[#d44e10] text-white font-extrabold uppercase text-sm tracking-wider py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* Mobile Sticky Checkout Bar (< 768px) */}
        {cartItems.length > 0 && (
          <div className="md:hidden fixed bottom-[60px] left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] flex items-center justify-between z-40">
            <div>
              <span className="block text-[11px] text-gray-500 font-semibold uppercase">Total Amount</span>
              <span className="text-lg font-black text-primary font-['Montserrat']">₹{grandTotal}</span>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="bg-[#fb641b] hover:bg-[#e85a14] active:bg-[#d44e10] text-white font-extrabold uppercase text-xs tracking-wider px-6 py-3 rounded-lg shadow-md flex items-center gap-1.5"
            >
              <span>Proceed to Checkout</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartPage;
