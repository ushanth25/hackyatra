import React, { useState, useEffect } from 'react';

export function CitizenHome({ onNavigate }) {
  const [autoDetect, setAutoDetect] = useState(false);

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', maxWidth: 440, margin: '0 auto', background: '#FFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ background: '#1F3A5F', color: '#FFF', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>GVMC Road Watch</div>
        <div style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: 4 }}>CITIZEN APP</div>
      </header>

      {/* Hero Banner */}
      <div style={{ background: '#F4F6F8', padding: '20px', borderBottom: '1px solid #E2E8F0', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 6px 0', color: '#1F3A5F' }}>Keep Visakhapatnam Roads Safe</h3>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B' }}>Automated shock detection & instant crowdsourced reporting</p>
      </div>

      {/* Actions */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: '#EFF6FF', border: '1px solid #3B82F6', borderRadius: 8, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong style={{ color: '#1F3A5F', display: 'block' }}>Auto-Detect (Drive Mode)</strong>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Continuously monitors Z-axis impact shocks</span>
          </div>
          <button 
            onClick={() => {
              setAutoDetect(!autoDetect);
              if (!autoDetect) onNavigate('auto_detect');
            }}
            style={{ background: autoDetect ? '#2E8B57' : '#E8842C', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: 20, fontWeight: 700, cursor: 'pointer' }}
          >
            {autoDetect ? 'Active 📡' : 'Enable ⚡'}
          </button>
        </div>

        <button 
          onClick={() => onNavigate('report')}
          style={{ background: '#E8842C', color: '#FFF', border: 'none', padding: '14px', borderRadius: 8, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          📸 Report Pothole Manually
        </button>

        <button 
          onClick={() => onNavigate('my_reports')}
          style={{ background: '#1F3A5F', color: '#FFF', border: 'none', padding: '12px', borderRadius: 8, fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}
        >
          📋 View My Submitted Reports
        </button>
      </div>

      {/* Footer Nav */}
      <nav style={{ background: '#1F3A5F', display: 'flex', justifyContent: 'space-around', padding: '12px 0' }}>
        <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', color: '#E8842C', fontWeight: 700, cursor: 'pointer' }}>🏠 Home</button>
        <button onClick={() => onNavigate('auto_detect')} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>📡 Telemetry</button>
        <button onClick={() => onNavigate('my_reports')} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>📋 Reports</button>
      </nav>
    </div>
  );
}
