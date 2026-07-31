import React, { useState, useEffect, useRef } from 'react';

export function CitizenHome({ onNavigate }) {
  const [autoDetect, setAutoDetect] = useState(false);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current && window.L) {
      const L = window.L;
      const map = L.map(mapContainerRef.current).setView([17.7231, 83.3012], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const potholeIcon = L.divIcon({
        className: 'custom-pothole',
        html: "<div style='background-color:#C0392B; width:16px; height:16px; border-radius:50%; border:2px solid white; box-shadow:0 0 6px rgba(0,0,0,0.4);'></div>",
        iconSize: [16, 16]
      });

      L.marker([17.7240, 83.3020], { icon: potholeIcon }).addTo(map).bindPopup("Beach Road Pothole (High Severity)");
      L.marker([17.7210, 83.2980], { icon: potholeIcon }).addTo(map).bindPopup("Siripuram Junction Pothole");

      mapInstanceRef.current = map;
    }
  }, []);

  const handleToggleAutoDetect = (e) => {
    const isChecked = e.target.checked;
    setAutoDetect(isChecked);
    if (isChecked) {
      onNavigate('auto_detect');
    }
  };

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', maxWidth: 440, margin: '0 auto', background: '#FFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Header */}
      <header style={{ background: '#1F3A5F', color: '#FFF', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>GVMC Road Watch</div>
        <div style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: 4 }}>CITIZEN APP</div>
      </header>

      {/* Main Container with Map */}
      <div style={{ flex: 1, position: 'relative', minHeight: '380px', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <iframe 
          srcdoc={`
            <!DOCTYPE html>
            <html>
            <head>
              <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
              <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
              <style>html, body, #map { height: 100%; margin: 0; padding: 0; }</style>
            </head>
            <body>
              <div id="map"></div>
              <script>
                var map = L.map('map').setView([17.7231, 83.3012], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '&copy; OpenStreetMap'
                }).addTo(map);

                var potholeIcon = L.divIcon({
                  html: "<div style='background-color:#C0392B; width:16px; height:16px; border-radius:50%; border:2px solid white; box-shadow:0 0 6px rgba(0,0,0,0.4);'></div>",
                  iconSize: [16, 16]
                });

                L.marker([17.7240, 83.3020], { icon: potholeIcon }).addTo(map).bindPopup("Beach Road Pothole");
                L.marker([17.7210, 83.2980], { icon: potholeIcon }).addTo(map).bindPopup("Siripuram Junction Pothole");
              </script>
            </body>
            </html>
          `}
          style={{ width: '100%', height: '100%', border: 'none', position: 'absolute', top: 0, left: 0 }}
          title="Visakhapatnam Citizen Map"
        />
        
        {/* Floating Centered Round Action Button */}
        <button 
          onClick={() => onNavigate('report')}
          style={{ 
            position: 'relative', 
            zIndex: 1000, 
            background: 'linear-gradient(135deg, #E8842C 0%, #D97706 100%)', 
            color: '#FFF', 
            border: '3px solid #FFF', 
            padding: '14px 24px', 
            borderRadius: '50px', 
            fontWeight: 800, 
            fontSize: '1rem', 
            cursor: 'pointer', 
            boxShadow: '0 8px 24px rgba(232,132,44,0.45)',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}
        >
          <span>📸</span> Report Pothole
        </button>
      </div>

      {/* Control Panel Footer */}
      <div style={{ padding: '16px', background: '#FFF', borderTop: '1px solid #E2E8F0', zIndex: 10 }}>
        {/* Auto Detect Card / Toggle */}
        <div style={{ background: '#EFF6FF', border: '1px solid #3B82F6', borderRadius: 10, padding: 14, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong style={{ color: '#1F3A5F', display: 'block', fontSize: '0.95rem' }}>Auto-Detect (Drive Mode)</strong>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Continuous Z-axis shock telemetry</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ position: 'relative', display: 'inline-block', width: 46, height: 24, cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={autoDetect}
                onChange={handleToggleAutoDetect}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: autoDetect ? '#E8842C' : '#CBD5E1', transition: '.3s', borderRadius: 24 }}>
                <span style={{ position: 'absolute', content: '""', height: 18, width: 18, left: autoDetect ? 24 : 3, bottom: 3, backgroundColor: 'white', transition: '.3s', borderRadius: '50%' }} />
              </span>
            </label>
            <button 
              onClick={() => onNavigate('auto_detect')}
              style={{ background: '#E8842C', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: 16, fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
            >
              Open ⚡
            </button>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('my_reports')}
          style={{ width: '100%', background: '#1F3A5F', color: '#FFF', border: 'none', padding: '12px', borderRadius: 8, fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', marginBottom: 12 }}
        >
          📋 View My Submitted Reports
        </button>
      </div>

      {/* Footer Nav Bar */}
      <nav style={{ background: '#1F3A5F', display: 'flex', justifyContent: 'space-around', padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.1)', zIndex: 10 }}>
        <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', color: '#E8842C', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span>🏠</span> Home
        </button>
        <button onClick={() => onNavigate('auto_detect')} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span>📡</span> Auto-Detect
        </button>
        <button onClick={() => onNavigate('report')} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span>📸</span> Report
        </button>
        <button onClick={() => onNavigate('my_reports')} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span>📋</span> My Reports
        </button>
        <button onClick={() => onNavigate('profile')} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span>👤</span> Profile
        </button>
      </nav>
    </div>
  );
}
