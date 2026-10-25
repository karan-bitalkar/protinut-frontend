import React, { useState, useEffect } from 'react';
import './SideCartDrawer.css';
import logoImg from './assets/protinut-logo.png';

const MAX_CART_LIMIT = 5;

const SideCartDrawer = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  // Steps: 'cart' -> 'address' -> 'confirm' -> 'payment' -> 'success'
  const [currentStep, setCurrentStep] = useState('cart');

  // Coupon
  const [couponCode, setCouponCode] = useState('PRO20');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMsg, setCouponMsg] = useState('');

  // Step 1: Address State (All fields mandatory)
  const [address, setAddress] = useState({
    fullName: 'Karan Bitalikar',
    phone: '+91 9876543210',
    flatNo: 'Flat 101, Sample Building',
    street: 'Akurdi',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411035',
  });
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({ ...address });
  const [formErrors, setFormErrors] = useState({});

  // Step 2: Confirm Details
  const [buyerEmail, setBuyerEmail] = useState('karan.bitalikar@gmail.com');

  // Step 3: Payment Details (Mandatory verification)
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiType, setUpiType] = useState('phonepe');
  const [upiId, setUpiId] = useState('');
  const [upiError, setUpiError] = useState('');

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
  });
  const [cardErrors, setCardErrors] = useState({});

  const [selectedBank, setSelectedBank] = useState('');
  const [netbankingUserId, setNetbankingUserId] = useState('');
  const [netbankingError, setNetbankingError] = useState('');

  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('8391');
  const [codError, setCodError] = useState('');
  const [paymentGlobalError, setPaymentGlobalError] = useState('');

  // Placed Order Details
  const [placedOrder, setPlacedOrder] = useState(null);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll & reset when opening
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (currentStep === 'success') {
        setCurrentStep('cart');
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Items to display
  const displayItems = cartItems.length > 0 ? cartItems : [
    {
      id: 'classy-crunch',
      name: 'Peanut Butter Classy Crunch',
      selectedWeight: '550gm',
      finalPrice: 250,
      quantity: 1,
      image: '/products/classy-crunch.png',
    },
    {
      id: 'choco-crunch',
      name: 'Peanut Butter Choco Crunch',
      selectedWeight: '550gm',
      finalPrice: 270,
      quantity: 1,
      image: '/products/choco-crunch.png',
    }
  ];

  const totalItemsCount = displayItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = displayItems.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0);
  const discountAmount = couponApplied ? 20 : 0; // ₹20 off
  const grandTotal = Math.max(0, subtotal - discountAmount);

  // 12% GST Calculation
  const taxableValue = (grandTotal / 1.12).toFixed(2);
  const totalGst = (grandTotal - parseFloat(taxableValue)).toFixed(2);
  const cgst = (parseFloat(totalGst) / 2).toFixed(2);
  const sgst = (parseFloat(totalGst) / 2).toFixed(2);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'PRO20' || couponCode.trim().toUpperCase() === 'PROTINUT10') {
      setCouponApplied(true);
      setCouponMsg('✓ PRO20 Applied! ₹20 OFF');
    } else {
      setCouponApplied(false);
      setCouponMsg('Invalid Code. Use PRO20');
    }
  };

  // Validate Address
  const validateAddress = () => {
    const errors = {};
    if (!addressForm.fullName.trim()) errors.fullName = 'Full Name is required *';
    if (!addressForm.phone.trim()) {
      errors.phone = 'Mobile Number is required *';
    } else if (!/^[0-9+\s-]{10,14}$/.test(addressForm.phone.trim())) {
      errors.phone = 'Enter valid 10-digit mobile number';
    }
    if (!addressForm.pincode.trim()) {
      errors.pincode = 'Pincode is required *';
    } else if (!/^[0-9]{6}$/.test(addressForm.pincode.trim())) {
      errors.pincode = 'Enter valid 6-digit Pincode';
    }
    if (!addressForm.flatNo.trim()) errors.flatNo = 'Flat / House No. is required *';
    if (!addressForm.street.trim()) errors.street = 'Street / Area is required *';
    if (!addressForm.city.trim()) errors.city = 'City is required *';
    if (!addressForm.state.trim()) errors.state = 'State is required *';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (validateAddress()) {
      setAddress({ ...addressForm });
      setIsEditingAddress(false);
    }
  };

  // Validate Payment (Strictly Mandatory)
  const validatePayment = () => {
    setPaymentGlobalError('');
    setUpiError('');
    setCardErrors({});
    setNetbankingError('');
    setCodError('');

    if (!paymentMethod) {
      setPaymentGlobalError('⚠️ Please select a payment method and fill in the required details.');
      return false;
    }

    if (paymentMethod === 'upi') {
      const trimmed = upiId.trim();
      const appName = upiType === 'phonepe' ? 'PhonePe' : upiType === 'gpay' ? 'Google Pay' : upiType === 'paytm' ? 'Paytm' : 'UPI';
      if (!trimmed) {
        setUpiError(`Please enter your ${appName} mobile number or UPI ID (e.g. 9876543210@${upiType === 'phonepe' ? 'ybl' : upiType === 'gpay' ? 'okaxis' : 'paytm'})`);
        return false;
      }
      if (trimmed.length < 5) {
        setUpiError('Enter a valid 10-digit mobile number or UPI ID');
        return false;
      }
      return true;
    }

    if (paymentMethod === 'card') {
      const errs = {};
      const cleanNum = cardDetails.cardNumber.replace(/\s+/g, '');
      if (!cleanNum || cleanNum.length < 15) errs.cardNumber = 'Enter valid 16-digit card number';
      if (!cardDetails.cardExpiry || !/^\d{2}\/\d{2}$/.test(cardDetails.cardExpiry.trim())) {
        errs.cardExpiry = 'Enter MM/YY (e.g. 08/28)';
      }
      if (!cardDetails.cardCvv || cardDetails.cardCvv.length < 3) errs.cardCvv = 'Enter 3-digit CVV';
      if (!cardDetails.cardName.trim()) errs.cardName = 'Name on card is required *';
      setCardErrors(errs);
      return Object.keys(errs).length === 0;
    }

    if (paymentMethod === 'netbanking') {
      if (!selectedBank) {
        setNetbankingError('Please select your bank from the list');
        return false;
      }
      if (!netbankingUserId.trim()) {
        setNetbankingError('Please enter your Net Banking User ID / Customer ID *');
        return false;
      }
      return true;
    }

    if (paymentMethod === 'cod') {
      if (!captchaInput.trim()) {
        setCodError('Please enter the 4-digit code shown to confirm Cash on Delivery');
        return false;
      }
      if (captchaInput.trim() !== captchaCode) {
        setCodError('Incorrect Captcha. Please enter the exact 4 digits shown.');
        return false;
      }
      return true;
    }

    return false;
  };

  // Place Order
  const handlePlaceOrder = () => {
    if (!validatePayment()) return;

    const orderData = {
      orderId: 'PRT-' + Math.floor(100000 + Math.random() * 900000),
      orderDate: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      invoiceNo: 'INV-' + Math.floor(2024000 + Math.random() * 10000),
      address: { ...address },
      buyerEmail,
      paymentMethod,
      paymentSummary: paymentMethod === 'upi'
        ? `UPI (${upiType.toUpperCase()}: ${upiId.trim()})`
        : paymentMethod === 'card'
        ? `Card Ending ...${cardDetails.cardNumber.replace(/\s+/g, '').slice(-4)} (${cardDetails.cardName})`
        : paymentMethod === 'netbanking'
        ? `Net Banking (${selectedBank} - User: ${netbankingUserId.trim()})`
        : 'Cash on Delivery (COD Verified)',
      cartItems: displayItems,
      subtotal,
      discountAmount,
      grandTotal,
      taxableValue,
      totalGst,
      cgst,
      sgst,
    };

    setPlacedOrder(orderData);
    setCurrentStep('success');
    if (onClearCart) onClearCart();
  };

  // Download / Print 12% GST Invoice
  const handleDownloadInvoice = () => {
    window.print();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-overlay ${isOpen ? 'show' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Right Drawer Panel */}
      <aside
        className={`cart-drawer-panel ${isOpen ? 'show' : ''}`}
        aria-label="Side Checkout Drawer"
        role="dialog"
      >
        {/* Top Accent Bar */}
        <div className="drawer-top-bar" />

        {/* ── Top Header ── */}
        <div className="cart-header-row">
          <div className="cart-title-group">
            {currentStep === 'cart' ? (
              <>
                <h2 className="cart-heading">My Cart ({totalItemsCount} Items)</h2>
                <span className="cart-limit-pill">Limit: {totalItemsCount}/{MAX_CART_LIMIT} max</span>
              </>
            ) : currentStep === 'success' ? (
              <h2 className="cart-heading">Order Placed 🎉</h2>
            ) : (
              <div className="checkout-drawer-nav-header">
                <button
                  type="button"
                  className="btn-drawer-back"
                  onClick={() => {
                    if (currentStep === 'address') setCurrentStep('cart');
                    else if (currentStep === 'confirm') setCurrentStep('address');
                    else if (currentStep === 'payment') setCurrentStep('confirm');
                  }}
                >
                  ← Back
                </button>
                <h2 className="cart-heading">Checkout</h2>
              </div>
            )}
          </div>

          <button
            type="button"
            className="cart-close-x"
            onClick={onClose}
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>

        {/* ── Top Stepper (Address -> Confirm Details -> Payment Details) ── */}
        {currentStep !== 'cart' && currentStep !== 'success' && (
          <div className="drawer-stepper-strip">
            <div className={`drawer-step-item ${currentStep === 'address' ? 'active' : 'done'}`}>
              <span className="step-num">{currentStep === 'confirm' || currentStep === 'payment' ? '✓' : '1'}</span>
              <span className="step-txt">Address</span>
            </div>
            <div className={`drawer-step-connector ${currentStep === 'confirm' || currentStep === 'payment' ? 'active' : ''}`} />

            <div className={`drawer-step-item ${currentStep === 'confirm' ? 'active' : currentStep === 'payment' ? 'done' : ''}`}>
              <span className="step-num">{currentStep === 'payment' ? '✓' : '2'}</span>
              <span className="step-txt">Confirm Details</span>
            </div>
            <div className={`drawer-step-connector ${currentStep === 'payment' ? 'active' : ''}`} />

            <div className={`drawer-step-item ${currentStep === 'payment' ? 'active' : ''}`}>
              <span className="step-num">3</span>
              <span className="step-txt">Payment Details</span>
            </div>
          </div>
        )}

        {/* ── Drawer Scrollable Content ── */}
        <div className="cart-body-content">
          
          {/* ========================================================
              STEP 0: CART (Reference Image Exact Match)
             ======================================================== */}
          {currentStep === 'cart' && (
            <>
              {/* Product Cart Cards */}
              <div className="cart-cards-list">
                {displayItems.map((item) => {
                  const isMax = totalItemsCount >= MAX_CART_LIMIT;
                  return (
                    <div
                      key={`${item.id}-${item.selectedWeight}`}
                      className="product-cart-card"
                    >
                      <div className="card-thumb">
                        <img src={item.image} alt={item.name} />
                      </div>

                      <div className="card-details">
                        <h4 className="card-product-name">{item.name}</h4>
                        <span className="card-weight">{item.selectedWeight || '550gm'}</span>

                        <div className="card-price-stepper-row">
                          <span className="card-price">₹{item.finalPrice}</span>

                          <div className="card-stepper">
                            <button
                              type="button"
                              className="step-btn"
                              onClick={() =>
                                onUpdateQuantity(item.id, item.selectedWeight, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span className="step-count">{item.quantity}</span>
                            <button
                              type="button"
                              className={`step-btn ${isMax ? 'disabled' : ''}`}
                              onClick={() =>
                                onUpdateQuantity(item.id, item.selectedWeight, item.quantity + 1)
                              }
                              disabled={isMax}
                              title={isMax ? 'Maximum 5 products reached' : 'Increase'}
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            className="btn-trash-delete"
                            onClick={() => onRemoveItem(item.id, item.selectedWeight)}
                            title="Remove"
                          >
                            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#ff5722" strokeWidth="2">
                              <path d="M3 6h18" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="order-summary-box">
                <h3 className="summary-section-title">Order Summary</h3>

                <div className="summary-line">
                  <span className="summary-label">Subtotal</span>
                  <span className="summary-val">₹{subtotal}</span>
                </div>

                <div className="summary-line">
                  <span className="summary-label">Shipping Charges</span>
                  <span className="summary-val-green">FREE</span>
                </div>

                {couponApplied && (
                  <div className="summary-line">
                    <span className="summary-label">Coupon Discount (PRO20)</span>
                    <span className="summary-val-green">- ₹{discountAmount}</span>
                  </div>
                )}

                {/* Apply Coupon */}
                <div className="coupon-control-wrap">
                  <div className="coupon-title-row">
                    <span>Apply Coupon</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                  <form className="coupon-input-group" onSubmit={handleApplyCoupon}>
                    <input
                      type="text"
                      className="coupon-text-field"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button type="submit" className="btn-coupon-apply">
                      {couponApplied ? 'Applied' : 'Apply'}
                    </button>
                  </form>
                  {couponMsg && (
                    <span className={`coupon-msg-note ${couponApplied ? 'success' : 'error'}`}>
                      {couponMsg}
                    </span>
                  )}
                </div>

                {/* Total */}
                <div className="summary-total-line">
                  <span className="total-label">Total</span>
                  <span className="total-val">₹{grandTotal}</span>
                </div>

                {/* Next Step Button */}
                <button
                  type="button"
                  className="btn-proceed-checkout"
                  onClick={() => setCurrentStep('address')}
                >
                  Proceed to Checkout ➔
                </button>
              </div>
            </>
          )}

          {/* ========================================================
              STEP 1: ADDRESS (Ek ke baad ek - Only Step 1 visible)
             ======================================================== */}
          {currentStep === 'address' && (
            <div className="step-pane-view">
              <h3 className="drawer-step-heading">1. Delivery Address</h3>

              {isEditingAddress ? (
                <form className="drawer-address-form" onSubmit={handleSaveAddress}>
                  <p className="form-req-tag">* All fields are mandatory</p>

                  <div className="form-field">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={addressForm.fullName}
                      placeholder="Full Name"
                      onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                    />
                    {formErrors.fullName && <span className="err-note">{formErrors.fullName}</span>}
                  </div>

                  <div className="form-field">
                    <label>Mobile Number (10 digits) *</label>
                    <input
                      type="tel"
                      value={addressForm.phone}
                      placeholder="+91 9876543210"
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    />
                    {formErrors.phone && <span className="err-note">{formErrors.phone}</span>}
                  </div>

                  <div className="form-row-2">
                    <div className="form-field">
                      <label>Pincode *</label>
                      <input
                        type="text"
                        maxLength={6}
                        value={addressForm.pincode}
                        placeholder="6-digit PIN"
                        onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                      />
                      {formErrors.pincode && <span className="err-note">{formErrors.pincode}</span>}
                    </div>

                    <div className="form-field">
                      <label>Flat / House No. *</label>
                      <input
                        type="text"
                        value={addressForm.flatNo}
                        placeholder="Flat 101, Bldg"
                        onChange={(e) => setAddressForm({ ...addressForm, flatNo: e.target.value })}
                      />
                      {formErrors.flatNo && <span className="err-note">{formErrors.flatNo}</span>}
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Street / Area *</label>
                    <input
                      type="text"
                      value={addressForm.street}
                      placeholder="Street, Landmark"
                      onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                    />
                    {formErrors.street && <span className="err-note">{formErrors.street}</span>}
                  </div>

                  <div className="form-row-2">
                    <div className="form-field">
                      <label>City *</label>
                      <input
                        type="text"
                        value={addressForm.city}
                        placeholder="City"
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      />
                      {formErrors.city && <span className="err-note">{formErrors.city}</span>}
                    </div>

                    <div className="form-field">
                      <label>State *</label>
                      <input
                        type="text"
                        value={addressForm.state}
                        placeholder="State"
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                      />
                      {formErrors.state && <span className="err-note">{formErrors.state}</span>}
                    </div>
                  </div>

                  <div className="drawer-form-actions">
                    <button type="submit" className="btn-save-drawer-addr">
                      Save & Deliver Here
                    </button>
                    <button
                      type="button"
                      className="btn-cancel-drawer-addr"
                      onClick={() => setIsEditingAddress(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="drawer-selected-address-card">
                  <div className="addr-radio-row">
                    <input type="radio" checked readOnly />
                    <div className="addr-meta-texts">
                      <strong className="addr-person-name">{address.fullName}</strong>
                      <p className="addr-lines">
                        {address.flatNo}, {address.street}, {address.city}, {address.state} - {address.pincode}
                      </p>
                      <span className="addr-mobile-badge">📞 {address.phone}</span>
                    </div>
                  </div>

                  <div className="addr-action-links">
                    <button
                      type="button"
                      className="btn-inline-link"
                      onClick={() => {
                        setAddressForm({
                          fullName: '',
                          phone: '',
                          flatNo: '',
                          street: '',
                          city: '',
                          state: '',
                          pincode: '',
                        });
                        setIsEditingAddress(true);
                      }}
                    >
                      + Add New Address
                    </button>
                    <button
                      type="button"
                      className="btn-inline-link"
                      onClick={() => {
                        setAddressForm({ ...address });
                        setIsEditingAddress(true);
                      }}
                    >
                      Edit Address
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn-step-next"
                    onClick={() => setCurrentStep('confirm')}
                  >
                    Confirm Address & Continue ➔
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              STEP 2: CONFIRM DETAILS (Ek ke baad ek - Only Step 2 visible)
             ======================================================== */}
          {currentStep === 'confirm' && (
            <div className="step-pane-view">
              <h3 className="drawer-step-heading">2. Confirm Order Details</h3>

              {/* Verified Address & Mobile */}
              <div className="confirm-section-block">
                <span className="section-mini-tag">DELIVERING TO:</span>
                <div className="confirmed-person-box">
                  <div className="person-row">
                    <strong>👤 {address.fullName}</strong>
                    <span className="phone-pill">📞 {address.phone}</span>
                  </div>
                  <p className="addr-text">
                    📍 {address.flatNo}, {address.street}, {address.city}, {address.state} - {address.pincode}
                  </p>
                </div>
              </div>

              {/* Invoice Email */}
              <div className="confirm-section-block">
                <label className="section-mini-tag">INVOICE CONFIRMATION EMAIL *</label>
                <input
                  type="email"
                  className="drawer-email-input"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  placeholder="Enter email for GST invoice"
                />
              </div>

              {/* Items Preview */}
              <div className="confirm-section-block">
                <span className="section-mini-tag">ITEMS IN THIS ORDER ({displayItems.length}):</span>
                <div className="confirm-items-scroll">
                  {displayItems.map((item, i) => (
                    <div key={i} className="confirm-mini-item">
                      <img src={item.image} alt={item.name} />
                      <div className="mini-item-desc">
                        <h4>{item.name}</h4>
                        <span>{item.selectedWeight || '550gm'} × {item.quantity}</span>
                      </div>
                      <strong>₹{item.finalPrice * item.quantity}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Breakdown with 12% GST */}
              <div className="confirm-pricing-summary">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="price-row">
                  <span>Shipping</span>
                  <span className="green-txt">FREE (Guaranteed)</span>
                </div>
                {discountAmount > 0 && (
                  <div className="price-row">
                    <span>Coupon Discount</span>
                    <span className="green-txt">- ₹{discountAmount}</span>
                  </div>
                )}
                <div className="price-row gst-highlight-row">
                  <span>Including 12% GST</span>
                  <span>₹{totalGst}</span>
                </div>
                <div className="price-row grand-row">
                  <strong>Total Amount</strong>
                  <strong className="grand-txt">₹{grandTotal}</strong>
                </div>
              </div>

              <button
                type="button"
                className="btn-step-next"
                onClick={() => setCurrentStep('payment')}
              >
                Proceed to Payment (₹{grandTotal}) ➔
              </button>
            </div>
          )}

          {/* ========================================================
              STEP 3: PAYMENT DETAILS (Ek ke baad ek - Only Step 3 visible)
             ======================================================== */}
          {currentStep === 'payment' && (
            <div className="step-pane-view">
              <h3 className="drawer-step-heading">3. Payment Details</h3>

              <div className="drawer-payment-accordion">
                {/* UPI */}
                <div className={`pay-method-card ${paymentMethod === 'upi' ? 'active' : ''}`}>
                  <label
                    className="pay-method-header"
                    onClick={() => {
                      setPaymentMethod('upi');
                      setPaymentGlobalError('');
                    }}
                  >
                    <input
                      type="radio"
                      name="drawerPay"
                      checked={paymentMethod === 'upi'}
                      onChange={() => {
                        setPaymentMethod('upi');
                        setPaymentGlobalError('');
                      }}
                    />
                    <div>
                      <strong>UPI (Instant Pay)</strong>
                      <span>PhonePe, GPay, Paytm, UPI ID</span>
                    </div>
                  </label>

                  {paymentMethod === 'upi' && (
                    <div className="pay-method-subform">
                      <div className="upi-app-grid">
                        {['phonepe', 'gpay', 'paytm', 'id'].map((app) => (
                          <label key={app} className={`app-badge ${upiType === app ? 'selected' : ''}`}>
                            <input
                              type="radio"
                              name="app"
                              checked={upiType === app}
                              onChange={() => {
                                setUpiType(app);
                                setUpiError('');
                              }}
                            />
                            <span>
                              {app === 'phonepe' && '📱 PhonePe'}
                              {app === 'gpay' && '🌐 GPay'}
                              {app === 'paytm' && '💙 Paytm'}
                              {app === 'id' && '@ UPI ID'}
                            </span>
                          </label>
                        ))}
                      </div>

                      {/* Mandatory UPI Input for all app selections */}
                      <div className="form-field" style={{ marginTop: '8px' }}>
                        <label>
                          {upiType === 'phonepe' && 'PhonePe Mobile Number / VPA *'}
                          {upiType === 'gpay' && 'Google Pay UPI ID / Mobile *'}
                          {upiType === 'paytm' && 'Paytm Mobile Number / UPI ID *'}
                          {upiType === 'id' && 'Enter UPI ID *'}
                        </label>
                        <input
                          type="text"
                          placeholder={
                            upiType === 'phonepe'
                              ? 'e.g. 9876543210@ybl or 10-digit number'
                              : upiType === 'gpay'
                              ? 'e.g. name@okaxis or 10-digit number'
                              : upiType === 'paytm'
                              ? 'e.g. 9876543210@paytm'
                              : 'e.g. username@okhdfcbank'
                          }
                          value={upiId}
                          onChange={(e) => {
                            setUpiId(e.target.value);
                            setUpiError('');
                            setPaymentGlobalError('');
                          }}
                        />
                        {upiError && <span className="err-note">{upiError}</span>}
                        <span style={{ fontSize: '11px', color: '#777777', marginTop: '2px' }}>
                          ℹ️ Enter your UPI ID or UPI-linked mobile number to authorize ₹{grandTotal}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Credit / Debit Card */}
                <div className={`pay-method-card ${paymentMethod === 'card' ? 'active' : ''}`}>
                  <label
                    className="pay-method-header"
                    onClick={() => {
                      setPaymentMethod('card');
                      setPaymentGlobalError('');
                    }}
                  >
                    <input
                      type="radio"
                      name="drawerPay"
                      checked={paymentMethod === 'card'}
                      onChange={() => {
                        setPaymentMethod('card');
                        setPaymentGlobalError('');
                      }}
                    />
                    <div>
                      <strong>Credit / Debit / ATM Card</strong>
                      <span>Visa, MasterCard, RuPay</span>
                    </div>
                  </label>

                  {paymentMethod === 'card' && (
                    <div className="pay-method-subform">
                      <div className="form-field">
                        <label>Card Number *</label>
                        <input
                          type="text"
                          maxLength={19}
                          placeholder="XXXX XXXX XXXX XXXX"
                          value={cardDetails.cardNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                            setCardDetails({ ...cardDetails, cardNumber: val });
                            setPaymentGlobalError('');
                          }}
                        />
                        {cardErrors.cardNumber && <span className="err-note">{cardErrors.cardNumber}</span>}
                      </div>

                      <div className="form-row-2">
                        <div className="form-field">
                          <label>Valid Thru *</label>
                          <input
                            type="text"
                            maxLength={5}
                            placeholder="MM/YY"
                            value={cardDetails.cardExpiry}
                            onChange={(e) => {
                              setCardDetails({ ...cardDetails, cardExpiry: e.target.value });
                              setPaymentGlobalError('');
                            }}
                          />
                          {cardErrors.cardExpiry && <span className="err-note">{cardErrors.cardExpiry}</span>}
                        </div>

                        <div className="form-field">
                          <label>CVV *</label>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="CVV"
                            value={cardDetails.cardCvv}
                            onChange={(e) => {
                              setCardDetails({ ...cardDetails, cardCvv: e.target.value });
                              setPaymentGlobalError('');
                            }}
                          />
                          {cardErrors.cardCvv && <span className="err-note">{cardErrors.cardCvv}</span>}
                        </div>
                      </div>

                      <div className="form-field">
                        <label>Name on Card *</label>
                        <input
                          type="text"
                          placeholder="Cardholder Name"
                          value={cardDetails.cardName}
                          onChange={(e) => {
                            setCardDetails({ ...cardDetails, cardName: e.target.value });
                            setPaymentGlobalError('');
                          }}
                        />
                        {cardErrors.cardName && <span className="err-note">{cardErrors.cardName}</span>}
                      </div>
                    </div>
                  )}
                </div>

                {/* Net Banking */}
                <div className={`pay-method-card ${paymentMethod === 'netbanking' ? 'active' : ''}`}>
                  <label
                    className="pay-method-header"
                    onClick={() => {
                      setPaymentMethod('netbanking');
                      setPaymentGlobalError('');
                    }}
                  >
                    <input
                      type="radio"
                      name="drawerPay"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => {
                        setPaymentMethod('netbanking');
                        setPaymentGlobalError('');
                      }}
                    />
                    <div>
                      <strong>Net Banking</strong>
                      <span>SBI, HDFC, ICICI, Axis, Kotak</span>
                    </div>
                  </label>

                  {paymentMethod === 'netbanking' && (
                    <div className="pay-method-subform">
                      <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#333333' }}>
                        Select Your Bank *
                      </label>
                      <div className="popular-banks-pill-row">
                        {['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak'].map((b) => (
                          <label key={b} className={`bank-choice ${selectedBank === b ? 'selected' : ''}`}>
                            <input
                              type="radio"
                              name="nb"
                              checked={selectedBank === b}
                              onChange={() => {
                                setSelectedBank(b);
                                setNetbankingError('');
                                setPaymentGlobalError('');
                              }}
                            />
                            <span>{b}</span>
                          </label>
                        ))}
                      </div>

                      <div className="form-field" style={{ marginTop: '8px' }}>
                        <label>Net Banking User ID / Customer ID *</label>
                        <input
                          type="text"
                          placeholder="Enter your Bank User ID / Customer ID"
                          value={netbankingUserId}
                          onChange={(e) => {
                            setNetbankingUserId(e.target.value);
                            setNetbankingError('');
                            setPaymentGlobalError('');
                          }}
                        />
                        {netbankingError && <span className="err-note">{netbankingError}</span>}
                      </div>
                    </div>
                  )}
                </div>

                {/* COD with Captcha */}
                <div className={`pay-method-card ${paymentMethod === 'cod' ? 'active' : ''}`}>
                  <label
                    className="pay-method-header"
                    onClick={() => {
                      setPaymentMethod('cod');
                      setPaymentGlobalError('');
                    }}
                  >
                    <input
                      type="radio"
                      name="drawerPay"
                      checked={paymentMethod === 'cod'}
                      onChange={() => {
                        setPaymentMethod('cod');
                        setPaymentGlobalError('');
                      }}
                    />
                    <div>
                      <strong>Cash on Delivery (COD)</strong>
                      <span>Pay cash at doorstep</span>
                    </div>
                  </label>

                  {paymentMethod === 'cod' && (
                    <div className="pay-method-subform">
                      <p className="cod-captcha-note">Enter 4-digit code to verify COD order: *</p>
                      <div className="captcha-inline-row">
                        <span className="captcha-box">{captchaCode}</span>
                        <button
                          type="button"
                          className="btn-captcha-refresh"
                          onClick={() => {
                            setCaptchaCode(Math.floor(1000 + Math.random() * 9000).toString());
                            setCaptchaInput('');
                            setCodError('');
                          }}
                          title="Generate new code"
                        >
                          🔄
                        </button>
                        <input
                          type="text"
                          maxLength={4}
                          placeholder="Code"
                          value={captchaInput}
                          onChange={(e) => {
                            setCaptchaInput(e.target.value);
                            setCodError('');
                            setPaymentGlobalError('');
                          }}
                        />
                      </div>
                      {codError && <span className="err-note">{codError}</span>}
                      <p style={{ fontSize: '11px', color: '#666666', margin: '4px 0 0' }}>
                        💵 Keep ₹{grandTotal} cash ready at delivery. No extra COD charge.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Global Error Banner if user tries to place order without selecting or filling payment */}
              {paymentGlobalError && (
                <div className="payment-global-err-box">
                  {paymentGlobalError}
                </div>
              )}

              {/* Solid Orange Place Order CTA Button */}
              <button
                type="button"
                className="btn-step-next btn-place-order-orange"
                onClick={handlePlaceOrder}
              >
                Place Order • ₹{grandTotal}
              </button>
            </div>
          )}

          {/* ========================================================
              SUCCESS SCREEN (Clean - 2 Options Only)
             ======================================================== */}
          {currentStep === 'success' && placedOrder && (
            <div className="step-pane-view drawer-success-pane">
              <div className="success-circle-icon">✓</div>
              <h3 className="success-order-heading">Order Placed Successfully!</h3>
              <p className="success-order-subtext">
                Thank you, <strong>{placedOrder.address.fullName}</strong>! Your order has been placed and confirmed.
              </p>

              {/* Order Info Summary */}
              <div className="drawer-success-summary-box">
                <div className="info-row">
                  <span>Order ID:</span>
                  <strong className="orange-txt">#{placedOrder.orderId}</strong>
                </div>
                <div className="info-row">
                  <span>Amount Paid:</span>
                  <strong>₹{placedOrder.grandTotal} (incl. 12% GST)</strong>
                </div>
                <div className="info-row">
                  <span>Payment Mode:</span>
                  <span>{placedOrder.paymentSummary}</span>
                </div>
                <div className="info-row">
                  <span>Delivering To:</span>
                  <span>{placedOrder.address.fullName}, {placedOrder.address.city} ({placedOrder.address.phone})</span>
                </div>
              </div>

              {/* EXACT 2 OPTIONS REQUESTED: Download Invoice & Continue Shopping */}
              <div className="drawer-success-actions">
                <button
                  type="button"
                  className="btn-drawer-download-invoice"
                  onClick={handleDownloadInvoice}
                >
                  📥 Download Invoice
                </button>

                <button
                  type="button"
                  className="btn-drawer-continue-shop"
                  onClick={() => {
                    setCurrentStep('cart');
                    onClose();
                  }}
                >
                  🛍️ Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>
      </aside>

      {/* ── Official 12% GST Tax Invoice (Hidden from screen, only prints when 'Download Invoice' is clicked) ── */}
      {placedOrder && (
        <div className="printable-tax-invoice invoice-print-only" id="tax-invoice">
          <div className="invoice-brand-row">
            <div className="brand-meta">
              <img src={logoImg} alt="PROTINUT™" className="invoice-logo" />
              <p><strong>Netizens Nutrition Labs</strong></p>
              <p>Plot No. 42, Food Tech Zone, Dharashiv, Maharashtra - 413501</p>
              <p>GSTIN: <strong>27AABCP1234D1Z5</strong> • State: Maharashtra (27)</p>
              <p>FSSAI Central Lic. No: <strong>10020021000123</strong></p>
            </div>
            <div className="invoice-tax-meta">
              <h3>TAX INVOICE</h3>
              <p>Invoice No: <strong>{placedOrder.invoiceNo}</strong></p>
              <p>Date: <strong>{placedOrder.orderDate}</strong></p>
              <p>Order ID: <strong>#{placedOrder.orderId}</strong></p>
              <p>Payment: <strong>{placedOrder.paymentSummary}</strong></p>
            </div>
          </div>

          <div className="invoice-customer-row">
            <div className="bill-to-col">
              <strong>Billed & Shipped To:</strong>
              <p className="cust-name">{placedOrder.address.fullName}</p>
              <p>{placedOrder.address.flatNo}, {placedOrder.address.street}</p>
              <p>{placedOrder.address.city}, {placedOrder.address.state} - {placedOrder.address.pincode}</p>
              <p>Phone: {placedOrder.address.phone}</p>
              <p>Email: {placedOrder.buyerEmail}</p>
            </div>
            <div className="place-supply-col">
              <p>Place of Supply: <strong>Maharashtra (27)</strong></p>
              <p>Reverse Charge: <strong>No</strong></p>
              <p>Nature of Goods: <strong>Food & Nutrition / Peanut Butter</strong></p>
            </div>
          </div>

          <table className="invoice-items-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Description</th>
                <th>HSN Code</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Taxable Value</th>
                <th>CGST (6%)</th>
                <th>SGST (6%)</th>
                <th>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {placedOrder.cartItems.map((item, idx) => {
                const itemTaxable = ((item.finalPrice * item.quantity) / 1.12).toFixed(2);
                const itemCgst = ((item.finalPrice * item.quantity - itemTaxable) / 2).toFixed(2);
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td><strong>{item.name}</strong> ({item.selectedWeight || '550gm'})</td>
                    <td>20081100</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.finalPrice}</td>
                    <td>₹{itemTaxable}</td>
                    <td>₹{itemCgst}</td>
                    <td>₹{itemCgst}</td>
                    <td><strong>₹{item.finalPrice * item.quantity}</strong></td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="invoice-totals-section">
            <div className="invoice-gst-summary">
              <div className="gst-calc-row">
                <span>Total Taxable Value:</span>
                <strong>₹{placedOrder.taxableValue}</strong>
              </div>
              <div className="gst-calc-row">
                <span>CGST @ 6%:</span>
                <strong>₹{placedOrder.cgst}</strong>
              </div>
              <div className="gst-calc-row">
                <span>SGST @ 6%:</span>
                <strong>₹{placedOrder.sgst}</strong>
              </div>
              <div className="gst-calc-row">
                <span>Total 12% GST:</span>
                <strong>₹{placedOrder.totalGst}</strong>
              </div>
            </div>

            <div className="invoice-grand-total-box">
              <div className="inv-row">
                <span>Subtotal:</span>
                <span>₹{placedOrder.subtotal}</span>
              </div>
              <div className="inv-row">
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
              {placedOrder.discountAmount > 0 && (
                <div className="inv-row discount">
                  <span>Coupon (PRO20):</span>
                  <span>-₹{placedOrder.discountAmount}</span>
                </div>
              )}
              <div className="inv-row grand">
                <strong>Invoice Total:</strong>
                <strong>₹{placedOrder.grandTotal}</strong>
              </div>
              <p className="inclusive-tax-note">
                (Inclusive of 12% GST: ₹{placedOrder.totalGst})
              </p>
            </div>
          </div>

          <div className="invoice-footer-sign">
            <p>This is a computer-generated tax invoice. No signature required.</p>
            <div className="authorized-signatory">
              <span className="sign-stamp">PROTINUT™ VERIFIED</span>
              <strong>Authorized Signatory</strong>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideCartDrawer;
