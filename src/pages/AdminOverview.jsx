import React, { useState } from 'react';

export function AdminOverview({ onNavigate }) {
  const [selectedWard, setSelectedWard] = useState('All Wards (City-Wide)');

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', background: '#F4F6F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <header style={{ background: '#1F3A5F', color: '#FFF', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 28, height: 28, border: '1px solid #FFF', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: 700 }}>EMBLEM</div>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>GVMC Commissioner City-Wide Analytics</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '0.85rem' }}>🔓 Ward Filter:</span>
          <select 
            value={selectedWard} 
            onChange={(e) => setSelectedWard(e.target.value)}
            style={{ background: '#EFF6FF', border: '1px solid #3B82F6', padding: '6px 12px', borderRadius: 4, fontWeight: 700, color: '#1F3A5F' }}
          >
            <option>All Wards (City-Wide)</option>
            <option>Ward 52 (Siripuram)</option>
            <option>Ward 40 (Gajuwaka)</option>
            <option>Ward 12 (Maddilapalem)</option>
          </select>
        </div>
      </header>

      {/* Sub Nav */}
      <nav style={{ background: '#152A47', padding: '8px 24px', display: 'flex', gap: 16 }}>
        <button onClick={() => onNavigate('officer')} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>📊 Officer View</button>
        <button onClick={() => onNavigate('admin_overview')} style={{ background: 'none', border: 'none', color: '#E8842C', fontWeight: 700, cursor: 'pointer' }}>🏛️ City Overview</button>
        <button onClick={() => onNavigate('admin_officers')} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>👥 Officer Mgmt</button>
        <button onClick={() => onNavigate('admin_settings')} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>⚙️ System Settings</button>
      </nav>

      {/* Content */}
      <main style={{ padding: 24, flex: 1, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <h2 style={{ color: '#1F3A5F', margin: '0 0 20px 0' }}>Visakhapatnam Roads & Buildings Command Center</h2>

        {/* City Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#FFF', padding: 16, borderRadius: 6, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Total Potholes Detected</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1F3A5F' }}>1,428</div>
          </div>
          <div style={{ background: '#FFF', padding: 16, borderRadius: 6, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Active City Backlog</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#E8842C' }}>384</div>
          </div>
          <div style={{ background: '#FFF', padding: 16, borderRadius: 6, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Resolved & Patched</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2E8B57' }}>1,044</div>
          </div>
          <div style={{ background: '#FFF', padding: 16, borderRadius: 6, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>City SLA Compliance</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2E8B57' }}>91.4%</div>
          </div>
        </div>

        {/* Top Backlog Table */}
        <div style={{ background: '#FFF', borderRadius: 6, border: '1px solid #E2E8F0', padding: 20 }}>
          <h3 style={{ color: '#1F3A5F', margin: '0 0 16px 0' }}>Top Backlog Wards Ranking</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: 10 }}>Ward Name</th>
                <th style={{ padding: 10 }}>Pending Count</th>
                <th style={{ padding: 10 }}>Avg SLA Days</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: 10 }}>Ward 52 (Siripuram)</td>
                <td style={{ padding: 10, color: '#C0392B', fontWeight: 700 }}>48</td>
                <td style={{ padding: 10 }}>3.8 Days</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: 10 }}>Ward 40 (Gajuwaka)</td>
                <td style={{ padding: 10, color: '#C0392B', fontWeight: 700 }}>42</td>
                <td style={{ padding: 10 }}>5.1 Days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
