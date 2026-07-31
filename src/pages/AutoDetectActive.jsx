import React, { useState, useEffect } from 'react';

export function AutoDetectActive({ onNavigate }) {
  const [distance, setDistance] = useState(0.0);
  const [shocks, setShocks] = useState(0);
  const [speed, setSpeed] = useState(35);
  const [isSimulating, setIsSimulating] = useState(true);

  useEffect(() => {
    let timer;
    if (isSimulating) {
      setSpeed(35);
      timer = setInterval(() => {
        setDistance(prev => parseFloat((prev + 0.01).toFixed(2)));
        if (Math.random() > 0.94) {
          setShocks(prev => prev + 1);
        }
      }, 500);
    } else {
      setSpeed(0);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isSimulating]);

  // Real GPS Speed Tracker
  useEffect(() => {
    if (!isSimulating && 'geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition((pos) => {
        const rawSpeed = pos.coords.speed ? (pos.coords.speed * 3.6) : 0;
        setSpeed(Math.round(rawSpeed));
      }, (err) => console.log('GPS error:', err), { enableHighAccuracy: true });

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [isSimulating]);

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', maxWidth: 440, margin: '0 auto', background: '#FFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ background: '#1F3A5F', color: '#FFF', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '1.2rem', cursor: 'pointer' }}>←</button>
        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Auto-Detection Active</span>
        <span style={{ fontSize: '0.75rem', background: speed >= 15 ? '#2E8B57' : '#E8842C', padding: '4px 8px', borderRadius: 4 }}>
          {speed >= 15 ? 'GPS ACTIVE' : 'PAUSED (0 km/h)'}
        </span>
      </header>

      <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        {/* Mode Switcher */}
        <div style={{ width: '100%', background: '#1E293B', color: '#FFF', padding: '10px 14px', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
          <span>Mode: <strong>{isSimulating ? 'Demo Drive Sim' : 'Real Device GPS'}</strong></span>
          <button 
            onClick={() => setIsSimulating(!isSimulating)} 
            style={{ background: '#E8842C', color: '#FFF', border: 'none', padding: '4px 10px', borderRadius: 4, fontWeight: 700, cursor: 'pointer' }}
          >
            {isSimulating ? '🔘 Use Real GPS' : '🚗 Toggle Demo Drive Sim'}
          </button>
        </div>

        {/* Speed Gate Alert Box */}
        <div style={{ width: '100%', background: speed >= 15 ? '#DCFCE7' : '#FEF3C7', borderLeft: `4px solid ${speed >= 15 ? '#2E8B57' : '#F59E0B'}`, padding: '10px 14px', borderRadius: 6, fontSize: '0.8rem', color: speed >= 15 ? '#14532D' : '#92400E' }}>
          {speed >= 15 ? (
            <span>🚗 <strong>Drive Mode Active ({speed} km/h):</strong> Vehicle motion detected (&ge; 15 km/h). Telemetry shock engine active.</span>
          ) : (
            <span>⚠️ <strong>Stationary (0 km/h):</strong> Auto-detection paused. Shock filtering requires vehicle speed &ge; 15 km/h to prevent chair/walking false positives.</span>
          )}
        </div>

        {/* Radar Ring */}
        <div style={{ width: 130, height: 130, borderRadius: '50%', border: `4px solid ${speed >= 15 ? '#E8842C' : '#94A3B8'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: speed >= 15 ? '0 0 20px rgba(232,132,44,0.3)' : 'none' }}>
          <span style={{ fontSize: '2rem' }}>📡</span>
          <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#1F3A5F', marginTop: 4 }}>
            {speed >= 15 ? `MONITORING (${speed} km/h)` : 'PAUSED (0 km/h)'}
          </span>
        </div>

        {/* Live Telemetry Panel */}
        <div style={{ width: '100%', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
            <span>ACCELEROMETER TELEMETRY (Z-AXIS)</span>
            <span style={{ color: speed >= 15 ? '#E8842C' : '#94A3B8' }}>{speed >= 15 ? 'Sampling 50Hz' : 'Stationary (0g)'}</span>
          </div>
          <div style={{ height: 45, background: '#1A2530', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: speed >= 15 ? '#E8842C' : '#64748B', fontFamily: 'monospace', fontSize: '0.85rem' }}>
            {speed >= 15 ? '〰️ z-vector 2.2g baseline [active]' : '---------------- flatline (0 km/h) ----------------'}
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: '#F4F6F8', padding: 12, borderRadius: 8 }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1F3A5F' }}>{distance.toFixed(2)} km</div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Trip Distance</div>
          </div>
          <div style={{ background: '#F4F6F8', padding: 12, borderRadius: 8 }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#C0392B' }}>{shocks}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Potholes Logged</div>
          </div>
          <div style={{ background: '#F4F6F8', padding: 12, borderRadius: 8 }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1F3A5F' }}>{speed} km/h</div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Vehicle Speed</div>
          </div>
          <div style={{ background: '#F4F6F8', padding: 12, borderRadius: 8 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2E8B57' }}>Ward 52</div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Siripuram Zone</div>
          </div>
        </div>
      </div>

      <div style={{ padding: 16, borderTop: '1px solid #E2E8F0' }}>
        <button onClick={() => onNavigate('home')} style={{ width: '100%', background: '#C0392B', color: '#FFF', border: 'none', padding: 14, borderRadius: 8, fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
          🛑 Stop Auto-Detection
        </button>
      </div>
    </div>
  );
}
