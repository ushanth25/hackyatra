import React, { useState } from 'react';

export function ReportPothole({ onNavigate }) {
  const [severity, setSeverity] = useState('high');

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', maxWidth: 440, margin: '0 auto', background: '#FFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#1F3A5F', color: '#FFF', padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '1.2rem', cursor: 'pointer' }}>←</button>
        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Report a Pothole</span>
      </header>

      <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Photo Upload Zone */}
        <div style={{ height: 160, background: '#F8FAFC', border: '2px dashed #CBD5E1', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748B', cursor: 'pointer' }}>
          <span style={{ fontSize: '2.5rem' }}>📸</span>
          <span style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: 6 }}>Tap to Capture or Attach Photo</span>
        </div>

        {/* Location Box */}
        <div style={{ background: '#F4F6F8', padding: 12, borderRadius: 8, fontSize: '0.85rem' }}>
          <strong style={{ color: '#1F3A5F', display: 'block' }}>GPS Coordinates Locked</strong>
          <span style={{ color: '#64748B' }}>17.7231° N, 83.3012° E • Beach Road Ward 52</span>
        </div>

        {/* Severity Selector */}
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1F3A5F', display: 'block', marginBottom: 8 }}>Severity Level</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {['low', 'medium', 'high'].map(sev => (
              <button 
                key={sev}
                onClick={() => setSeverity(sev)}
                style={{ 
                  padding: '10px', 
                  borderRadius: 6, 
                  border: '1px solid #CBD5E1', 
                  fontWeight: 700, 
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  background: severity === sev ? (sev === 'high' ? '#C0392B' : sev === 'medium' ? '#E8842C' : '#2E8B57') : '#FFF',
                  color: severity === sev ? '#FFF' : '#1A2530',
                  cursor: 'pointer'
                }}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1F3A5F', display: 'block', marginBottom: 6 }}>Description / Notes</label>
          <textarea placeholder="e.g. Deep crater near Kali Temple intersection..." style={{ width: '100%', height: 80, padding: 10, borderRadius: 6, border: '1px solid #CBD5E1', fontFamily: 'inherit' }} />
        </div>
      </div>

      <div style={{ padding: 16, borderTop: '1px solid #E2E8F0' }}>
        <button onClick={() => { alert('Pothole report submitted successfully!'); onNavigate('my_reports'); }} style={{ width: '100%', background: '#E8842C', color: '#FFF', border: 'none', padding: 14, borderRadius: 8, fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
          Submit Report to GVMC
        </button>
      </div>
    </div>
  );
}
