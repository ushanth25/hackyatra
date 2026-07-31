import React, { useState } from 'react';

export function AdminOfficers({ onNavigate, authorizedOfficers = [], onAddOfficer, onRevokeOfficer }) {
  const [officerName, setOfficerName] = useState('');
  const [officerEmail, setOfficerEmail] = useState('');
  const [ward, setWard] = useState('Ward 52 (Siripuram)');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleGrantAccess = (e) => {
    e.preventDefault();
    if (!officerName) {
      setErrorMessage('⚠️ Officer name is required.');
      return;
    }
    if (!officerEmail || !officerEmail.toLowerCase().endsWith('@gvmc.gov.in')) {
      setErrorMessage('⚠️ Field Officers must be granted access with an official @gvmc.gov.in email address.');
      return;
    }

    if (onAddOfficer) {
      onAddOfficer({
        id: Date.now(),
        name: officerName,
        email: officerEmail.toLowerCase(),
        ward: ward,
        status: 'Active',
        grantedDate: 'Just now'
      });
    }

    setErrorMessage('');
    setSuccessMessage(`✓ Access successfully granted to Field Officer ${officerName} (${officerEmail}). Login access activated.`);
    setOfficerName('');
    setOfficerEmail('');
  };

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', background: '#F4F6F8', minHeight: '100vh', padding: 24 }}>
      <div style={{ maxWidth: 1050, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h2 style={{ color: '#1F3A5F', margin: '0 0 4px 0' }}>Field Officer Access Provisioning — Admin HQ</h2>
            <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Grant and manage official login access for GVMC Ward Field Officers</div>
          </div>
          <button onClick={() => onNavigate('admin_overview')} style={{ background: '#1F3A5F', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer', fontWeight: 700 }}>Back to Admin HQ</button>
        </div>

        {/* Success Message Banner */}
        {successMessage && (
          <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', color: '#166534', padding: '12px 16px', borderRadius: 6, marginBottom: 20, fontSize: '0.85rem', fontWeight: 700 }}>
            {successMessage}
          </div>
        )}

        {/* Grant Access Form Box */}
        <div style={{ background: '#FFF', padding: 20, borderRadius: 8, border: '1px solid #E2E8F0', marginBottom: 24, boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h3 style={{ color: '#1F3A5F', margin: '0 0 14px 0', fontSize: '1.1rem' }}>🔑 Grant New Field Officer Access</h3>
          
          <form onSubmit={handleGrantAccess} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 12, alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1F3A5F', marginBottom: 4 }}>Officer Name</label>
              <input 
                type="text" 
                placeholder="e.g. Rajesh Kumar" 
                value={officerName} 
                onChange={(e) => { setOfficerName(e.target.value); setErrorMessage(''); }}
                style={{ width: '100%', padding: 9, borderRadius: 4, border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1F3A5F', marginBottom: 4 }}>Govt Email (@gvmc.gov.in)</label>
              <input 
                type="email" 
                placeholder="officer.ward52@gvmc.gov.in" 
                value={officerEmail} 
                onChange={(e) => { setOfficerEmail(e.target.value); setErrorMessage(''); }}
                style={{ width: '100%', padding: 9, borderRadius: 4, border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1F3A5F', marginBottom: 4 }}>Assigned Ward Jurisdiction</label>
              <select 
                value={ward} 
                onChange={(e) => setWard(e.target.value)}
                style={{ width: '100%', padding: 9, borderRadius: 4, border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
              >
                <option value="Ward 52 (Siripuram)">Ward 52 (Siripuram)</option>
                <option value="Ward 48 (MVP Colony)">Ward 48 (MVP Colony)</option>
                <option value="Ward 40 (Gajuwaka)">Ward 40 (Gajuwaka)</option>
                <option value="Ward 12 (Maddilapalem)">Ward 12 (Maddilapalem)</option>
              </select>
            </div>

            <button type="submit" style={{ background: '#E8842C', color: '#FFF', border: 'none', padding: '10px 18px', borderRadius: 4, fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
              + Grant Access
            </button>
          </form>

          {errorMessage && (
            <div style={{ color: '#DC2626', fontSize: '0.78rem', fontWeight: 700, marginTop: 10 }}>
              {errorMessage}
            </div>
          )}
        </div>

        {/* Provisioned Field Officers List */}
        <div style={{ background: '#FFF', padding: 20, borderRadius: 8, border: '1px solid #E2E8F0' }}>
          <h3 style={{ color: '#1F3A5F', margin: '0 0 16px 0', fontSize: '1.1rem' }}>Active Provisioned Field Officers</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: 12 }}>Officer Name</th>
                <th style={{ padding: 12 }}>Official Govt Email</th>
                <th style={{ padding: 12 }}>Assigned Jurisdiction</th>
                <th style={{ padding: 12 }}>Access Status</th>
                <th style={{ padding: 12 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {authorizedOfficers.map((off) => (
                <tr key={off.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: 12, fontWeight: 700, color: '#1F3A5F' }}>{off.name}</td>
                  <td style={{ padding: 12, color: '#1D4ED8', fontWeight: 600 }}>{off.email}</td>
                  <td style={{ padding: 12 }}>{off.ward}</td>
                  <td style={{ padding: 12 }}>
                    <span style={{ background: off.status === 'Active' ? '#DCFCE7' : '#FEE2E2', color: off.status === 'Active' ? '#166534' : '#991B1B', padding: '4px 8px', borderRadius: 4, fontWeight: 700, fontSize: '0.75rem' }}>
                      {off.status === 'Active' ? 'Active Access ✅' : 'Revoked ❌'}
                    </span>
                  </td>
                  <td style={{ padding: 12 }}>
                    {off.status === 'Active' ? (
                      <button 
                        onClick={() => onRevokeOfficer && onRevokeOfficer(off.id)}
                        style={{ background: '#C0392B', color: '#FFF', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}
                      >
                        Revoke Access
                      </button>
                    ) : (
                      <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Access Disabled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
