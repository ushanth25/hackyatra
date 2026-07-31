import React, { useState } from 'react';

export function AdminSettings({ onNavigate }) {
  const [threshold, setThreshold] = useState(2.2);

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', background: '#F4F6F8', minHeight: '100vh', padding: 24 }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ color: '#1F3A5F', margin: 0 }}>System Thresholds & SLA Rules</h2>
          <button onClick={() => onNavigate('admin_overview')} style={{ background: '#1F3A5F', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}>Back to Admin HQ</button>
        </div>

        <div style={{ background: '#FFF', padding: 24, borderRadius: 6, border: '1px solid #E2E8F0', marginBottom: 20 }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#1F3A5F' }}>Accelerometer Z-Axis Threshold Calibration</h4>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>Peak Acceleration Limit ({threshold}g)</label>
            <input type="range" min="1.5" max="3.5" step="0.1" value={threshold} onChange={(e) => setThreshold(parseFloat(e.target.value))} style={{ width: '100%' }} />
          </div>
          <button onClick={() => alert('Updated system configuration!')} style={{ background: '#E8842C', color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: 4, fontWeight: 700, cursor: 'pointer' }}>Save Settings</button>
        </div>
      </div>
    </div>
  );
}
