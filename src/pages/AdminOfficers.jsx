import React from 'react';

export function AdminOfficers({ onNavigate }) {
  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', background: '#F4F6F8', minHeight: '100vh', padding: 24 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ color: '#1F3A5F', margin: 0 }}>Provisioned Field Officers — Administration</h2>
          <button onClick={() => onNavigate('admin_overview')} style={{ background: '#1F3A5F', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}>Back to Admin HQ</button>
        </div>

        <div style={{ background: '#FFF', padding: 20, borderRadius: 6, border: '1px solid #E2E8F0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: 10 }}>Officer Name</th>
                <th style={{ padding: 10 }}>Govt Email</th>
                <th style={{ padding: 10 }}>Assigned Ward</th>
                <th style={{ padding: 10 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: 10 }}>R. Sharma</td>
                <td style={{ padding: 10 }}>officer.ward52@gvmc.gov.in</td>
                <td style={{ padding: 10 }}>Ward 52 (Siripuram)</td>
                <td style={{ padding: 10 }}><button onClick={() => alert('Sent activation token.')} style={{ background: '#E8842C', color: '#FFF', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}>Send Token</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
