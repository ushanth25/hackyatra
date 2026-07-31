import React from 'react';

export function CitizenProfile({ onNavigate }) {
  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', maxWidth: 440, margin: '0 auto', background: '#FFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#1F3A5F', color: '#FFF', padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button 
            onClick={() => onNavigate('home')} 
            style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
            title="Go to Home"
          >
            ←
          </button>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Citizen Profile</span>
        </div>
        <button onClick={() => onNavigate('home')} style={{ background: 'none', border: '1px solid #FFF', color: '#FFF', padding: '4px 10px', borderRadius: 4, cursor: 'pointer', fontSize: '0.8rem' }}>Logout</button>
      </header>

      <div style={{ padding: 20, flex: 1 }}>
        <div style={{ border: '1px solid #E2E8F0', borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#1F3A5F', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>👤</div>
            <div>
              <strong style={{ color: '#1F3A5F', display: 'block' }}>Visakhapatnam Resident</strong>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>citizen.vizag@gvmc.gov.in</span>
            </div>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748B', borderTop: '1px solid #F1F5F9', paddingTop: 10 }}>
            <div>Account ID: <strong>UID-991204</strong></div>
            <div>Registered: August 2026</div>
          </div>
        </div>

        {/* Offline Queue Navigation Button */}
        <div onClick={() => onNavigate('offline_queue')} style={{ background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 8, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
          <div>
            <strong style={{ color: '#92400E', display: 'block' }}>Offline Sync Queue</strong>
            <span style={{ fontSize: '0.75rem', color: '#B45309' }}>3 reports queued locally</span>
          </div>
          <span style={{ fontWeight: 700, color: '#92400E' }}>View →</span>
        </div>
      </div>
    </div>
  );
}
