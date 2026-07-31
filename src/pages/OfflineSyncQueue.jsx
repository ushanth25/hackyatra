import React, { useState } from 'react';

export function OfflineSyncQueue({ onNavigate }) {
  const [isSynced, setIsSynced] = useState(false);

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', maxWidth: 440, margin: '0 auto', background: '#FFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#1F3A5F', color: '#FFF', padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => onNavigate('profile')} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '1.2rem', cursor: 'pointer' }}>←</button>
        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Offline Pending Queue</span>
      </header>

      <div style={{ padding: 16, flex: 1 }}>
        {!isSynced ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: '#FEF3C7', padding: 12, borderRadius: 6, fontSize: '0.85rem', color: '#92400E' }}>
              ⚠️ 3 Reports buffered locally while offline. Click below to sync to GVMC Firestore.
            </div>

            <div style={{ border: '1px solid #E2E8F0', borderRadius: 8, padding: 12 }}>
              <strong style={{ color: '#1F3A5F', display: 'block' }}>Auto-Detect Shock #104</strong>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>17.7231° N, 83.3012° E • High Severity (2.8g)</span>
            </div>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: 8, padding: 12 }}>
              <strong style={{ color: '#1F3A5F', display: 'block' }}>Auto-Detect Shock #105</strong>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>17.7245° N, 83.3034° E • Medium Severity (1.9g)</span>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 40, color: '#2E8B57' }}>
            <span style={{ fontSize: '3rem' }}>✅</span>
            <h3>All Items Synced!</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Reports pushed to GVMC Cloud Firestore backend.</p>
          </div>
        )}
      </div>

      <div style={{ padding: 16, borderTop: '1px solid #E2E8F0' }}>
        <button onClick={() => setIsSynced(true)} style={{ width: '100%', background: '#E8842C', color: '#FFF', border: 'none', padding: 14, borderRadius: 8, fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
          🔄 Sync Pending Items Now
        </button>
      </div>
    </div>
  );
}
