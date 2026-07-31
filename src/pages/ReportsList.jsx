import React from 'react';

export function ReportsList({ onNavigate, reports = [] }) {
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
                <th style={{ padding: 12 }}>Confirmations / Hits</th>
                <th style={{ padding: 12 }}>Detection Source & Type</th>
                <th style={{ padding: 12 }}>Peak g-Force</th>
                <th style={{ padding: 12 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => {
                const isAuto = report.source.includes('ACCELEROMETER') || report.source.includes('Auto-Detect');
                return (
                  <tr key={report.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: 12, fontWeight: 700, color: '#1F3A5F' }}>{report.id}</td>
                    <td style={{ padding: 12 }}>{report.location}</td>
                    <td style={{ padding: 12 }}>
                      <span style={{ background: '#EFF6FF', color: '#1D4ED8', padding: '4px 10px', borderRadius: 12, fontWeight: 800, fontSize: '0.75rem' }}>
                        🔥 {report.hitCount || 1} Shocks Logged
                      </span>
                    </td>
                    <td style={{ padding: 12 }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        background: isAuto ? '#FFF7ED' : '#EFF6FF',
                        color: isAuto ? '#C2410C' : '#1D4ED8',
                        border: `1px solid ${isAuto ? '#FFEDD5' : '#DBEAFE'}`,
                        padding: '4px 10px',
                        borderRadius: 6,
                        fontWeight: 700,
                        fontSize: '0.78rem'
                      }}>
                        {isAuto ? '📡 ACCELEROMETER TELEMETRY (Z-SHOCK)' : '📸 Citizen Manual Photo Upload'}
                      </span>
                    </td>
                    <td style={{ padding: 12, color: report.severity === 'high' ? '#C0392B' : '#E8842C', fontWeight: 700 }}>
                      {report.gForce}
                    </td>
                    <td style={{ padding: 12 }}>
                      <button 
                        onClick={() => onNavigate('pothole_detail', report.id)} 
                        style={{ background: '#1F3A5F', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
