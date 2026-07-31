import React, { useState } from 'react';
import { CitizenHome } from './pages/CitizenHome.jsx';
import { AutoDetectActive } from './pages/AutoDetectActive.jsx';
import { ReportPothole } from './pages/ReportPothole.jsx';
import { MyReports } from './pages/MyReports.jsx';
import { ReportDetail } from './pages/ReportDetail.jsx';
import { CitizenProfile } from './pages/CitizenProfile.jsx';
import { OfflineSyncQueue } from './pages/OfflineSyncQueue.jsx';
import { OfficerDashboard } from './pages/OfficerDashboard.jsx';
import { OfficerResetPassword } from './pages/OfficerResetPassword.jsx';
import { ReportsList } from './pages/ReportsList.jsx';
import { PotholeDetail } from './pages/PotholeDetail.jsx';
import { AdminOverview } from './pages/AdminOverview.jsx';
import { AdminOfficers } from './pages/AdminOfficers.jsx';
import { AdminSettings } from './pages/AdminSettings.jsx';
import { AdminLogin } from './pages/AdminLogin.jsx';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedIncidentId, setSelectedIncidentId] = useState('#PTH-1042');

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Admin HQ Review',
      message: 'Incident #PTH-1043 repair work was APPROVED by Commissioner HQ.',
      type: 'APPROVED',
      time: '10 mins ago',
      read: false
    }
  ]);

  const [reports, setReports] = useState([
    {
      id: '#PTH-1042',
      location: 'Beach Road, Nr Kali Temple',
      ward: 'Ward 52',
      coords: '17.7231° N, 83.3012° E',
      source: 'Auto-Detect (Z-Shock)',
      gForce: '2.9g (High)',
      status: 'DETECTED',
      statusMark: 'Detected ⚠️',
      severity: 'high',
      notes: 'Deep crater detected near Kali Temple',
      photo: null,
      verificationPhoto: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=400&q=80',
      adminReview: null
    },
    {
      id: '#PTH-1043',
      location: 'Siripuram Circle',
      ward: 'Ward 52',
      coords: '17.7120° N, 83.2950° E',
      source: 'Citizen App',
      gForce: '3.1g (Critical)',
      status: 'VERIFIED',
      statusMark: 'Mark Verified ✅',
      severity: 'high',
      notes: 'Damaged asphalt near bus stop',
      photo: null,
      verificationPhoto: null,
      adminReview: null
    },
    {
      id: '#PTH-1044',
      location: 'MVP Colony Sector 4',
      ward: 'Ward 52',
      coords: '17.7340° N, 83.3120° E',
      source: 'Auto-Detect (Z-Shock)',
      gForce: '2.5g (Moderate)',
      status: 'ASSIGNED',
      statusMark: 'Assign Contractor 🏗️',
      severity: 'medium',
      notes: 'Contractor Unit B-4 assigned for patch work',
      photo: null,
      verificationPhoto: null,
      adminReview: null
    }
  ]);

  const navigate = (viewName, incidentId = null) => {
    if (incidentId) {
      setSelectedIncidentId(incidentId);
    }
    setCurrentView(viewName);
  };

  const addReport = (newReport) => {
    setReports((prev) => [newReport, ...prev]);
  };

  const updateReportStatus = (id, newStatus, statusMark, verificationPhoto) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: newStatus, statusMark: statusMark, verificationPhoto: verificationPhoto || r.verificationPhoto }
          : r
      )
    );
  };

  const submitAdminReview = (incidentId, isSatisfied, comment) => {
    const reviewStatus = isSatisfied ? 'Satisfied (Approved) ✅' : 'Not Satisfied (Rejected) ❌';
    
    setReports((prev) =>
      prev.map((r) =>
        r.id === incidentId
          ? {
              ...r,
              adminReview: {
                status: isSatisfied ? 'APPROVED' : 'REJECTED',
                text: reviewStatus,
                comment: comment || (isSatisfied ? 'Photo verified successfully.' : 'Quality insufficient, re-inspection required.')
              }
            }
          : r
      )
    );

    const newNotif = {
      id: Date.now(),
      title: `Admin HQ Feedback on ${incidentId}`,
      message: isSatisfied 
        ? `Admin HQ is SATISFIED with verification photo for ${incidentId}. Work Approved!`
        : `Admin HQ is NOT SATISFIED with verification photo for ${incidentId}. Note: "${comment || 'Re-inspection required'}"`,
      type: isSatisfied ? 'APPROVED' : 'REJECTED',
      time: 'Just now',
      read: false
    };

    setNotifications((prev) => [newNotif, ...prev]);
  };

  return (
    <div>
      {/* Top Role Switcher Bar */}
      <div style={{ background: '#0F172A', color: '#FFF', padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: 700 }}>
        <span>GVMC Road Watch</span>
        <div style={{ display: 'flex', gap: 10 }}>
          <button 
            onClick={() => navigate('home')}
            style={{ background: currentView.startsWith('home') || currentView === 'auto_detect' || currentView === 'my_reports' ? '#E8842C' : '#334155', color: '#FFF', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}
          >
            📱 Citizen App
          </button>
          <button 
            onClick={() => navigate('officer')}
            style={{ background: currentView === 'officer' || currentView === 'reports_list' || currentView === 'pothole_detail' ? '#E8842C' : '#334155', color: '#FFF', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}
          >
            📊 Field Officer
          </button>
          <button 
            onClick={() => navigate('admin_overview')}
            style={{ background: currentView.startsWith('admin') ? '#E8842C' : '#334155', color: '#FFF', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}
          >
            🏛️ Admin HQ
          </button>
        </div>
      </div>

      {/* Render Active React Page Component */}
      {currentView === 'home' && <CitizenHome onNavigate={navigate} />}
      {currentView === 'auto_detect' && <AutoDetectActive onNavigate={navigate} />}
      {currentView === 'report' && <ReportPothole onNavigate={navigate} onAddReport={addReport} />}
      {currentView === 'my_reports' && <MyReports onNavigate={navigate} reports={reports} />}
      {currentView === 'report_detail' && <ReportDetail onNavigate={navigate} />}
      {currentView === 'profile' && <CitizenProfile onNavigate={navigate} />}
      {currentView === 'offline_queue' && <OfflineSyncQueue onNavigate={navigate} />}
      
      {currentView === 'officer' && <OfficerDashboard onNavigate={navigate} reports={reports} notifications={notifications} />}
      {currentView === 'officer_reset' && <OfficerResetPassword onNavigate={navigate} />}
      {currentView === 'reports_list' && <ReportsList onNavigate={navigate} reports={reports} notifications={notifications} />}
      {currentView === 'pothole_detail' && (
        <PotholeDetail 
          onNavigate={navigate} 
          incidentId={selectedIncidentId} 
          reports={reports} 
          onUpdateStatus={updateReportStatus} 
        />
      )}
      
      {currentView === 'admin_login' && <AdminLogin onNavigate={navigate} />}
      {currentView === 'admin_overview' && (
        <AdminOverview 
          onNavigate={navigate} 
          reports={reports} 
          onSubmitAdminReview={submitAdminReview} 
        />
      )}
      {currentView === 'admin_officers' && <AdminOfficers onNavigate={navigate} />}
      {currentView === 'admin_settings' && <AdminSettings onNavigate={navigate} />}
      {currentView === 'gis_map' && (
        <div style={{ fontFamily: 'Noto Sans, sans-serif', padding: 24, maxWidth: 1200, margin: '0 auto' }}>
          <button onClick={() => navigate('officer')} style={{ background: '#1F3A5F', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer', marginBottom: 16 }}>← Back to Officer Dashboard</button>
          <h2 style={{ color: '#1F3A5F', marginBottom: 16 }}>🗺️ Visakhapatnam GIS Pothole Heatmap</h2>
          <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #CBD5E1', height: 500, background: '#F8FAFC' }}>
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
                      attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    var potholeIcon = L.divIcon({
                      className: 'custom-div-icon',
                      html: "<div style='background-color:#C0392B; width:16px; height:16px; border-radius:50%; border:2px solid white; box-shadow:0 0 6px rgba(0,0,0,0.4);'></div>",
                      iconSize: [16, 16],
                      iconAnchor: [8, 8]
                    });

                    L.marker([17.7231, 83.3012], {icon: potholeIcon}).addTo(map)
                      .bindPopup("<b>Incident #PTH-1042</b><br>Beach Road, Ward 52<br>Peak Impact: 2.9g (High Severity)");
                    
                    L.marker([17.7120, 83.2950], {icon: potholeIcon}).addTo(map)
                      .bindPopup("<b>Incident #PTH-1043</b><br>Siripuram Junction<br>Peak Impact: 3.1g (Critical)");

                    L.marker([17.7340, 83.3120], {icon: potholeIcon}).addTo(map)
                      .bindPopup("<b>Incident #PTH-1044</b><br>MVP Colony Sector 4<br>Peak Impact: 2.5g (Moderate)");
                  </script>
                </body>
                </html>
              `}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Visakhapatnam GIS Map"
            />
          </div>
        </div>
      )}
    </div>
  );
}
