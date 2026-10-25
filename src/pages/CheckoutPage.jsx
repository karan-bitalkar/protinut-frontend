import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CheckoutPage.css';
import logoImg from '../assets/protinut-logo.png';

const CheckoutPage = ({ cartItems, onClearCart }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // ── 1. Delivery Address State (All fields mandatory) ──
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

  // ── 2. Order Confirmation Details ──
  const [buyerEmail, setBuyerEmail] = useState('karan.bitalikar@gmail.com');
  const [deliverySpeed, setDeliverySpeed] = useState('standard'); // 'standard' (FREE) or 'express' (₹50)

  // ── 3. Payment Method & Specific Payment Details (Flipkart Style) ──
  const [paymentMethod, setPaymentMethod] = useState(''); // 'upi', 'card', 'netbanking', 'cod'

  // UPI Specifics
  const [upiType, setUpiType] = useState('phonepe'); // 'phonepe', 'gpay', 'paytm', 'id'
  const [upiId, setUpiId] = useState('');
  const [upiError, setUpiError] = useState('');

  // Card Specifics
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
  });
  const [cardErrors, setCardErrors] = useState({});

  // Netbanking Specifics
  const [selectedBank, setSelectedBank] = useState('');
  const [netbankingUserId, setNetbankingUserId] = useState('');
  const [netbankingError, setNetbankingError] = useState('');

  // COD Specifics
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('7492');
  const [codError, setCodError] = useState('');
  const [paymentGlobalError, setPaymentGlobalError] = useState('');

  // ── Coupon State ──
  const [couponCode, setCouponCode] = useState('PRO20');
  const [couponDiscount, setCouponDiscount] = useState(20); // ₹20 off

  // ── Order Success State ──
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

  // ── Display Products ──
  const displayItems = cartItems.length > 0 ? cartItems : [
    {
      id: 'classy-crunch',
      name: 'Classy Crunch',
      selectedWeight: '550gm',
      finalPrice: 250,
      quantity: 1,
      image: '/products/classy-crunch.png',
    },
    {
      id: 'choco-crunch',
      name: 'Choco Crunch',
      selectedWeight: '550gm',
      finalPrice: 270,
      quantity: 1,
      image: '/products/choco-crunch.png',
    }
  ];

  // ── Pricing Calculations ──
  const subtotal = displayItems.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0);
  const shippingCost = 0; // 100% Free Shipping
  const totalAmount = Math.max(0, subtotal - couponDiscount + shippingCost);

  // 12% GST Calculation (Peanut butter GST is 12% in India - HSN 20081100)
  const taxableValue = (totalAmount / 1.12).toFixed(2);
  const totalGst = (totalAmount - parseFloat(taxableValue)).toFixed(2);
  const cgst = (parseFloat(totalGst) / 2).toFixed(2);
  const sgst = (parseFloat(totalGst) / 2).toFixed(2);

  // ── Address Form Validation ──
  const validateAddress = () => {
    const errors = {};
    if (!addressForm.fullName.trim()) errors.fullName = 'Full Name is mandatory *';
    if (!addressForm.phone.trim()) {
      errors.phone = 'Mobile Number is mandatory *';
    } else if (!/^[0-9+\s-]{10,14}$/.test(addressForm.phone.trim())) {
      errors.phone = 'Enter valid 10-digit mobile number';
    }
    if (!addressForm.pincode.trim()) {
      errors.pincode = 'Pincode is mandatory *';
    } else if (!/^[0-9]{6}$/.test(addressForm.pincode.trim())) {
      errors.pincode = 'Enter valid 6-digit Pincode';
    }
    if (!addressForm.flatNo.trim()) errors.flatNo = 'House / Flat / Building is mandatory *';
    if (!addressForm.street.trim()) errors.street = 'Street / Area is mandatory *';
    if (!addressForm.city.trim()) errors.city = 'City / Town is mandatory *';
    if (!addressForm.state.trim()) errors.state = 'State is mandatory *';

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

  // ── Payment Validation (Strictly Mandatory) ──
  const validatePayment = () => {
    setPaymentGlobalError('');
    setUpiError('');
    setCardErrors({});
    setNetbankingError('');
    setCodError('');

    if (!paymentMethod) {
      setPaymentGlobalError('⚠️ Please select a payment option and fill in the required payment details.');
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
        setCodError('Incorrect Captcha code. Enter the 4 digits shown.');
        return false;
      }
      return true;
    }

    return false;
  };

  // ── Place Order Handler ──
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
      deliverySpeed,
      paymentMethod,
      paymentSummary: paymentMethod === 'upi'
        ? `UPI (${upiType.toUpperCase()}: ${upiId.trim()})`
        : paymentMethod === 'card'
        ? `Card Ending In ...${cardDetails.cardNumber.replace(/\s+/g, '').slice(-4)} (${cardDetails.cardName})`
        : paymentMethod === 'netbanking'
        ? `Net Banking (${selectedBank} - User: ${netbankingUserId.trim()})`
        : 'Cash on Delivery (COD Verified)',
      cartItems: displayItems,
      subtotal,
      shippingCost,
      couponDiscount,
      totalAmount,
      taxableValue,
      totalGst,
      cgst,
      sgst,
    };

    setPlacedOrderDetails(orderData);
    setOrderPlaced(true);
    if (onClearCart) onClearCart();
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="checkout-page-wrapper">
      {/* ── Top Stepper: 1. Address -> 2. Confirm Details -> 3. Payment Details ── */}
      <div className="checkout-stepper-container">
        <div className="checkout-stepper">
          <div className="step-node completed">
            <span className="step-circle active">1</span>
            <span className="step-title active-title">Address</span>
          </div>
          <div className="step-line active-line" />

          <div className="step-node active">
            <span className="step-circle current">2</span>
            <span className="step-title current-title">Confirm Details</span>
          </div>
          <div className="step-line active-line" />

          <div className="step-node active">
            <span className="step-circle current">3</span>
            <span className="step-title current-title">Payment Details</span>
          </div>
        </div>
      </div>

      <div className="checkout-content-container">
        {orderPlaced && placedOrderDetails ? (
          /* ── Order Placed Success View (Clean with 2 Options) ── */
          <div className="order-confirmed-screen">
            <div className="order-success-card-clean">
              <div className="success-badge-icon">✓</div>
              <h2 className="success-order-title">Order Placed Successfully!</h2>
              <p className="success-order-subtitle">
                Thank you, <strong>{placedOrderDetails.address.fullName}</strong>! Your order has been placed and confirmation sent to <strong>{placedOrderDetails.buyerEmail}</strong>.
              </p>

              {/* Order Info Summary Pill */}
              <div className="success-order-info-grid">
                <div className="success-info-item">
                  <span className="info-label">Order ID:</span>
                  <strong className="info-val-orange">#{placedOrderDetails.orderId}</strong>
                </div>
                <div className="success-info-item">
                  <span className="info-label">Amount Paid:</span>
                  <strong className="info-val">₹{placedOrderDetails.totalAmount} (incl. 12% GST)</strong>
                </div>
                <div className="success-info-item">
                  <span className="info-label">Payment Mode:</span>
                  <strong className="info-val">{placedOrderDetails.paymentSummary}</strong>
                </div>
                <div className="success-info-item">
                  <span className="info-label">Delivery To:</span>
                  <span className="info-val-address">
                    {placedOrderDetails.address.flatNo}, {placedOrderDetails.address.street}, {placedOrderDetails.address.city} - {placedOrderDetails.address.pincode}
                  </span>
                </div>
              </div>

              {/* EXACT 2 OPTIONS BELOW SUCCESS MESSAGE: Download Invoice & Continue Shopping */}
              <div className="order-success-two-buttons">
                <button
                  type="button"
                  className="btn-download-invoice-cta"
                  onClick={handlePrintInvoice}
                >
                  📥 Download Invoice
                </button>

                <Link to="/" className="btn-continue-shopping-cta">
                  🛍️ Continue Shopping
                </Link>
              </div>
            </div>

            {/* Hidden from screen view, only active when user clicks 'Download Invoice' to print / save as PDF */}
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
                  <p>Invoice No: <strong>{placedOrderDetails.invoiceNo}</strong></p>
                  <p>Date: <strong>{placedOrderDetails.orderDate}</strong></p>
                  <p>Order ID: <strong>#{placedOrderDetails.orderId}</strong></p>
                  <p>Payment: <strong>{placedOrderDetails.paymentSummary}</strong></p>
                </div>
              </div>

              <div className="invoice-customer-row">
                <div className="bill-to-col">
                  <strong>Billed & Shipped To:</strong>
                  <p className="cust-name">{placedOrderDetails.address.fullName}</p>
                  <p>{placedOrderDetails.address.flatNo}, {placedOrderDetails.address.street}</p>
                  <p>{placedOrderDetails.address.city}, {placedOrderDetails.address.state} - {placedOrderDetails.address.pincode}</p>
                  <p>Phone: {placedOrderDetails.address.phone}</p>
                  <p>Email: {placedOrderDetails.buyerEmail}</p>
                </div>
                <div className="place-supply-col">
                  <p>Place of Supply: <strong>Maharashtra (27)</strong></p>
                  <p>Reverse Charge: <strong>No</strong></p>
                  <p>Nature of Goods: <strong>Food & Nutrition / Peanut Butter</strong></p>
                </div>
              </div>

              {/* Items Table */}
              <table className="invoice-items-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Description</th>
                    <th>HSN Code</th>
                    <th>Qty</th>
                    <th>Gross Rate</th>
                    <th>Taxable Value</th>
                    <th>CGST (6%)</th>
                    <th>SGST (6%)</th>
                    <th>Total (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {placedOrderDetails.cartItems.map((item, idx) => {
                    const itemTaxable = ((item.finalPrice * item.quantity) / 1.12).toFixed(2);
                    const itemCgst = ((item.finalPrice * item.quantity - itemTaxable) / 2).toFixed(2);
                    const itemSgst = itemCgst;
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                          <strong>{item.name}</strong> ({item.selectedWeight || '550gm'})
                        </td>
                        <td>20081100</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.finalPrice}</td>
                        <td>₹{itemTaxable}</td>
                        <td>₹{itemCgst}</td>
                        <td>₹{itemSgst}</td>
                        <td><strong>₹{item.finalPrice * item.quantity}</strong></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Tax & Total Summary */}
              <div className="invoice-totals-section">
                <div className="invoice-gst-summary">
                  <div className="gst-calc-row">
                    <span>Total Taxable Amount:</span>
                    <strong>₹{placedOrderDetails.taxableValue}</strong>
                  </div>
                  <div className="gst-calc-row">
                    <span>CGST @ 6%:</span>
                    <strong>₹{placedOrderDetails.cgst}</strong>
                  </div>
                  <div className="gst-calc-row">
                    <span>SGST @ 6%:</span>
                    <strong>₹{placedOrderDetails.sgst}</strong>
                  </div>
                  <div className="gst-calc-row">
                    <span>Total Tax (12% GST):</span>
                    <strong>₹{placedOrderDetails.totalGst}</strong>
                  </div>
                </div>

                <div className="invoice-grand-total-box">
                  <div className="inv-row">
                    <span>Subtotal:</span>
                    <span>₹{placedOrderDetails.subtotal}</span>
                  </div>
                  <div className="inv-row">
                    <span>Shipping Charges:</span>
                    <span>{placedOrderDetails.shippingCost === 0 ? 'FREE' : `₹${placedOrderDetails.shippingCost}`}</span>
                  </div>
                  {placedOrderDetails.couponDiscount > 0 && (
                    <div className="inv-row discount">
                      <span>Discount (PRO20):</span>
                      <span>-₹{placedOrderDetails.couponDiscount}</span>
                    </div>
                  )}
                  <div className="inv-row grand">
                    <strong>Invoice Total:</strong>
                    <strong>₹{placedOrderDetails.totalAmount}</strong>
                  </div>
                  <p className="inclusive-tax-note">
                    (Amount Inclusive of 12% GST: ₹{placedOrderDetails.totalGst})
                  </p>
                </div>
              </div>

              <div className="invoice-footer-sign">
                <p>This is a computer-generated tax invoice. No physical signature required.</p>
                <div className="authorized-signatory">
                  <span className="sign-stamp">PROTINUT™ VERIFIED</span>
                  <strong>Authorized Signatory</strong>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── Main Flipkart-style Checkout Layout ── */
          <div className="checkout-main-grid">
            
            {/* ── Left Column: Steps 1, 2, 3 ── */}
            <div className="checkout-left-col">
              
              {/* ── 1. Delivery Address ── */}
              <section className="checkout-card address-card">
                <div className="card-header-bar">
                  <h3 className="section-title">1. Delivery Address</h3>
                  <span className="step-complete-check">✓</span>
                </div>

                {isEditingAddress ? (
                  /* Mandatory Address Form */
                  <form className="address-form-box" onSubmit={handleSaveAddress}>
                    <p className="form-mandatory-note">
                      * All fields are mandatory for delivery verification
                    </p>

                    <div className="form-grid-2">
                      <div className="form-field">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          value={addressForm.fullName}
                          placeholder="Full Name"
                          onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                        />
                        {formErrors.fullName && <span className="err-txt">{formErrors.fullName}</span>}
                      </div>

                      <div className="form-field">
                        <label>10-Digit Mobile Number *</label>
                        <input
                          type="tel"
                          value={addressForm.phone}
                          placeholder="e.g. +91 9876543210"
                          onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                        />
                        {formErrors.phone && <span className="err-txt">{formErrors.phone}</span>}
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-field">
                        <label>Pincode *</label>
                        <input
                          type="text"
                          maxLength={6}
                          value={addressForm.pincode}
                          placeholder="6-digit Pincode"
                          onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                        />
                        {formErrors.pincode && <span className="err-txt">{formErrors.pincode}</span>}
                      </div>

                      <div className="form-field">
                        <label>Flat / House No. / Building *</label>
                        <input
                          type="text"
                          value={addressForm.flatNo}
                          placeholder="Flat No, Floor, Building"
                          onChange={(e) => setAddressForm({ ...addressForm, flatNo: e.target.value })}
                        />
                        {formErrors.flatNo && <span className="err-txt">{formErrors.flatNo}</span>}
                      </div>
                    </div>

                    <div className="form-field">
                      <label>Area / Street / Sector *</label>
                      <input
                        type="text"
                        value={addressForm.street}
                        placeholder="Street Name, Area"
                        onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                      />
                      {formErrors.street && <span className="err-txt">{formErrors.street}</span>}
                    </div>

                    <div className="form-grid-2">
                      <div className="form-field">
                        <label>City / Town *</label>
                        <input
                          type="text"
                          value={addressForm.city}
                          placeholder="City"
                          onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        />
                        {formErrors.city && <span className="err-txt">{formErrors.city}</span>}
                      </div>

                      <div className="form-field">
                        <label>State *</label>
                        <input
                          type="text"
                          value={addressForm.state}
                          placeholder="State"
                          onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                        />
                        {formErrors.state && <span className="err-txt">{formErrors.state}</span>}
                      </div>
                    </div>

                    <div className="form-actions-row">
                      <button type="submit" className="btn-save-address">
                        Save & Deliver Here
                      </button>
                      <button
                        type="button"
                        className="btn-cancel-address"
                        onClick={() => setIsEditingAddress(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Displayed Selected Address */
                  <div className="selected-address-box">
                    <div className="radio-address-item">
                      <input
                        type="radio"
                        id="default-addr"
                        name="delivery-addr"
                        checked
                        readOnly
                      />
                      <label htmlFor="default-addr" className="address-label-wrap">
                        <strong className="customer-name">{address.fullName}</strong>
                        <p className="customer-street">
                          {address.flatNo}, {address.street}, {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="customer-phone">{address.phone}</p>
                      </label>
                    </div>

                    <div className="address-bottom-actions">
                      <button
                        type="button"
                        className="link-add-address"
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
                        className="link-change-address"
                        onClick={() => {
                          setAddressForm({ ...address });
                          setIsEditingAddress(true);
                        }}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                )}
              </section>

              {/* ── 2. Order Confirmation Details (Replaces plain delivery options) ── */}
              <section className="checkout-card confirm-details-card">
                <div className="card-header-bar">
                  <h3 className="section-title">2. Order Confirmation Details</h3>
                  <span className="step-complete-check">✓</span>
                </div>

                <div className="confirm-details-body">
                  {/* Email for invoice */}
                  <div className="confirm-email-row">
                    <label>Order Confirmation & Invoice Email *</label>
                    <input
                      type="email"
                      className="confirm-email-input"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="Enter email to receive GST invoice"
                    />
                  </div>

                  {/* Items to be Delivered */}
                  <div className="confirm-items-preview">
                    <span className="preview-label">Items to be delivered ({displayItems.length} items):</span>
                    <div className="preview-tags-row">
                      {displayItems.map((item, i) => (
                        <div key={i} className="preview-item-chip">
                          <img src={item.image} alt={item.name} />
                          <span><strong>{item.name}</strong> ({item.selectedWeight || '550gm'}) × {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Delivery Details Confirmation */}
                  <div className="confirm-address-summary">
                    <span className="preview-label">Delivering To:</span>
                    <div className="confirm-address-info-box">
                      <div className="confirm-user-row">
                        <strong className="confirm-recipient-name">👤 {address.fullName}</strong>
                        <span className="confirm-recipient-phone">📞 {address.phone}</span>
                      </div>
                      <p className="confirm-recipient-address">
                        📍 {address.flatNo}, {address.street}, {address.city}, {address.state} - {address.pincode}
                      </p>
                    </div>
                  </div>

                  {/* Guaranteed Free Delivery Promise Badge */}
                  <div className="confirm-free-delivery-banner">
                    <span className="truck-icon">🚚</span>
                    <div>
                      <strong>Guaranteed Free Delivery (3-5 Business Days)</strong>
                      <p>Dispatched in food-grade protective packaging directly from our Dharashiv, Maharashtra facility.</p>
                    </div>
                    <span className="tag-free-delivery">FREE</span>
                  </div>
                </div>
              </section>

              {/* ── 3. Payment Method with Dynamic Sub-forms (Flipkart Style) ── */}
              <section className="checkout-card payment-options-card">
                <div className="card-header-bar">
                  <h3 className="section-title">3. Payment Options</h3>
                </div>

                <div className="flipkart-payment-accordion">
                  
                  {/* ── Option A: UPI ── */}
                  <div className={`payment-method-block ${paymentMethod === 'upi' ? 'active-method' : ''}`}>
                    <label className="method-header-label" onClick={() => setPaymentMethod('upi')}>
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                      />
                      <div className="method-title-meta">
                        <strong>UPI</strong>
                        <span>Pay via PhonePe, Google Pay, Paytm, or UPI ID</span>
                      </div>
                    </label>

                    {paymentMethod === 'upi' && (
                      <div className="method-expanded-content">
                        <div className="upi-app-selector">
                          <label className={`upi-app-pill ${upiType === 'phonepe' ? 'picked' : ''}`}>
                            <input
                              type="radio"
                              name="upiApp"
                              checked={upiType === 'phonepe'}
                              onChange={() => setUpiType('phonepe')}
                            />
                            <span>📱 PhonePe</span>
                          </label>

                          <label className={`upi-app-pill ${upiType === 'gpay' ? 'picked' : ''}`}>
                            <input
                              type="radio"
                              name="upiApp"
                              checked={upiType === 'gpay'}
                              onChange={() => setUpiType('gpay')}
                            />
                            <span>🌐 Google Pay</span>
                          </label>

                          <label className={`upi-app-pill ${upiType === 'paytm' ? 'picked' : ''}`}>
                            <input
                              type="radio"
                              name="upiApp"
                              checked={upiType === 'paytm'}
                              onChange={() => setUpiType('paytm')}
                            />
                            <span>💙 Paytm</span>
                          </label>

                          <label className={`upi-app-pill ${upiType === 'id' ? 'picked' : ''}`}>
                            <input
                              type="radio"
                              name="upiApp"
                              checked={upiType === 'id'}
                              onChange={() => setUpiType('id')}
                            />
                            <span>@ Enter UPI ID</span>
                          </label>
                        </div>

                        {/* Mandatory UPI input for all app selections */}
                        <div className="upi-id-input-wrap" style={{ marginTop: '12px' }}>
                          <input
                            type="text"
                            className="upi-text-box"
                            placeholder={
                              upiType === 'phonepe'
                                ? 'PhonePe mobile number or VPA (e.g. 9876543210@ybl)'
                                : upiType === 'gpay'
                                ? 'Google Pay UPI ID (e.g. name@okaxis)'
                                : upiType === 'paytm'
                                ? 'Paytm UPI ID (e.g. 9876543210@paytm)'
                                : 'Enter your UPI ID (e.g. name@okhdfcbank)'
                            }
                            value={upiId}
                            onChange={(e) => {
                              setUpiId(e.target.value);
                              setUpiError('');
                              setPaymentGlobalError('');
                            }}
                          />
                        </div>
                        {upiError && <span className="method-err-text">{upiError}</span>}

                        <button
                          type="button"
                          className="btn-method-pay"
                          onClick={handlePlaceOrder}
                        >
                          PAY ₹{totalAmount} VIA UPI
                        </button>
                      </div>
                    )}
                  </div>

                  {/* ── Option B: Credit / Debit / ATM Card ── */}
                  <div className={`payment-method-block ${paymentMethod === 'card' ? 'active-method' : ''}`}>
                    <label
                      className="method-header-label"
                      onClick={() => {
                        setPaymentMethod('card');
                        setPaymentGlobalError('');
                      }}
                    >
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'card'}
                        onChange={() => {
                          setPaymentMethod('card');
                          setPaymentGlobalError('');
                        }}
                      />
                      <div className="method-title-meta">
                        <strong>Credit / Debit / ATM Card</strong>
                        <span>Visa, MasterCard, RuPay, Maestro</span>
                      </div>
                    </label>

                    {paymentMethod === 'card' && (
                      <div className="method-expanded-content">
                        <div className="card-input-form">
                          <div className="card-field">
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
                            {cardErrors.cardNumber && <span className="method-err-text">{cardErrors.cardNumber}</span>}
                          </div>

                          <div className="card-row-2">
                            <div className="card-field">
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
                              {cardErrors.cardExpiry && <span className="method-err-text">{cardErrors.cardExpiry}</span>}
                            </div>

                            <div className="card-field">
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
                              {cardErrors.cardCvv && <span className="method-err-text">{cardErrors.cardCvv}</span>}
                            </div>
                          </div>

                          <div className="card-field">
                            <label>Name on Card *</label>
                            <input
                              type="text"
                              placeholder="Name as printed on card"
                              value={cardDetails.cardName}
                              onChange={(e) => {
                                setCardDetails({ ...cardDetails, cardName: e.target.value });
                                setPaymentGlobalError('');
                              }}
                            />
                            {cardErrors.cardName && <span className="method-err-text">{cardErrors.cardName}</span>}
                          </div>

                          <button
                            type="button"
                            className="btn-method-pay"
                            onClick={handlePlaceOrder}
                          >
                            PAY ₹{totalAmount} VIA CARD
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Option C: Net Banking ── */}
                  <div className={`payment-method-block ${paymentMethod === 'netbanking' ? 'active-method' : ''}`}>
                    <label
                      className="method-header-label"
                      onClick={() => {
                        setPaymentMethod('netbanking');
                        setPaymentGlobalError('');
                      }}
                    >
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'netbanking'}
                        onChange={() => {
                          setPaymentMethod('netbanking');
                          setPaymentGlobalError('');
                        }}
                      />
                      <div className="method-title-meta">
                        <strong>Net Banking</strong>
                        <span>All Indian Banks Supported</span>
                      </div>
                    </label>

                    {paymentMethod === 'netbanking' && (
                      <div className="method-expanded-content">
                        <label className="bank-select-label">Select Popular Bank: *</label>
                        <div className="popular-banks-grid">
                          {['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak'].map((bank) => (
                            <label key={bank} className={`bank-pill ${selectedBank === bank ? 'selected' : ''}`}>
                              <input
                                type="radio"
                                name="bank"
                                checked={selectedBank === bank}
                                onChange={() => {
                                  setSelectedBank(bank);
                                  setNetbankingError('');
                                  setPaymentGlobalError('');
                                }}
                              />
                              <span>🏦 {bank}</span>
                            </label>
                          ))}
                        </div>

                        <div className="card-field" style={{ marginTop: '12px' }}>
                          <label>Net Banking User ID / Customer ID *</label>
                          <input
                            type="text"
                            className="upi-text-box"
                            placeholder="Enter your Bank User ID / Customer ID"
                            value={netbankingUserId}
                            onChange={(e) => {
                              setNetbankingUserId(e.target.value);
                              setNetbankingError('');
                              setPaymentGlobalError('');
                            }}
                          />
                        </div>
                        {netbankingError && <span className="method-err-text">{netbankingError}</span>}

                        <button
                          type="button"
                          className="btn-method-pay"
                          onClick={handlePlaceOrder}
                        >
                          PROCEED WITH {selectedBank || 'NET'} BANKING
                        </button>
                      </div>
                    )}
                  </div>

                  {/* ── Option D: Cash on Delivery (COD) with Captcha Verification ── */}
                  <div className={`payment-method-block ${paymentMethod === 'cod' ? 'active-method' : ''}`}>
                    <label className="method-header-label" onClick={() => setPaymentMethod('cod')}>
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                      />
                      <div className="method-title-meta">
                        <strong>Cash on Delivery (COD)</strong>
                        <span>Pay cash at time of delivery</span>
                      </div>
                    </label>

                    {paymentMethod === 'cod' && (
                      <div className="method-expanded-content">
                        <div className="cod-captcha-box">
                          <p>To confirm your cash on delivery order, please enter the captcha code:</p>
                          <div className="captcha-display-row">
                            <span className="captcha-digits">{captchaCode}</span>
                            <button
                              type="button"
                              className="btn-refresh-captcha"
                              onClick={() => setCaptchaCode(Math.floor(1000 + Math.random() * 9000).toString())}
                            >
                              🔄
                            </button>
                            <input
                              type="text"
                              maxLength={4}
                              className="captcha-input-field"
                              placeholder="Enter digits"
                              value={captchaInput}
                              onChange={(e) => setCaptchaInput(e.target.value)}
                            />
                          </div>
                          {codError && <span className="method-err-text">{codError}</span>}
                        </div>

                        <button
                          type="button"
                          className="btn-method-pay"
                          onClick={handlePlaceOrder}
                        >
                          CONFIRM CASH ON DELIVERY ORDER (₹{totalAmount})
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              </section>

            </div>

            {/* ── Right Column: Order Summary (Reference Image Exact Match) ── */}
            <div className="checkout-right-col">
              <div className="order-summary-sidebar">
                <h3 className="summary-title">Order Summary</h3>

                {/* Products in summary */}
                <div className="summary-products-list">
                  {displayItems.map((item, idx) => (
                    <div key={idx} className="summary-product-item">
                      <div className="summary-item-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="summary-item-info">
                        <h4>{item.name}</h4>
                        <span className="summary-item-weight">{item.selectedWeight || '550gm'}</span>
                        <strong className="summary-item-price">₹{item.finalPrice * item.quantity}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary-hr" />

                {/* Price Breakdown */}
                <div className="summary-breakdown">
                  <div className="breakdown-row">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div className="breakdown-row">
                    <span>Shipping</span>
                    <span className="free-shipping-tag">
                      {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                    </span>
                  </div>

                  <div className="breakdown-row">
                    <span>Coupon</span>
                    <span className="coupon-discount-tag">-₹{couponDiscount}</span>
                  </div>

                  {/* 12% GST Breakdown row */}
                  <div className="breakdown-row gst-row">
                    <span>Including 12% GST</span>
                    <span className="gst-tag">₹{totalGst}</span>
                  </div>

                  <div className="summary-total-row">
                    <strong>Total</strong>
                    <strong className="total-amount-display">₹{totalAmount}</strong>
                  </div>
                </div>

                {/* Big Solid Orange Place Order CTA Button */}
                <button
                  type="button"
                  className="btn-place-order"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>

                <p className="checkout-secure-note">
                  🔒 100% Safe & Encrypted Payments • FSSAI Food Grade Packaging
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
