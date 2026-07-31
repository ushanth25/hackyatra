import React, { useState } from 'react';

export function PotholeDetail({ onNavigate }) {
  const [status, setStatus] = useState('Detected');

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', background: '#F4F6F8', minHeight: '100vh', padding: 24 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ color: '#1F3A5F', margin: 0 }}>Incident #PTH-1042 — Detailed Inspection</h2>
          <button onClick={() => onNavigate('reports_list')} style={{ background: '#1F3A5F', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}>Back to Table</button>
        </div>

        <div style={{ background: '#FFF', padding: 20, borderRadius: 6, border: '1px solid #E2E8F0', marginBottom: 20 }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#1F3A5F' }}>Workflow Lifecycle Status: <span style={{ color: '#E8842C' }}>{status}</span></h4>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setStatus('Verified')} style={{ background: '#1F3A5F', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}>Mark Verified</button>
            <button onClick={() => setStatus('Assigned')} style={{ background: '#E8842C', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}>Assign Contractor</button>
            <button onClick={() => setStatus('Repaired')} style={{ background: '#2E8B57', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}>Mark Repaired</button>
          </div>
        </div>

        <div style={{ background: '#FFF', padding: 20, borderRadius: 6, border: '1px solid #E2E8F0' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#1F3A5F' }}>Incident Metadata</h4>
          <p style={{ margin: '4px 0' }}><strong>Location:</strong> Beach Road, Nr Kali Temple, Ward 52</p>
          <p style={{ margin: '4px 0' }}><strong>GPS Coordinates:</strong> 17.7231° N, 83.3012° E</p>
          <p style={{ margin: '4px 0' }}><strong>Peak Impact:</strong> 2.9g (High Severity Shock)</p>
        </div>
      </div>
    </div>
  );
}
