import React from 'react';

export function ReportsList({ onNavigate }) {
  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', background: '#F4F6F8', minHeight: '100vh', padding: 24 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ color: '#1F3A5F', margin: 0 }}>Incident Directory — Ward 52</h2>
          <button onClick={() => onNavigate('officer')} style={{ background: '#1F3A5F', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}>Back to Dashboard</button>
        </div>

        <div style={{ background: '#FFF', borderRadius: 6, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: 12 }}>ID</th>
                <th style={{ padding: 12 }}>Location</th>
                <th style={{ padding: 12 }}>Detection Source</th>
                <th style={{ padding: 12 }}>Peak g-Force</th>
                <th style={{ padding: 12 }}>Status</th>
                <th style={{ padding: 12 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: 12 }}>#PTH-1042</td>
                <td style={{ padding: 12 }}>Beach Road, Nr Kali Temple</td>
                <td style={{ padding: 12 }}>Auto-Detect (Z-Shock)</td>
                <td style={{ padding: 12, color: '#C0392B', fontWeight: 700 }}>2.9g (High)</td>
                <td style={{ padding: 12 }}><span style={{ background: '#FEE2E2', color: '#C0392B', padding: '4px 8px', borderRadius: 4, fontWeight: 700, fontSize: '0.75rem' }}>DETECTED</span></td>
                <td style={{ padding: 12 }}><button onClick={() => onNavigate('pothole_detail')} style={{ background: '#1F3A5F', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}>Inspect</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
