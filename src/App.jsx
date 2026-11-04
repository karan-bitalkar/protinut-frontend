import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { AuthProvider, useAuth } from './AuthContext';
import { CartProvider, useCart } from './CartContext';
import { OrderProvider, useOrders } from './OrderContext';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductModal from './ProductModal';
import SideCartDrawer from './SideCartDrawer';
import WishlistDrawer from './WishlistDrawer';
import AuthModal from './AuthModal';
import InvoiceModal from './InvoiceModal';
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
import OrderDetailPage from './pages/OrderDetailPage';
import AccountPage from './pages/AccountPage';
import AdminProtectedRoute from './AdminProtectedRoute';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const {
    cartItems,
    totalCartCount,
    addToCart: contextAddToCart,
    updateQuantity,
    removeItem,
    clearCart
  } = useCart();
  const { orders } = useOrders();

  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const hideHeaderFooter = isAdminRoute;

  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  // Automatically open the modal if route or query indicates auth
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const authParam = params.get('auth');
    if (authParam === 'login' || location.pathname === '/login') {
      setIsAuthOpen(true);
      setAuthModalMode('login');
    } else if (authParam === 'register' || location.pathname === '/register' || location.pathname === '/signup') {
      setIsAuthOpen(true);
      setAuthModalMode('register');
    }
  }, [location.pathname, location.search]);

  // Central Logout Handler: Clears session, stays on / redirects to '/', opens Login modal immediately
  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
    setAuthModalMode('login');
    setIsAuthOpen(true);
    toast.success('Logged out successfully', {
      duration: 3000,
      style: {
        background: '#15803d',
        color: '#ffffff',
        borderRadius: '12px',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '13px',
        fontWeight: 700
      }
    });
  };

  // Global Wishlist State (Starts strictly empty [] on initial login)
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('protinut_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist wishlist
  React.useEffect(() => {
    try {
      localStorage.setItem('protinut_wishlist', JSON.stringify(wishlistItems));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistItems]);

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

    const qty = product.quantity || 1;
    const weight = product.selectedWeight || '550gm';
    const success = contextAddToCart(product, qty, weight);
    if (success) {
      setIsCartOpen(true);
    }
    return success;
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

      {/* Navigation Bar — hidden on full-page auth and admin routes */}
      {!hideHeaderFooter && (
        <Navbar
          cartCount={totalCartCount}
          wishlistCount={wishlistItems.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenLogin={() => {
            setAuthModalMode('login');
            setIsAuthOpen(true);
          }}
          onLogout={handleLogout}
        />
      )}

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
          <Route
            path="/login"
            element={
              <LoginPage
                onLoginSuccess={(userObj) => {
                  toast.success(`Welcome, ${userObj?.name || 'back'}!`, {
                    style: { background: '#15803d', color: '#fff', borderRadius: '12px', fontFamily: "'Montserrat',sans-serif", fontSize: '13px', fontWeight: 700 }
                  });
                }}
              />
            }
          />
          <Route
            path="/register"
            element={
              <LoginPage
                initialMode="register"
                onLoginSuccess={(userObj) => {
                  toast.success(`Welcome, ${userObj?.name || 'back'}!`, {
                    style: { background: '#15803d', color: '#fff', borderRadius: '12px', fontFamily: "'Montserrat',sans-serif", fontSize: '13px', fontWeight: 700 }
                  });
                }}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <LoginPage
                initialMode="register"
                onLoginSuccess={(userObj) => {
                  toast.success(`Welcome, ${userObj?.name || 'back'}!`, {
                    style: { background: '#15803d', color: '#fff', borderRadius: '12px', fontFamily: "'Montserrat',sans-serif", fontSize: '13px', fontWeight: 700 }
                  });
                }}
              />
            }
          />

          {/* ── Strict Protected Routes (Requires Login) ── */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
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
                <CheckoutPage />
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
            path="/orders/:orderId"
            element={
              <ProtectedRoute>
                <OrderDetailPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage
                  wishlistCount={wishlistItems.length}
                  onClearWishlist={handleClearWishlist}
                  onLogout={handleLogout}
                />
              </ProtectedRoute>
            }
          />

          {/* ── Direct Tax Invoice Route ── */}
          <Route
            path="/invoice"
            element={
              <div className="min-h-screen bg-[#faf5ee]">
                {orders.length > 0 ? (
                  <InvoiceModal
                    isOpen={true}
                    onClose={() => navigate(-1 || '/orders')}
                    order={orders[0]}
                  />
                ) : (
                  <div className="max-w-md mx-auto pt-24 text-center p-6">
                    <span className="text-4xl block mb-3">🧾</span>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">No Active Order Found</h3>
                    <p className="text-gray-500 text-sm mb-5">
                      Invoices are dynamically generated when you place an order. Please place an order first!
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate('/products')}
                      className="bg-[#F58220] hover:bg-[#e06d0e] text-white font-bold text-sm px-6 py-2.5 rounded-lg shadow transition"
                    >
                      Browse Products
                    </button>
                  </div>
                )}
              </div>
            }
          />

          {/* ── Strict Admin Panel Routes (Spring Boot & JWT Ready) ── */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboardPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboardPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <AdminProtectedRoute>
                <AdminDashboardPage />
              </AdminProtectedRoute>
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

      {/* Brand Footer — hidden on full-page auth & admin routes */}
      {!hideHeaderFooter && <Footer />}

      {/* Slide-Over Right Side Cart Drawer */}
      {!hideHeaderFooter && (
        <SideCartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onClearCart={clearCart}
        />
      )}

      {/* Slide-Over Right Side Wishlist Drawer */}
      {!hideHeaderFooter && (
        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlistItems={wishlistItems}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onClearWishlist={handleClearWishlist}
          onAddToCart={handleAddToCart}
        />
      )}

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
        defaultMode={authModalMode}
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
      <CartProvider>
        <OrderProvider>
          <Router>
            <AppContent />
          </Router>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
