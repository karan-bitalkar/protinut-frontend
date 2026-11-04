import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  // Store only the user's real orders in localStorage (filters out any old dummy data)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('protinut_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out any legacy dummy sample orders
          return parsed.filter(o => o.id !== 'ORD-202611040001' && o.invoiceNo !== 'INV-2026-0001');
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('protinut_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders to localStorage', e);
    }
  }, [orders]);

  const placeOrder = ({ items, address, paymentMethod, subtotal, discount, cgst, sgst, totalGst, deliveryCharge, grandTotal, userEmail }) => {
    const uniqueDigits = Math.floor(100000 + Math.random() * 900000);
    const orderId = `ORD-${Date.now().toString().slice(-4)}${uniqueDigits}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const newOrder = {
      id: orderId,
      invoiceNo: `INV-${uniqueDigits}`,
      date: formattedDate,
      invoiceDate: formattedDate,
      status: 'Delivered',
      statusIndex: 4,
      canCancel: false,
      // Map strictly to the exact items the user bought:
      items: items.map(i => ({
        id: i.id,
        name: i.name,
        weight: i.selectedWeight || i.weight || '',
        quantity: Number(i.quantity || 1),
        finalPrice: Number(i.finalPrice || i.price || 0),
        originalPrice: Number(i.originalPrice || Math.round((i.finalPrice || 0) * 1.35)),
        image: i.image || ''
      })),
      address: {
        name: address.name,
        mobile: address.mobile,
        pincode: address.pincode,
        addressLine: address.addressLine,
        city: address.city,
        state: address.state
      },
      userEmail: userEmail || address?.email || '',
      paymentMethod,
      pricing: {
        subtotal: Number(subtotal),
        discount: Number(discount || 0),
        cgst: Number(cgst ?? ((subtotal * 0.025)).toFixed(2)),
        sgst: Number(sgst ?? ((subtotal * 0.025)).toFixed(2)),
        totalGst: Number(totalGst ?? ((subtotal * 0.05)).toFixed(2)),
        deliveryCharge: Number(deliveryCharge || 0),
        grandTotal: Number(grandTotal)
      },
      timeline: [
        { step: 'Order Placed', date: formattedDate, desc: 'Your order has been received and confirmed.', completed: true },
        { step: 'Processing', date: formattedDate, desc: 'Item packed at Dharashiv warehouse.', completed: true },
        { step: 'Shipped', date: formattedDate, desc: 'Handed over to Express Courier partner.', completed: true },
        { step: 'Out for Delivery', date: formattedDate, desc: 'Courier agent out for delivery.', completed: true },
        { step: 'Delivered', date: formattedDate, desc: 'Package delivered to recipient.', completed: true }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const cancelOrder = (orderId, reason = 'Customer requested cancellation') => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          toast.success(`Order #${orderId} has been cancelled`, {
            style: {
              background: '#2b1810',
              color: '#ffffff',
              borderRadius: '12px',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '13px',
              fontWeight: 700
            }
          });
          return {
            ...order,
            status: 'Cancelled',
            canCancel: false,
            cancellationReason: reason,
            cancelledAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
          };
        }
        return order;
      })
    );
  };

  const resetOrders = () => {
    setOrders([]);
    try {
      localStorage.removeItem('protinut_orders');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        cancelOrder,
        resetOrders
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export default OrderContext;
