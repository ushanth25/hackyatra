import React, { useState } from 'react';

export function MyReports({ onNavigate }) {
  const [filter, setFilter] = useState('all');

  const reports = [
    { id: '#PTH-1042', road: 'Beach Road, Ward 52', status: 'Detected', severity: 'High', date: 'Today, 11:20 AM' },
    { id: '#PTH-1041', road: 'Siripuram Circle', status: 'Assigned', severity: 'Medium', date: 'Today, 09:15 AM' },
    { id: '#PTH-1035', road: 'Waltair Main Road', status: 'Repaired', severity: 'Low', date: 'Yesterday' }
  ];

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', maxWidth: 440, margin: '0 auto', background: '#FFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#1F3A5F', color: '#FFF', padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '1.2rem', cursor: 'pointer' }}>←</button>
        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>My Reported Potholes</span>
      </header>

      <div style={{ padding: 16, flex: 1 }}>
        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {['all', 'detected', 'assigned', 'repaired'].map(chip => (
            <button 
              key={chip}
              onClick={() => setFilter(chip)}
              style={{ padding: '6px 12px', borderRadius: 20, border: '1px solid #CBD5E1', fontSize: '0.75rem', fontWeight: 600, textTransform: 'capitalize', background: filter === chip ? '#1F3A5F' : '#F4F6F8', color: filter === chip ? '#FFF' : '#1A2530', cursor: 'pointer' }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {reports.map(r => (
            <div key={r.id} onClick={() => onNavigate('report_detail')} style={{ border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, background: '#FFF', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <strong style={{ color: '#1F3A5F' }}>{r.id}</strong>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: r.status === 'Detected' ? '#FEE2E2' : r.status === 'Assigned' ? '#FEF3C7' : '#DCFCE7', color: r.status === 'Detected' ? '#C0392B' : r.status === 'Assigned' ? '#B45309' : '#2E8B57' }}>{r.status}</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748B' }}>{r.road}</div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: 4 }}>Submitted: {r.date}</div>
            </div>
          ))}
        </div>
      </div>

      <nav style={{ background: '#1F3A5F', display: 'flex', justifyContent: 'space-around', padding: '12px 0' }}>
        <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>🏠 Home</button>
        <button onClick={() => onNavigate('auto_detect')} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>📡 Telemetry</button>
        <button onClick={() => onNavigate('my_reports')} style={{ background: 'none', border: 'none', color: '#E8842C', fontWeight: 700, cursor: 'pointer' }}>📋 Reports</button>
      </nav>
    </div>
  );
}
