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

  const navigate = (viewName) => {
    setCurrentView(viewName);
  };

  return (
    <div>
      {/* Top Role Switcher Bar */}
      <div style={{ background: '#0F172A', color: '#FFF', padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
        <span>GVMC Road Watch (SW11) — React SPA Router:</span>
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
      {currentView === 'report' && <ReportPothole onNavigate={navigate} />}
      {currentView === 'my_reports' && <MyReports onNavigate={navigate} />}
      {currentView === 'report_detail' && <ReportDetail onNavigate={navigate} />}
      {currentView === 'profile' && <CitizenProfile onNavigate={navigate} />}
      {currentView === 'offline_queue' && <OfflineSyncQueue onNavigate={navigate} />}
      
      {currentView === 'officer' && <OfficerDashboard onNavigate={navigate} />}
      {currentView === 'officer_reset' && <OfficerResetPassword onNavigate={navigate} />}
      {currentView === 'reports_list' && <ReportsList onNavigate={navigate} />}
      {currentView === 'pothole_detail' && <PotholeDetail onNavigate={navigate} />}
      
      {currentView === 'admin_login' && <AdminLogin onNavigate={navigate} />}
      {currentView === 'admin_overview' && <AdminOverview onNavigate={navigate} />}
      {currentView === 'admin_officers' && <AdminOfficers onNavigate={navigate} />}
      {currentView === 'admin_settings' && <AdminSettings onNavigate={navigate} />}
    </div>
  );
}
