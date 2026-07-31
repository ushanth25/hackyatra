import React, { useState } from 'react';

export function OfficerDashboard({ onNavigate, reports = [], notifications = [] }) {
  const [ward] = useState('Ward 52 (Siripuram)');
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', background: '#F4F6F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <header style={{ background: '#1F3A5F', color: '#FFF', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 28, height: 28, border: '1px solid #FFF', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: 700 }}>EMBLEM</div>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>GVMC Field Officer Dashboard</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Notification Bell Badge */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#FFF', padding: '6px 12px', borderRadius: 4, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              🔔 Admin Replies
              {notifications.length > 0 && (
                <span style={{ background: '#E8842C', color: '#FFF', borderRadius: '50%', padding: '2px 6px', fontSize: '0.7rem', fontWeight: 800 }}>
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown Drawer */}
            {showNotifications && (
              <div style={{ position: 'absolute', top: 38, right: 0, width: 340, background: '#FFF', color: '#1F3A5F', borderRadius: 8, boxShadow: '0 10px 25px rgba(0,0,0,0.2)', border: '1px solid #CBD5E1', zIndex: 100, overflow: 'hidden' }}>
                <div style={{ background: '#152A47', color: '#FFF', padding: '10px 14px', fontWeight: 700, fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Admin HQ Notifications & Replies</span>
                  <span onClick={() => setShowNotifications(false)} style={{ cursor: 'pointer' }}>✕</span>
                </div>
                <div style={{ maxHeight: 280, overflowY: 'auto', padding: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {notifications.length === 0 ? (
                    <div style={{ fontSize: '0.8rem', color: '#64748B', padding: 12, textAlign: 'center' }}>No notification replies from Admin HQ yet.</div>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif.id} style={{ background: notif.type === 'APPROVED' ? '#F0FDF4' : '#FEF2F2', borderLeft: `4px solid ${notif.type === 'APPROVED' ? '#166534' : '#DC2626'}`, padding: 10, borderRadius: 4 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.8rem', color: notif.type === 'APPROVED' ? '#166534' : '#991B1B' }}>{notif.title}</div>
                        <div style={{ fontSize: '0.78rem', color: '#334155', marginTop: 4 }}>{notif.message}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: 4 }}>{notif.time}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: 4, fontSize: '0.85rem' }}>
            🔒 Jurisdiction: <strong>{ward}</strong>
          </div>
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
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1F3A5F' }}>{42 + reports.length}</div>
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
                <th style={{ padding: 10 }}>Admin HQ Review Reply</th>
                <th style={{ padding: 10 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: 10, fontWeight: 700 }}>{r.id}</td>
                  <td style={{ padding: 10 }}>{r.location}</td>
                  <td style={{ padding: 10, color: '#C0392B', fontWeight: 700 }}>{r.gForce}</td>
                  <td style={{ padding: 10 }}>
                    {r.adminReview ? (
                      <span style={{ 
                        background: r.adminReview.status === 'APPROVED' ? '#DCFCE7' : '#FEE2E2', 
                        color: r.adminReview.status === 'APPROVED' ? '#166534' : '#991B1B', 
                        padding: '4px 8px', 
                        borderRadius: 4, 
                        fontWeight: 700, 
                        fontSize: '0.75rem' 
                      }}>
                        {r.adminReview.text}
                      </span>
                    ) : (
                      <span style={{ color: '#64748B', fontSize: '0.75rem' }}>No reply yet</span>
                    )}
                  </td>
                  <td style={{ padding: 10 }}>
                    <button onClick={() => onNavigate('pothole_detail', r.id)} style={{ background: '#1F3A5F', color: '#FFF', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}>
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
