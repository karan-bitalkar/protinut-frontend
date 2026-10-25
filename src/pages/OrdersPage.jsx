import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Pages.css';

const OrdersPage = () => {
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const dummyOrders = [
    {
      id: 'PRT-942817',
      date: '18 Oct 2026',
      total: 520,
      status: 'Dispatched from Dharashiv',
      statusClass: 'status-dispatched',
      estimatedDelivery: '21 Oct 2026',
      items: [
        {
          name: 'Peanut Butter Classy Crunch',
          weight: '550gm',
          qty: 1,
          price: 250,
          image: '/products/classy-crunch.png'
        },
        {
          name: 'Peanut Butter Choco Crunch',
          weight: '550gm',
          qty: 1,
          price: 270,
          image: '/products/choco-crunch.png'
        }
      ]
    }
  ];

  return (
    <div className="orders-page" style={{ minHeight: '80vh', background: '#faf5ee', paddingBottom: '80px' }}>
      
      {/* ── Page Header ── */}
      <div className="wishlist-hero-strip" style={{ background: '#fffcf8', borderBottom: '1px solid #ebdcd0', padding: '45px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#8c7a6e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Link to="/" style={{ color: '#ef5323', textDecoration: 'none' }}>Home</Link> / <span>My Orders</span>
          </span>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '32px', fontWeight: 900, color: '#2b1810', margin: '8px 0' }}>
            My Orders 📦
          </h1>
          <p style={{ color: '#6a5a50', fontSize: '15px', margin: 0 }}>
            Track and view past orders placed by <strong>{user?.name}</strong>.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '40px auto 0', padding: '0 24px' }}>
        {dummyOrders.map((order) => (
          <div key={order.id} style={{ background: '#ffffff', borderRadius: '24px', border: '1.5px solid #ebdcd0', padding: '28px', marginBottom: '24px', boxShadow: '0 8px 24px rgba(43,24,16,0.05)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ebdcd0', paddingBottom: '18px', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#8c7a6e', fontWeight: 700, textTransform: 'uppercase' }}>Order ID:</span>
                <strong style={{ fontSize: '16px', color: '#2b1810', marginLeft: '6px' }}>#{order.id}</strong>
                <span style={{ margin: '0 10px', color: '#d4c5b9' }}>•</span>
                <span style={{ fontSize: '13px', color: '#6a5a50' }}>Placed on {order.date}</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#e6f7ec', border: '1px solid #bbf7d0', color: '#15803d', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 800 }}>
                <span>⚡ {order.status}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {order.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '14px', background: '#faf3e8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px' }}>
                    <img src={item.image} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: 800, color: '#2b1810', margin: '0 0 4px' }}>{item.name}</h4>
                    <span style={{ fontSize: '13px', color: '#796659' }}>Size: {item.weight} • Qty: {item.qty}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: 900, color: '#2b1810' }}>₹{item.price * item.qty}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ebdcd0', paddingTop: '18px', marginTop: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <span style={{ fontSize: '13px', color: '#15803d', fontWeight: 700 }}>
                🚚 Estimated Delivery: <strong>{order.estimatedDelivery}</strong>
              </span>
              <div>
                <span style={{ fontSize: '14px', color: '#6a5a50', marginRight: '8px' }}>Total Paid:</span>
                <strong style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '20px', fontWeight: 900, color: '#ef5323' }}>₹{order.total}</strong>
              </div>
            </div>

          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link to="/products" style={{ display: 'inline-block', background: '#ef5323', color: '#ffffff', padding: '14px 34px', borderRadius: '999px', fontFamily: "'Montserrat', sans-serif", fontSize: '14px', fontWeight: 800, textDecoration: 'none', boxShadow: '0 6px 20px rgba(239,83,35,0.35)' }}>
            Continue Shopping →
          </Link>
        </div>

      </div>

    </div>
  );
};

export default OrdersPage;
