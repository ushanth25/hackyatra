import React, { useState } from 'react';

export function ReportPothole({ onNavigate, onAddReport }) {
  const [severity, setSeverity] = useState('high');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [notes, setNotes] = useState('');
  const [locationText, setLocationText] = useState('Detecting GPS location...');
  const [coords, setCoords] = useState('17.7231° N, 83.3012° E');
  const [ward, setWard] = useState('Ward 52');

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const newId = `#PTH-${Math.floor(1045 + Math.random() * 9000)}`;
    const newReport = {
      id: newId,
      location: 'Beach Road, Nr Kali Temple',
      ward: ward,
      coords: coords,
      source: 'Citizen Manual Photo Upload',
      gForce: severity === 'high' ? '2.9g (High)' : severity === 'medium' ? '1.8g (Moderate)' : '1.2g (Low)',
      status: 'DETECTED',
      statusMark: 'Detected ⚠️',
      severity: severity,
      notes: notes || 'Citizen submitted manual photo report.',
      photo: photoPreview || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=400&q=80',
      verificationPhoto: null
    };

    if (onAddReport) {
      onAddReport(newReport);
    }

    alert(`Pothole report ${newId} submitted successfully! Automatically routed to ${ward} Field Officer.`);
    onNavigate('reports_list', newId);
  };

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', maxWidth: 440, margin: '0 auto', background: '#FFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#1F3A5F', color: '#FFF', padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '1.2rem', cursor: 'pointer' }}>←</button>
        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Report a Pothole</span>
      </header>

      <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Photo Upload Zone */}
        <label style={{ height: 160, background: '#F8FAFC', border: '2px dashed #CBD5E1', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748B', cursor: 'pointer', overflow: 'hidden', position: 'relative' }}>
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            onChange={handlePhotoUpload} 
            style={{ display: 'none' }} 
          />
          {photoPreview ? (
            <img src={photoPreview} alt="Captured Pothole" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <>
              <span style={{ fontSize: '2.5rem' }}>📸</span>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: 6 }}>Tap to Capture or Attach Photo</span>
            </>
          )}
        </label>

        {/* Location Box */}
        <div style={{ background: '#F4F6F8', padding: 12, borderRadius: 8, fontSize: '0.85rem' }}>
          <strong style={{ color: '#1F3A5F', display: 'block' }}>GPS Coordinates Locked</strong>
          <span style={{ color: '#64748B' }}>17.7231° N, 83.3012° E • Beach Road Ward 52</span>
        </div>

        {/* Severity Selector */}
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1F3A5F', display: 'block', marginBottom: 8 }}>Severity Level</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {['low', 'medium', 'high'].map(sev => (
              <button 
                key={sev}
                onClick={() => setSeverity(sev)}
                style={{ 
                  padding: '10px', 
                  borderRadius: 6, 
                  border: '1px solid #CBD5E1', 
                  fontWeight: 700, 
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  background: severity === sev ? (sev === 'high' ? '#C0392B' : sev === 'medium' ? '#E8842C' : '#2E8B57') : '#FFF',
                  color: severity === sev ? '#FFF' : '#1A2530',
                  cursor: 'pointer'
                }}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1F3A5F', display: 'block', marginBottom: 6 }}>Description / Notes</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Deep crater near Kali Temple intersection..." 
            style={{ width: '100%', height: 80, padding: 10, borderRadius: 6, border: '1px solid #CBD5E1', fontFamily: 'inherit' }} 
          />
        </div>
      </div>

      <div style={{ padding: 16, borderTop: '1px solid #E2E8F0' }}>
        <button onClick={handleSubmit} style={{ width: '100%', background: '#E8842C', color: '#FFF', border: 'none', padding: 14, borderRadius: 8, fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
          Submit Report to GVMC
        </button>
      </div>
    </div>
  );
}
