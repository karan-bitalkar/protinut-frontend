import React, { useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';
import './InvoiceModal.css';

/**
 * Format date to 'DD MMM YYYY' (e.g., '04 Nov 2026')
 */
const formatInvoiceDate = (dateVal) => {
  if (!dateVal) {
    return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  const d = new Date(dateVal);
  if (!isNaN(d.getTime())) {
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  const parts = String(dateVal).split(',');
  return parts[0].trim();
};

/**
 * InvoiceModal – 100% Dynamic Official Tax Invoice
 * Strictly displays the exact items bought in that specific order.
 * No hardcoded or dummy products.
 */
const InvoiceModal = ({ isOpen, onClose, order }) => {
  const invoiceRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { user } = useAuth();

  if (!isOpen || !order) return null;

  // ── 1. Real Order Items (Strictly from order.items) ──
  const items = Array.isArray(order.items) ? order.items : [];

  // ── 2. Real Customer & Shipping Details ──
  const customerName = order.address?.name || user?.name || 'Customer';
  const customerMobile = order.address?.mobile || user?.phone || '';
  const customerEmail = order.userEmail || order.address?.email || user?.email || user?.identifier || '';

  const addressParts = [
    order.address?.addressLine,
    order.address?.city,
    order.address?.state ? `${order.address.state}${order.address?.pincode ? ` - ${order.address.pincode}` : ''}` : null
  ].filter(Boolean);

  const fullAddress = addressParts.length > 0 ? addressParts.join(', ') : 'Delivery address not specified';

  const recipientName = customerName;
  const recipientMobile = customerMobile;
  const recipientAddress = fullAddress;

  // ── 3. Real Order Identifiers & Metadata ──
  const orderId = order.id || 'ORD-000000';
  const rawIdDigits = String(orderId).replace(/\D/g, '');
  const invoiceSuffix = rawIdDigits ? rawIdDigits.slice(-6) : '0001';
  const invoiceNo = order.invoiceNo || `INV-${invoiceSuffix}`;
  const formattedOrderDate = formatInvoiceDate(order.date);
  const formattedInvoiceDate = formatInvoiceDate(order.invoiceDate || order.date);
  const paymentMethod = order.paymentMethod || 'Online (UPI)';
  const orderStatus = order.status || 'Delivered';

  // ── 4. Dynamic Calculations Based ONLY on this specific order's items ──
  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.finalPrice ?? item.price ?? 0);
    const qty = Number(item.quantity ?? 1);
    return sum + (price * qty);
  }, 0);

  const cgst = Number(((subtotal * 2.5) / 100).toFixed(2));
  const sgst = Number(((subtotal * 2.5) / 100).toFixed(2));
  const delivery = Number(order.pricing?.deliveryCharge || 0);
  const discount = Number(order.pricing?.discount || 0);
  const grandTotal = order.pricing?.grandTotal != null
    ? Number(order.pricing.grandTotal)
    : Number((subtotal + cgst + sgst + delivery - discount).toFixed(2));

  // ── PDF Export Functionality ──
  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    const toastId = toast.loading('Generating Tax Invoice PDF...');

    try {
      const { default: jsPDF } = await import('jspdf');
      const { default: html2canvas } = await import('html2canvas');

      const element = invoiceRef.current;
      if (!element) throw new Error('Invoice element not found');

      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Protinut_Invoice_${orderId}.pdf`);

      toast.success('Invoice downloaded successfully! 📄', { id: toastId });
    } catch (err) {
      console.warn('PDF export fallback:', err);
      toast.dismiss(toastId);
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="invoice-modal-backdrop" onClick={onClose}>
      <div className="invoice-modal-dialog" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="invoice-modal-header no-print">
          <div className="invoice-header-title-box">
            <span className="invoice-badge-icon">🧾</span>
            <div>
              <h3 className="invoice-preview-title">Tax Invoice Preview</h3>
              <p className="invoice-preview-subtitle">Order #{orderId}</p>
            </div>
          </div>

          <div className="invoice-header-actions">
            <button
              type="button"
              onClick={handlePrint}
              className="btn-invoice-action btn-print"
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Print</span>
            </button>

            <button
              type="button"
              disabled={isGenerating}
              onClick={handleDownloadPDF}
              className="btn-invoice-action btn-download"
            >
              {isGenerating ? (
                <span>Generating...</span>
              ) : (
                <>
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="invoice-close-btn"
              aria-label="Close invoice preview"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── Scrollable Document Container ── */}
        <div className="invoice-scroll-container">
          <div ref={invoiceRef} className="invoice-document-sheet printable-content">
            
            {/* ══════════════════════════════════════════════════════════
                1. HEADER: Orange Swoosh Banner with PROTINUT & Title
                ══════════════════════════════════════════════════════════ */}
            <div className="inv-top-banner">
              <div className="inv-banner-orange-shape">
                <div className="inv-brand-logo-text">
                  <span>PROTINUT</span>
                  <span className="inv-brand-tm">™</span>
                </div>
              </div>

              <div className="inv-title-box">
                <h1 className="inv-main-heading">INVOICE</h1>
                <p className="inv-sub-heading">Tax Invoice / Order Receipt</p>
                <div className="inv-title-line" />
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════
                2. COMPANY DETAILS & INVOICE META ROW
                ══════════════════════════════════════════════════════════ */}
            <div className="inv-meta-split">
              {/* Left Column: Protinut Foods Details */}
              <div className="inv-company-details">
                <h2 className="inv-company-name">PROTINUT FOODS</h2>
                <div className="inv-company-info-row">
                  <span className="inv-icon">📍</span>
                  <span>Laxmi Niwas, Vidya Nagar, Dharashiv (Gramin), Dharashiv Taluka, Dharashiv, Maharashtra - 413501</span>
                </div>
                <div className="inv-company-info-row">
                  <span className="inv-icon">✉️</span>
                  <span>protinut.in@gmail.com</span>
                </div>
                <div className="inv-company-info-row">
                  <span className="inv-icon">📞</span>
                  <span>+91 830 830 2301</span>
                </div>
                <div className="inv-company-info-row">
                  <span className="inv-icon">🌐</span>
                  <span>www.protinut.in</span>
                </div>
                <div className="inv-gstin-highlight">
                  <strong>GSTIN : 27PRRPS9570L1Z6</strong>
                </div>
                <div className="inv-fssai-text">
                  FSSAI No : <strong>21526050000128</strong>
                </div>
              </div>

              {/* Right Column: Dynamic Invoice & Order Meta */}
              <div className="inv-order-meta-box">
                <table className="inv-meta-table">
                  <tbody>
                    <tr>
                      <td className="meta-label">Invoice No.</td>
                      <td className="meta-colon">:</td>
                      <td className="meta-value bold">{invoiceNo}</td>
                    </tr>
                    <tr>
                      <td className="meta-label">Order ID</td>
                      <td className="meta-colon">:</td>
                      <td className="meta-value bold">{orderId}</td>
                    </tr>
                    <tr>
                      <td className="meta-label">Order Date</td>
                      <td className="meta-colon">:</td>
                      <td className="meta-value">{formattedOrderDate}</td>
                    </tr>
                    <tr>
                      <td className="meta-label">Invoice Date</td>
                      <td className="meta-colon">:</td>
                      <td className="meta-value">{formattedInvoiceDate}</td>
                    </tr>
                    <tr>
                      <td className="meta-label">Payment Method</td>
                      <td className="meta-colon">:</td>
                      <td className="meta-value">{paymentMethod}</td>
                    </tr>
                    <tr>
                      <td className="meta-label">Order Status</td>
                      <td className="meta-colon">:</td>
                      <td className="meta-value">
                        <span className="inv-status-pill">
                          {orderStatus} ✓
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════
                3. BILL TO & SHIP TO CARDS (Peach Accent)
                ══════════════════════════════════════════════════════════ */}
            <div className="inv-parties-container">
              {/* Bill To */}
              <div className="inv-party-card">
                <div className="inv-party-header">
                  <span className="inv-party-icon">👤</span>
                  <span className="inv-party-heading">Bill To (Customer Details)</span>
                </div>
                <div className="inv-party-body">
                  <div className="inv-info-line">
                    <span className="line-lbl">Customer Name</span>
                    <span className="line-sep">:</span>
                    <strong className="line-val">{customerName}</strong>
                  </div>
                  <div className="inv-info-line">
                    <span className="line-lbl">Address</span>
                    <span className="line-sep">:</span>
                    <span className="line-val">{fullAddress}</span>
                  </div>
                  {customerMobile && (
                    <div className="inv-info-line">
                      <span className="line-lbl">Mobile No.</span>
                      <span className="line-sep">:</span>
                      <span className="line-val">{customerMobile}</span>
                    </div>
                  )}
                  {customerEmail && (
                    <div className="inv-info-line">
                      <span className="line-lbl">Email</span>
                      <span className="line-sep">:</span>
                      <span className="line-val">{customerEmail}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Ship To */}
              <div className="inv-party-card">
                <div className="inv-party-header">
                  <span className="inv-party-icon">🚚</span>
                  <span className="inv-party-heading">Ship To (Delivery Address)</span>
                </div>
                <div className="inv-party-body">
                  <div className="inv-info-line">
                    <span className="line-lbl">Recipient Name</span>
                    <span className="line-sep">:</span>
                    <strong className="line-val">{recipientName}</strong>
                  </div>
                  <div className="inv-info-line">
                    <span className="line-lbl">Address</span>
                    <span className="line-sep">:</span>
                    <span className="line-val">{recipientAddress}</span>
                  </div>
                  {recipientMobile && (
                    <div className="inv-info-line">
                      <span className="line-lbl">Mobile No.</span>
                      <span className="line-sep">:</span>
                      <span className="line-val">{recipientMobile}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════
                4. ORDER ITEMS TABLE (Vibrant Orange Header)
                ══════════════════════════════════════════════════════════ */}
            <div className="inv-items-section">
              <div className="inv-items-title">
                <span className="inv-cart-icon">🛒</span>
                <span>Order Items</span>
              </div>

              <table className="inv-items-table">
                <thead>
                  <tr>
                    <th style={{ width: '10%' }}>Sr. No.</th>
                    <th style={{ width: '46%' }} className="text-left">Product</th>
                    <th style={{ width: '14%' }}>Quantity</th>
                    <th style={{ width: '15%' }} className="text-right">Price (₹)</th>
                    <th style={{ width: '15%' }} className="text-right">Total (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-gray-500 font-medium">
                        No items found in this order.
                      </td>
                    </tr>
                  ) : (
                    items.map((item, index) => {
                      const price = Number(item.finalPrice ?? item.price ?? 0);
                      const qty = Number(item.quantity ?? 1);
                      const lineTotal = price * qty;
                      const itemWeight = item.weight || item.selectedWeight || '';

                      return (
                        <tr key={item.id || index}>
                          <td className="text-center font-bold text-gray-700">{index + 1}</td>
                          <td className="product-cell">
                            <div className="product-wrap">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="product-thumb"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              )}
                              <div className="product-meta">
                                <span className="product-name">{item.name}</span>
                                {itemWeight && <span className="product-weight">({itemWeight})</span>}
                              </div>
                            </div>
                          </td>
                          <td className="text-center font-bold text-gray-800">{qty}</td>
                          <td className="text-right font-medium text-gray-800">₹{price.toFixed(2)}</td>
                          <td className="text-right font-bold text-gray-900">₹{lineTotal.toFixed(2)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* ══════════════════════════════════════════════════════════
                5. THANK YOU NOTE & FINANCIAL TOTALS BREAKDOWN
                ══════════════════════════════════════════════════════════ */}
            <div className="inv-bottom-split">
              {/* Thank You Note Box */}
              <div className="inv-thankyou-box">
                <div className="inv-thankyou-title-row">
                  <span className="leaf-icon">🍃</span>
                  <h3>Thank You for Choosing <span className="brand-orange">PROTINUT™!</span></h3>
                </div>
                <p className="inv-thankyou-text">
                  Your trust in our products helps us promote healthy and nutritious living.
                </p>
              </div>

              {/* Totals & Tax Calculation Table */}
              <div className="inv-calculation-box">
                <table className="inv-calc-table">
                  <tbody>
                    <tr>
                      <td className="calc-lbl">Subtotal</td>
                      <td className="calc-val">₹{subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="calc-lbl">CGST (2.5%)</td>
                      <td className="calc-val">₹{cgst.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="calc-lbl">SGST (2.5%)</td>
                      <td className="calc-val">₹{sgst.toFixed(2)}</td>
                    </tr>
                    {delivery > 0 && (
                      <tr>
                        <td className="calc-lbl">Delivery Charges</td>
                        <td className="calc-val">₹{delivery.toFixed(2)}</td>
                      </tr>
                    )}
                    {discount > 0 && (
                      <tr>
                        <td className="calc-lbl text-green-700">Discount</td>
                        <td className="calc-val text-green-700">− ₹{discount.toFixed(2)}</td>
                      </tr>
                    )}
                    <tr className="grand-total-row">
                      <td className="grand-lbl">Grand Total</td>
                      <td className="grand-val">₹{grandTotal.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════
                6. TERMS & CONDITIONS & SIGNATURE
                ══════════════════════════════════════════════════════════ */}
            <div className="inv-legal-signature-grid">
              {/* Terms and Conditions */}
              <div className="inv-terms-col">
                <h4 className="inv-terms-heading">Terms & Conditions:</h4>
                <ul className="inv-terms-list">
                  <li>This is a computer generated invoice and does not require a physical signature.</li>
                  <li>Goods once delivered cannot be returned except in case of damaged or wrong product.</li>
                  <li>For return or refund, please visit www.protinut.in/returns within 7 days of delivery.</li>
                  <li>For any support, contact us at protinut.in@gmail.com or +91 830 830 2301.</li>
                </ul>
              </div>

              {/* Signature Box */}
              <div className="inv-signature-col">
                <span className="inv-sig-company">For PROTINUT Food's</span>
                <div className="inv-sig-stamp">
                  <div className="inv-sig-handwriting">
                    <span>PROTINUT</span>
                    <span>Food's</span>
                  </div>
                  <div className="inv-sig-line" />
                </div>
                <strong className="inv-sig-designation">Proprietor</strong>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════
                7. BOTTOM ORANGE SWOOSH
                ══════════════════════════════════════════════════════════ */}
            <div className="inv-bottom-orange-swoosh" aria-hidden="true" />

          </div>
        </div>

      </div>
    </div>
  );
};

export default InvoiceModal;
