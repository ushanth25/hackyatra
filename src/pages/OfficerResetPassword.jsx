import React, { useState } from 'react';

export function OfficerResetPassword({ onNavigate }) {
  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', maxWidth: 440, margin: '60px auto', background: '#FFF', borderRadius: 8, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
      <div style={{ background: '#1F3A5F', color: '#FFF', padding: 24, textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 6px 0' }}>GVMC Roads & Buildings</h3>
        <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.8 }}>Officer Account Activation</p>
      </div>

      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Official Email</label>
          <input defaultValue="officer.ward52@gvmc.gov.in" style={{ width: '100%', padding: 10, borderRadius: 4, border: '1px solid #CBD5E1' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Activation Token</label>
          <input defaultValue="GVMC-ACT-88291" style={{ width: '100%', padding: 10, borderRadius: 4, border: '1px solid #CBD5E1' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>New Password</label>
          <input type="password" placeholder="••••••••" style={{ width: '100%', padding: 10, borderRadius: 4, border: '1px solid #CBD5E1' }} />
        </div>

        <button onClick={() => { alert('Password activated!'); onNavigate('officer'); }} style={{ background: '#1F3A5F', color: '#FFF', border: 'none', padding: 12, borderRadius: 4, fontWeight: 700, cursor: 'pointer' }}>
          Activate & Set Password
        </button>
      </div>
    </div>
  );
}
