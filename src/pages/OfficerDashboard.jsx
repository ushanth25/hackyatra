import React, { useState } from 'react';

export function OfficerDashboard({ onNavigate }) {
  const [ward] = useState('Ward 52 (Siripuram)');

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', background: '#F4F6F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <header style={{ background: '#1F3A5F', color: '#FFF', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 28, height: 28, border: '1px solid #FFF', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: 700 }}>EMBLEM</div>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>GVMC Field Officer Dashboard</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: 4, fontSize: '0.85rem' }}>
          🔒 Jurisdiction: <strong>{ward}</strong>
        </div>
      </header>

      {/* Sub Nav */}
      <nav style={{ background: '#152A47', padding: '8px 24px', display: 'flex', gap: 16 }}>
        <button style={{ background: 'none', border: 'none', color: '#E8842C', fontWeight: 700, cursor: 'pointer' }}>📊 Overview</button>
        <button onClick={() => onNavigate('gis_map')} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>🗺️ GIS Map</button>
        <button onClick={() => onNavigate('reports_list')} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>📋 Incident Table</button>
        <button onClick={() => onNavigate('admin_overview')} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>🏛️ Admin HQ View</button>
      </nav>

      {/* Content */}
      <main style={{ padding: 24, flex: 1, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <h2 style={{ color: '#1F3A5F', margin: '0 0 20px 0' }}>Ward 52 Road Quality Summary</h2>

        {/* KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#FFF', padding: 16, borderRadius: 6, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Total Reported</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1F3A5F' }}>42</div>
            <div style={{ fontSize: '0.75rem', color: '#C0392B' }}>▲ +5 today</div>
          </div>
          <div style={{ background: '#FFF', padding: 16, borderRadius: 6, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Pending Verification</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#C0392B' }}>18</div>
            <div style={{ fontSize: '0.75rem', color: '#C0392B' }}>Requires Inspection</div>
          </div>
          <div style={{ background: '#FFF', padding: 16, borderRadius: 6, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Work Assigned</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#E8842C' }}>12</div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Contractor In-Progress</div>
          </div>
          <div style={{ background: '#FFF', padding: 16, borderRadius: 6, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Repaired & Closed</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2E8B57' }}>12</div>
            <div style={{ fontSize: '0.75rem', color: '#2E8B57' }}>SLA Target Met</div>
          </div>
        </div>

        {/* Action Table */}
        <div style={{ background: '#FFF', borderRadius: 6, border: '1px solid #E2E8F0', padding: 20 }}>
          <h3 style={{ color: '#1F3A5F', margin: '0 0 16px 0' }}>Recent Incident Telemetry Queue</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: 10 }}>ID</th>
                <th style={{ padding: 10 }}>Location</th>
                <th style={{ padding: 10 }}>Peak g-Force</th>
                <th style={{ padding: 10 }}>Status</th>
                <th style={{ padding: 10 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: 10 }}>#PTH-1042</td>
                <td style={{ padding: 10 }}>Beach Road, Nr Kali Temple</td>
                <td style={{ padding: 10, color: '#C0392B', fontWeight: 700 }}>2.9g (High)</td>
                <td style={{ padding: 10 }}><span style={{ background: '#FEE2E2', color: '#C0392B', padding: '4px 8px', borderRadius: 4, fontWeight: 700, fontSize: '0.75rem' }}>DETECTED</span></td>
                <td style={{ padding: 10 }}><button onClick={() => onNavigate('pothole_detail')} style={{ background: '#1F3A5F', color: '#FFF', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}>Inspect</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
