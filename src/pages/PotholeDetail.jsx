import React, { useState } from 'react';

export function PotholeDetail({ onNavigate, incidentId, reports = [], onUpdateStatus }) {
  const currentIncident = reports.find((r) => r.id === incidentId) || reports[0] || {
    id: '#PTH-1042',
    location: 'Beach Road, Nr Kali Temple',
    coords: '17.7231° N, 83.3012° E',
    gForce: '2.9g (High Severity Shock)',
    status: 'DETECTED',
    statusMark: 'Detected ⚠️',
    verificationPhoto: null
  };

  const [verificationPhoto, setVerificationPhoto] = useState(currentIncident.verificationPhoto || null);
  const [activeAction, setActiveAction] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleActionClick = (actionName) => {
    setActiveAction(actionName);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleVerificationPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVerificationPhoto(reader.result);
        setErrorMessage(''); // Clear error on photo select
      };
      reader.readAsDataURL(file);
    }
  };

  const submitStatusChange = (newStatus, statusMark) => {
    if (!verificationPhoto) {
      setErrorMessage('⚠️ Verification photo is required before submitting status update.');
      return;
    }

    if (onUpdateStatus) {
      onUpdateStatus(currentIncident.id, newStatus, statusMark, verificationPhoto);
    }

    setErrorMessage('');
    setSuccessMessage(`✓ Status for ${currentIncident.id} successfully updated to "${statusMark}" with verification photo attached!`);
    setActiveAction(null);
  };

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', background: '#F4F6F8', minHeight: '100vh', padding: 24 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ color: '#1F3A5F', margin: 0 }}>Incident {currentIncident.id} — Detailed Inspection</h2>
          <button onClick={() => onNavigate('officer')} style={{ background: '#1F3A5F', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}>Back to Dashboard</button>
        </div>

        {/* Success Inline Message */}
        {successMessage && (
          <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', color: '#166534', padding: '12px 16px', borderRadius: 6, marginBottom: 20, fontSize: '0.85rem', fontWeight: 700 }}>
            {successMessage}
          </div>
        )}

        {/* Workflow Action Panel */}
        <div style={{ background: '#FFF', padding: 20, borderRadius: 6, border: '1px solid #E2E8F0', marginBottom: 20 }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#1F3A5F' }}>
            Workflow Lifecycle Status: <span style={{ color: '#E8842C' }}>{currentIncident.statusMark || currentIncident.status}</span>
          </h4>
          
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            <button 
              onClick={() => handleActionClick('Mark Verified')} 
              style={{ background: activeAction === 'Mark Verified' ? '#1D4ED8' : '#1F3A5F', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer', fontWeight: 700 }}
            >
              Mark Verified
            </button>
            <button 
              onClick={() => handleActionClick('Assign Contractor')} 
              style={{ background: activeAction === 'Assign Contractor' ? '#C2410C' : '#E8842C', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer', fontWeight: 700 }}
            >
              Assign Contractor
            </button>
            <button 
              onClick={() => handleActionClick('Mark Repaired')} 
              style={{ background: activeAction === 'Mark Repaired' ? '#15803D' : '#2E8B57', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer', fontWeight: 700 }}
            >
              Mark Repaired
            </button>
          </div>

          {/* Verification Photo Upload Requirement Box */}
          {activeAction && (
            <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', padding: 16, borderRadius: 6, marginTop: 10 }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#1F3A5F' }}>📷 Verification Required for: <strong>{activeAction}</strong></h5>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 12px 0' }}>Please attach a verification photo of the site to complete this action.</p>
              
              <label style={{ display: 'inline-block', background: '#EFF6FF', border: `1px dashed ${errorMessage ? '#DC2626' : '#3B82F6'}`, padding: '10px 16px', borderRadius: 4, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#1D4ED8', marginBottom: 8 }}>
                {verificationPhoto ? '✓ Verification Photo Attached (Click to Change)' : '📷 Upload Verification Photo'}
                <input type="file" accept="image/*" onChange={handleVerificationPhotoUpload} style={{ display: 'none' }} />
              </label>

              {/* Red inline error text below photo button */}
              {errorMessage && (
                <div style={{ color: '#DC2626', fontSize: '0.78rem', fontWeight: 700, marginBottom: 12 }}>
                  {errorMessage}
                </div>
              )}

              {verificationPhoto && (
                <div style={{ width: 120, height: 90, borderRadius: 4, overflow: 'hidden', marginBottom: 12, border: '1px solid #CBD5E1' }}>
                  <img src={verificationPhoto} alt="Verification Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}

              <div>
                <button 
                  onClick={() => {
                    const statusMap = {
                      'Mark Verified': ['VERIFIED', 'Mark Verified ✅'],
                      'Assign Contractor': ['ASSIGNED', 'Assign Contractor 🏗️'],
                      'Mark Repaired': ['REPAIRED', 'Mark Repaired 🛠️']
                    };
                    const [newStat, newMark] = statusMap[activeAction];
                    submitStatusChange(newStat, newMark);
                  }}
                  style={{ background: '#2E8B57', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: 4, fontWeight: 700, cursor: 'pointer' }}
                >
                  Submit {activeAction} Status Update
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Incident Metadata */}
        <div style={{ background: '#FFF', padding: 20, borderRadius: 6, border: '1px solid #E2E8F0' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#1F3A5F' }}>Incident Metadata</h4>
          <p style={{ margin: '4px 0' }}><strong>Location:</strong> {currentIncident.location}, {currentIncident.ward || 'Ward 52'}</p>
          <p style={{ margin: '4px 0' }}><strong>GPS Coordinates:</strong> {currentIncident.coords}</p>
          <p style={{ margin: '4px 0' }}><strong>Peak Impact:</strong> {currentIncident.gForce}</p>
          {currentIncident.verificationPhoto && (
            <div style={{ marginTop: 12 }}>
              <strong style={{ display: 'block', marginBottom: 6, color: '#1F3A5F' }}>Submitted Verification Photo:</strong>
              <div style={{ width: 180, height: 120, borderRadius: 6, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                <img src={currentIncident.verificationPhoto} alt="Verification Site" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
