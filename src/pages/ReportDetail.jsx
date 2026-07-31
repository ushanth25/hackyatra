import React from 'react';

export function ReportDetail({ onNavigate }) {
  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', maxWidth: 440, margin: '0 auto', background: '#FFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#1F3A5F', color: '#FFF', padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => onNavigate('my_reports')} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '1.2rem', cursor: 'pointer' }}>←</button>
        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Report #PTH-1042 Status</span>
      </header>

      <div style={{ padding: 20, flex: 1 }}>
        {/* Stepper Timeline */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: 16, marginBottom: 20 }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#1F3A5F' }}>Lifecycle Timeline</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700 }}>
            <div style={{ color: '#2E8B57' }}>✓ Detected</div>
            <div style={{ color: '#E8842C' }}>● Verified</div>
            <div style={{ color: '#94A3B8' }}>Assigned</div>
            <div style={{ color: '#94A3B8' }}>Repaired</div>
          </div>
        </div>

        {/* Details Card */}
        <div style={{ border: '1px solid #E2E8F0', borderRadius: 8, padding: 16 }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#1F3A5F' }}>Incident Metadata</h4>
          <p style={{ margin: '4px 0', fontSize: '0.85rem' }}><strong>Location:</strong> Beach Road, Ward 52 (Siripuram)</p>
          <p style={{ margin: '4px 0', fontSize: '0.85rem' }}><strong>GPS Pin:</strong> 17.7231° N, 83.3012° E</p>
          <p style={{ margin: '4px 0', fontSize: '0.85rem' }}><strong>Detection Type:</strong> Auto Accelerometer (Z-Shock)</p>
          <p style={{ margin: '4px 0', fontSize: '0.85rem' }}><strong>Peak Impact:</strong> 2.9g (High Severity)</p>
        </div>
      </div>

      <div style={{ padding: 16, borderTop: '1px solid #E2E8F0' }}>
        <button onClick={() => onNavigate('my_reports')} style={{ width: '100%', background: '#1F3A5F', color: '#FFF', border: 'none', padding: 12, borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
          Back to Reports List
        </button>
      </div>
    </div>
  );
}
