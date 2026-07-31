import React, { useState } from 'react';

export function AdminLogin({ onNavigate }) {
  const [email, setEmail] = useState('admin@gvmc.gov.in');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('admin_overview');
  };

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', background: '#F8FAFC', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#FFF', border: '1px solid #CBD5E1', borderRadius: 8, width: 440, maxWidth: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ background: '#0F172A', color: '#FFF', padding: 28, textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, border: '2px solid #E8842C', borderRadius: 6, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, color: '#E8842C' }}>EMBLEM</div>
          <h2 style={{ margin: '0 0 6px 0', fontSize: '1.5rem' }}>GVMC Commissioner HQ</h2>
          <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Executive Governance & City Command Portal</div>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: 28 }}>
          <div style={{ background: '#FEF3C7', border: '1px solid #FCD34D', color: '#92400E', padding: 8, borderRadius: 4, fontSize: '0.75rem', fontWeight: 700, marginBottom: 20, textAlign: 'center' }}>
            🔒 RESTRICTED ACCESS — COMMISSIONER & ADMIN ONLY
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: '#334155' }}>Administrator Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: 12, border: '1px solid #CBD5E1', borderRadius: 4, fontSize: '0.95rem' }} />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: '#334155' }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: 12, border: '1px solid #CBD5E1', borderRadius: 4, fontSize: '0.95rem' }} />
          </div>

          <button type="submit" style={{ width: '100%', background: '#0F172A', color: '#FFF', border: 'none', padding: 14, borderRadius: 4, fontSize: '1rem', fontWeight: 700, cursor: 'pointer' }}>
            Sign In to Admin HQ
          </button>
        </form>
      </div>
    </div>
  );
}
