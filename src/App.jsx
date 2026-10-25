import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { AuthProvider, useAuth } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductModal from './ProductModal';
import SideCartDrawer from './SideCartDrawer';
import WishlistDrawer from './WishlistDrawer';
import AuthModal from './AuthModal';
import { initialWishlistProducts } from './wishlistData';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import BenefitsPage from './pages/BenefitsPage';
import RecipesPage from './pages/RecipesPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import OrdersPage from './pages/OrdersPage';
import AccountPage from './pages/AccountPage';

const MAX_CART_LIMIT = 5;

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Global Wishlist State
  const [wishlistItems, setWishlistItems] = useState(initialWishlistProducts);

  // Cart State
  const [cartItems, setCartItems] = useState([
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
  ]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // ── Wishlist Handlers (Add / Remove toggle with Auth Check) ──
  const handleToggleWishlist = (product) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to your wishlist', {
        id: 'auth-wishlist-action-toast',
        duration: 3500,
        style: {
          background: '#2b1810',
          color: '#ffffff',
          borderRadius: '12px',
          border: '1.5px solid #ef5323',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '13px',
          fontWeight: 700
        }
      });
      navigate(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`);
      return false;
    }

    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        toast('Removed from Wishlist', {
          icon: 'ℹ️',
          style: {
            background: '#2b1810',
            color: '#ffffff',
            borderRadius: '12px',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '13px'
          }
        });
        return prev.filter((item) => item.id !== product.id);
      } else {
        toast.success(`❤️ Added ${product.name} to Wishlist!`, {
          style: {
            background: '#15803d',
            color: '#ffffff',
            borderRadius: '12px',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '13px',
            fontWeight: 700
          }
        });
        return [
          {
            id: product.id,
            name: product.name,
            weight: product.weight || product.selectedWeight || '550gm',
            price: product.price || product.finalPrice || 250,
            originalPrice: product.originalPrice || Math.round((product.price || 250) * 1.35),
            image: product.image || '/products/classy-crunch.png',
            rating: product.rating || 4.8,
            reviewsCount: product.reviewsCount || 280,
            tag: product.tag || 'Bestseller',
            inStock: product.inStock !== false && product.isOutOfStock !== true && product.isAvailable !== false,
            isOutOfStock: product.isOutOfStock || product.isAvailable === false
          },
          ...prev
        ];
      }
    });
    return true;
  };

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearWishlist = () => {
    setWishlistItems([]);
  };

  // ── Add to Cart (Requires Login + Strict 5-product limit check) ──
  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart', {
        id: 'auth-cart-action-toast',
        duration: 3500,
        style: {
          background: '#2b1810',
          color: '#ffffff',
          borderRadius: '12px',
          border: '1.5px solid #ef5323',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '13px',
          fontWeight: 700
        }
      });
      navigate(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`);
      return false;
    }

    const addQty = product.quantity || 1;
    const currentTotal = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    if (currentTotal + addQty > MAX_CART_LIMIT) {
      toast.error(`⚠️ Cart Limit Reached! Maximum limit is ${MAX_CART_LIMIT} jars.`, {
        duration: 3500,
        style: {
          background: '#991b1b',
          color: '#ffffff',
          borderRadius: '12px',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '13px',
          fontWeight: 700
        }
      });
      setIsCartOpen(true);
      return false;
    }

    const weight = product.selectedWeight || '550gm';
    const price = product.finalPrice || (weight === '1kg' ? product.price1kg : product.price550) || 250;

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.id === product.id && item.selectedWeight === weight
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx] = {
          ...copy[existingIdx],
          quantity: copy[existingIdx].quantity + addQty
        };
        return copy;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            selectedWeight: weight,
            finalPrice: price,
            quantity: addQty,
            image: product.image || '/products/classy-crunch.png',
          }
        ];
      }
    });

    toast.success(`✓ Added to Cart! (${currentTotal + addQty}/${MAX_CART_LIMIT})`, {
      style: {
        background: '#15803d',
        color: '#ffffff',
        borderRadius: '12px',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '13px',
        fontWeight: 700
      }
    });

    setIsCartOpen(true);
    return true;
  };

  // ── Update Quantity ──
  const handleUpdateQuantity = (productId, selectedWeight, newQty) => {
    const currentItem = cartItems.find(
      (item) => item.id === productId && item.selectedWeight === selectedWeight
    );
    if (!currentItem) return;

    const diff = newQty - currentItem.quantity;
    const currentTotal = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    if (diff > 0 && currentTotal + diff > MAX_CART_LIMIT) {
      toast.error(`⚠️ Maximum limit of ${MAX_CART_LIMIT} jars reached!`, {
        style: {
          background: '#991b1b',
          color: '#ffffff',
          borderRadius: '12px',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '13px',
          fontWeight: 700
        }
      });
      return;
    }

    if (newQty <= 0) {
      handleRemoveItem(productId, selectedWeight);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && item.selectedWeight === selectedWeight
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // ── Remove Single Item ──
  const handleRemoveItem = (productId, selectedWeight) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.selectedWeight === selectedWeight)
      )
    );
  };

  // ── Clear All Cart Items ──
  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenQuickView = (product) => {
    setActiveModalProduct(product);
  };

  const handleCloseQuickView = () => {
    setActiveModalProduct(null);
  };

  return (
    <div className="app-container">
      
      {/* Toast Notification Provider */}
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenLogin={() => setIsAuthOpen(true)}
        onLogout={logout}
      />

      {/* Page Routes */}
      <main className="main-content-flow">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <HomePage
                onAddToCart={handleAddToCart}
                onQuickView={handleOpenQuickView}
                wishlistItems={wishlistItems}
                onToggleWishlist={handleToggleWishlist}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reviews" element={<AboutPage />} />
          <Route
            path="/products"
            element={
              <ProductsPage
                onAddToCart={handleAddToCart}
                onQuickView={handleOpenQuickView}
                wishlistItems={wishlistItems}
                onToggleWishlist={handleToggleWishlist}
              />
            }
          />
          <Route path="/benefits" element={<BenefitsPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* ── Strict Protected Routes (Requires Login) ── */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage
                  cartItems={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onClearCart={handleClearCart}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishlistPage
                  wishlistItems={wishlistItems}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={handleOpenQuickView}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage
                  cartItems={cartItems}
                  onClearCart={handleClearCart}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback to Home */}
          <Route
            path="*"
            element={
              <HomePage
                onAddToCart={handleAddToCart}
                onQuickView={handleOpenQuickView}
                wishlistItems={wishlistItems}
                onToggleWishlist={handleToggleWishlist}
              />
            }
          />
        </Routes>
      </main>

      {/* Brand Footer */}
      <Footer />

      {/* Slide-Over Right Side Cart Drawer */}
      <SideCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Slide-Over Right Side Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onClearWishlist={handleClearWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Quick View Modal */}
      {activeModalProduct && (
        <ProductModal
          product={activeModalProduct}
          onClose={handleCloseQuickView}
          onAddToCart={handleAddToCart}
          wishlistItems={wishlistItems}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Auth / Login Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(loggedInUser) => {
          setIsAuthOpen(false);
          toast.success(`Welcome, ${loggedInUser.name}!`);
        }}
      />

    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
