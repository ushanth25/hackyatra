import React, { useState, useEffect, useRef } from 'react';

export function AutoDetectActive({ onNavigate, onAddReport }) {
  const [distance, setDistance] = useState(0.0);
  const [shocks, setShocks] = useState(0);
  const [speed, setSpeed] = useState(35);
  const [isSimulating, setIsSimulating] = useState(true);
  const [lastSpikeText, setLastSpikeText] = useState(null);

  const canvasRef = useRef(null);

  // Animated continuous Z-Axis Accelerometer waveform canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let step = 0;

    const renderWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid line
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Continuous Z-Vector Oscilloscope Sine Wave
      ctx.strokeStyle = speed >= 15 ? '#E8842C' : '#64748B';
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x < canvas.width; x++) {
        let y = canvas.height / 2;
        if (speed >= 15) {
          // Add sine vibration + minor baseline noise
          y += Math.sin((x + step) * 0.1) * 8 + (Math.random() - 0.5) * 3;

          // If a jerk/spike is active
          if (lastSpikeText && x > canvas.width / 2 - 30 && x < canvas.width / 2 + 30) {
            y += (Math.random() - 0.5) * 35; // Spike vibration surge
          }
        }
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      step += 3;
      animationId = requestAnimationFrame(renderWave);
    };

    renderWave();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [speed, lastSpikeText]);

  // Simulation drive timer with auto shock spikes
  useEffect(() => {
    let timer;
    if (isSimulating) {
      setSpeed(35);
      timer = setInterval(() => {
        setDistance((prev) => parseFloat((prev + 0.01).toFixed(2)));

        // Trigger shock jerk (high probability for demo showcase)
        if (Math.random() > 0.88) {
          triggerShockSpike();
        }
      }, 800);
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
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const rawSpeed = pos.coords.speed ? pos.coords.speed * 3.6 : 0;
          setSpeed(Math.round(rawSpeed));
        },
        (err) => console.log('GPS error:', err),
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [isSimulating]);

  const triggerShockSpike = () => {
    setShocks((prev) => prev + 1);
    const gForceVal = (2.4 + Math.random() * 1.2).toFixed(1);
    const text = `💥 SHOCK PEAK ${gForceVal}g (Pothole Logged)`;
    setLastSpikeText(text);

    // Auto-dispatch to Officer Queue with explicit ACCELEROMETER TELEMETRY source
    if (onAddReport) {
      onAddReport({
        id: '#PTH-1042', // Same ID for Beach Road Ward 52 location
        location: 'Beach Road, Nr Kali Temple',
        ward: 'Ward 52',
        coords: '17.7231° N, 83.3012° E',
        source: 'ACCELEROMETER TELEMETRY (Z-SHOCK)',
        gForce: `${gForceVal}g (High Peak Shock)`,
        status: 'DETECTED',
        statusMark: 'Detected ⚠️',
        severity: 'high',
        notes: `Telemetry shock peak ${gForceVal}g auto-detected by vehicle accelerometer.`
      });
    }

    setTimeout(() => {
      setLastSpikeText(null);
    }, 2500);
  };

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
            <span>⚠️ <strong>Stationary (0 km/h):</strong> Auto-detection paused. Shock filtering requires vehicle speed &ge; 15 km/h to prevent false positives.</span>
          )}
        </div>

        {/* Radar Ring */}
        <div style={{ width: 120, height: 120, borderRadius: '50%', border: `4px solid ${speed >= 15 ? '#E8842C' : '#94A3B8'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: speed >= 15 ? '0 0 20px rgba(232,132,44,0.3)' : 'none' }}>
          <span style={{ fontSize: '2rem' }}>📡</span>
          <span style={{ fontWeight: 700, fontSize: '0.78rem', color: '#1F3A5F', marginTop: 2 }}>
            {speed >= 15 ? `MONITORING (${speed} km/h)` : 'PAUSED'}
          </span>
        </div>

        {/* Live Shock Peak Spike Notification Banner */}
        {lastSpikeText && (
          <div style={{ width: '100%', background: '#FEE2E2', border: '1px solid #EF4444', color: '#991B1B', padding: '10px 14px', borderRadius: 6, fontSize: '0.82rem', fontWeight: 800, textAlign: 'center', animation: 'bounce 0.5s ease' }}>
            {lastSpikeText}
          </div>
        )}

        {/* Live Continuous Accelerometer Oscilloscope Waveform Panel */}
        <div style={{ width: '100%', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
            <span>ACCELEROMETER TELEMETRY (Z-AXIS WAVE)</span>
            <span style={{ color: speed >= 15 ? '#E8842C' : '#94A3B8' }}>{speed >= 15 ? 'Sampling 50Hz' : 'Stationary'}</span>
          </div>
          <div style={{ background: '#1A2530', borderRadius: 6, padding: 4, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <canvas ref={canvasRef} width={380} height={50} style={{ width: '100%', height: '100%' }} />
          </div>
        </div>

        {/* Manual Test Jerk Button for Demo */}
        <button 
          onClick={triggerShockSpike}
          style={{ width: '100%', background: '#1F3A5F', color: '#FFF', border: 'none', padding: '10px', borderRadius: 6, fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          ⚡ Simulate Immediate Pothole Jerk Shock
        </button>

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
