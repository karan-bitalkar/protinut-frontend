import React, { useState } from 'react';

const CANCELLATION_REASONS = [
  'Ordered by mistake',
  'Found a better price elsewhere',
  'Delivery time is too long',
  'Changed my mind',
  'Other (Please specify)'
];

const CancelOrderModal = ({ isOpen, onClose, onConfirmCancel, order }) => {
  const [step, setStep] = useState(1); // 1 = Select Reason, 2 = Confirmation
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReasonText, setOtherReasonText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !order) return null;

  const handleClose = () => {
    setStep(1);
    setSelectedReason('');
    setOtherReasonText('');
    setIsSubmitting(false);
    onClose();
  };

  const finalReason = selectedReason === 'Other (Please specify)' 
    ? (otherReasonText.trim() || 'Other reason') 
    : selectedReason;

  const isContinueDisabled = !selectedReason || (selectedReason === 'Other (Please specify)' && !otherReasonText.trim());

  const handleProceedToConfirm = (e) => {
    e.preventDefault();
    if (isContinueDisabled) return;
    setStep(2);
  };

  const handleFinalCancel = async () => {
    setIsSubmitting(true);
    await onConfirmCancel(order.id, finalReason);
    setIsSubmitting(false);
    handleClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans"
      onClick={handleClose}
    >
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold">
              ✕
            </span>
            <div>
              <h3 className="text-sm font-bold text-gray-900 font-['Montserrat']">
                {step === 1 ? 'Reason for Cancellation' : 'Confirm Cancellation'}
              </h3>
              <p className="text-[11px] text-gray-500 font-mono">
                Order #{order.id}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* ── STEP 1: Select Reason ── */}
        {step === 1 && (
          <form onSubmit={handleProceedToConfirm} className="p-6">
            <p className="text-xs text-gray-600 mb-4 font-medium">
              Please choose a reason for cancelling this order. This helps PROTINUT™ improve our products & service:
            </p>

            <div className="space-y-2.5 mb-5">
              {CANCELLATION_REASONS.map((reason) => (
                <label 
                  key={reason}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedReason === reason
                      ? 'border-primary bg-orange-50/40 text-gray-900 font-semibold shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="cancel_reason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={() => setSelectedReason(reason)}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="text-xs">{reason}</span>
                </label>
              ))}
            </div>

            {/* Custom Reason Text Area if "Other" is picked */}
            {selectedReason === 'Other (Please specify)' && (
              <div className="mb-5 animate-fade-in">
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Please specify your reason *
                </label>
                <textarea
                  rows={2}
                  value={otherReasonText}
                  onChange={(e) => setOtherReasonText(e.target.value)}
                  placeholder="Tell us what went wrong..."
                  className="w-full p-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  autoFocus
                />
              </div>
            )}

            {/* Step 1 Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isContinueDisabled}
                className="px-6 py-2.5 text-xs font-bold text-white bg-primary hover:bg-primary-hover active:bg-[#d94416] rounded-xl shadow-md transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <span>Continue</span>
                <span>→</span>
              </button>
            </div>
          </form>
        )}

        {/* ── STEP 2: Confirmation ── */}
        {step === 2 && (
          <div className="p-6">
            <div className="text-center py-2">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner text-2xl">
                ⚠️
              </div>
              <h4 className="text-base font-black text-gray-900 font-['Montserrat']">
                Are you sure you want to cancel this order?
              </h4>
              <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                Once cancelled, this action cannot be undone. We will stop shipment from our Dharashiv facility immediately.
              </p>
            </div>

            {/* Cancellation Summary Pill */}
            <div className="bg-gray-50 rounded-xl p-3.5 my-5 border border-gray-200 text-xs space-y-2">
              <div className="flex justify-between items-center text-gray-700">
                <span className="text-gray-500">Cancellation Reason:</span>
                <strong className="text-gray-900 max-w-[200px] truncate text-right">{finalReason}</strong>
              </div>
              <div className="flex justify-between items-center text-gray-700">
                <span className="text-gray-500">Refund Amount:</span>
                <strong className="text-primary text-sm font-black">₹{order.pricing?.grandTotal}</strong>
              </div>
              <div className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-200 font-medium leading-relaxed">
                ✓ Full refund will be automatically returned to your original payment method ({order.paymentMethod}) within 2-4 business days.
              </div>
            </div>

            {/* Step 2 Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
                className="px-5 py-2.5 text-xs font-bold text-gray-700 hover:text-gray-950 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xl transition"
              >
                No, Go Back
              </button>
              
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalCancel}
                className="px-6 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl shadow-md transition flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Cancelling...</span>
                ) : (
                  <>
                    <span>Yes, Cancel Order</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CancelOrderModal;
