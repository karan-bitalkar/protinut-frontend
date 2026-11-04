import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

const MAX_CART_LIMIT = 5;

export const CartProvider = ({ children }) => {
  // Initial state is strictly empty [] - no hardcoded dummy items!
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('protinut_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('protinut_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Flipkart style calculations
  const originalPriceTotal = cartItems.reduce((acc, item) => {
    const original = item.originalPrice || Math.round(item.finalPrice * 1.35);
    return acc + (original * item.quantity);
  }, 0);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.finalPrice * item.quantity), 0);
  const discount = Math.max(0, originalPriceTotal - subtotal);

  // 5% Total GST split into CGST (2.5%) & SGST (2.5%)
  const cgst = cartItems.length > 0 ? Math.round(subtotal * 0.025) : 0;
  const sgst = cartItems.length > 0 ? Math.round(subtotal * 0.025) : 0;
  const totalGst = cgst + sgst;

  // Delivery charge: Free if Subtotal > 499, otherwise 40 (0 if empty)
  const deliveryCharge = (subtotal > 499 || cartItems.length === 0) ? 0 : 40;

  // Grand Total = Subtotal + Delivery + CGST + SGST (or Original MRP - Discount + Delivery + CGST + SGST)
  const grandTotal = cartItems.length > 0 ? (subtotal + deliveryCharge + cgst + sgst) : 0;

  const addToCart = (product, quantity = 1, selectedWeight = null) => {
    const weight = selectedWeight || product.selectedWeight || '550gm';
    const price = product.finalPrice || (weight === '1kg' ? (product.price1kg || 480) : (product.price550 || product.price || 250));
    const original = product.originalPrice || Math.round(price * 1.35);

    const currentTotal = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    if (currentTotal + quantity > MAX_CART_LIMIT) {
      toast.error(`⚠️ Cart Limit Reached! Maximum limit is ${MAX_CART_LIMIT} jars.`, {
        duration: 2500,
        style: {
          background: '#dc2626',
          color: '#ffffff',
          borderRadius: '10px',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '13px',
          fontWeight: 700,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)'
        }
      });
      return false;
    }

    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id && item.selectedWeight === weight);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = {
          ...copy[idx],
          quantity: copy[idx].quantity + quantity
        };
        return copy;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          selectedWeight: weight,
          originalPrice: original,
          finalPrice: price,
          quantity,
          image: product.image || '/products/classy-crunch.png',
        }
      ];
    });

    const itemLabel = product.name ? `${product.name} (${weight})` : 'Item';
    toast.success(`${itemLabel} added to cart!`, {
      duration: 2500,
      icon: '✅',
      style: {
        background: '#16a34a',
        color: '#ffffff',
        borderRadius: '10px',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '13px',
        fontWeight: 700,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)'
      }
    });

    return true;
  };

  const updateQuantity = (productId, selectedWeight, newQty) => {
    const item = cartItems.find((i) => i.id === productId && i.selectedWeight === selectedWeight);
    if (!item) return;

    const diff = newQty - item.quantity;
    const currentTotal = cartItems.reduce((acc, i) => acc + i.quantity, 0);

    if (diff > 0 && currentTotal + diff > MAX_CART_LIMIT) {
      toast.error(`⚠️ Maximum limit of ${MAX_CART_LIMIT} jars reached!`, {
        duration: 2500,
        style: {
          background: '#dc2626',
          color: '#ffffff',
          borderRadius: '10px',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '13px',
          fontWeight: 700,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)'
        }
      });
      return;
    }

    if (newQty <= 0) {
      removeItem(productId, selectedWeight);
      return;
    }

    setCartItems((prev) =>
      prev.map((i) =>
        i.id === productId && i.selectedWeight === selectedWeight
          ? { ...i, quantity: newQty }
          : i
      )
    );
  };

  const removeItem = (productId, selectedWeight) => {
    const itemToRemove = cartItems.find(
      (i) => i.id === productId && (!selectedWeight || i.selectedWeight === selectedWeight)
    );
    const itemName = itemToRemove ? `${itemToRemove.name} removed from cart.` : 'Item removed from cart.';

    setCartItems((prev) =>
      prev.filter((i) => !(i.id === productId && (selectedWeight ? i.selectedWeight === selectedWeight : true)))
    );

    toast.error(itemName, {
      duration: 2500,
      icon: '🗑️',
      style: {
        background: '#dc2626',
        color: '#ffffff',
        borderRadius: '10px',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '13px',
        fontWeight: 700,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)'
      }
    });
  };

  const clearCart = () => {
    if (cartItems.length > 0) {
      setCartItems([]);
      toast.error('All items removed from cart.', {
        duration: 2500,
        icon: '🗑️',
        style: {
          background: '#dc2626',
          color: '#ffffff',
          borderRadius: '10px',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '13px',
          fontWeight: 700,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)'
        }
      });
    }
  };

  // Reset cart for testing / clean login
  const resetCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('protinut_cart');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <CartContext.Provider
      value={{
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
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        resetCart,
        MAX_CART_LIMIT
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
