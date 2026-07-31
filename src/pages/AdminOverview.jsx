import React, { useState } from 'react';

export function AdminOverview({ onNavigate, reports = [], onSubmitAdminReview }) {
  const [selectedWard, setSelectedWard] = useState('All Wards (City-Wide)');
  const [reviewingReport, setReviewingReport] = useState(null);
  const [comment, setComment] = useState('');

  const filteredReports = reports.filter(r => {
    if (selectedWard === 'All Wards (City-Wide)') return true;
    return r.ward && r.ward.includes('52');
  });

  const handleOpenReview = (report) => {
    setReviewingReport(report);
    setComment('');
  };

  const handleCloseReview = () => {
    setReviewingReport(null);
    setComment('');
  };

  const handleReviewSubmit = (isSatisfied) => {
    if (!reviewingReport) return;
    if (onSubmitAdminReview) {
      onSubmitAdminReview(reviewingReport.id, isSatisfied, comment);
    }
    alert(`Admin decision recorded: ${isSatisfied ? 'Satisfied (Approved)' : 'Not Satisfied (Rejected)'}. Notification sent to Ward Field Officer!`);
    handleCloseReview();
  };

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', background: '#F4F6F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <header style={{ background: '#1F3A5F', color: '#FFF', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 28, height: 28, border: '1px solid #FFF', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: 700 }}>EMBLEM</div>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>GVMC Commissioner City-Wide Analytics</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '0.85rem' }}>🔓 Ward Filter:</span>
          <select 
            value={selectedWard} 
            onChange={(e) => setSelectedWard(e.target.value)}
            style={{ background: '#EFF6FF', border: '1px solid #3B82F6', padding: '6px 12px', borderRadius: 4, fontWeight: 700, color: '#1F3A5F' }}
          >
            <option>All Wards (City-Wide)</option>
            <option>Ward 52 (Siripuram)</option>
            <option>Ward 40 (Gajuwaka)</option>
            <option>Ward 12 (Maddilapalem)</option>
          </select>
        </div>
      </header>

      {/* Sub Nav */}
      <nav style={{ background: '#152A47', padding: '8px 24px', display: 'flex', gap: 16 }}>
        <button onClick={() => onNavigate('officer')} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>📊 Officer View</button>
        <button onClick={() => onNavigate('admin_overview')} style={{ background: 'none', border: 'none', color: '#E8842C', fontWeight: 700, cursor: 'pointer' }}>🏛️ City Overview</button>
        <button onClick={() => onNavigate('admin_officers')} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>👥 Officer Mgmt</button>
        <button onClick={() => onNavigate('admin_settings')} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>⚙️ System Settings</button>
      </nav>

      {/* Content */}
      <main style={{ padding: 24, flex: 1, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <h2 style={{ color: '#1F3A5F', margin: '0 0 20px 0' }}>Visakhapatnam Roads & Buildings Command Center</h2>

        {/* City Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#FFF', padding: 16, borderRadius: 6, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Total Potholes Detected</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1F3A5F' }}>{1428 + filteredReports.length}</div>
          </div>
          <div style={{ background: '#FFF', padding: 16, borderRadius: 6, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Active City Backlog</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#E8842C' }}>384</div>
          </div>
          <div style={{ background: '#FFF', padding: 16, borderRadius: 6, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Resolved & Patched</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2E8B57' }}>1,044</div>
          </div>
          <div style={{ background: '#FFF', padding: 16, borderRadius: 6, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>City SLA Compliance</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2E8B57' }}>91.4%</div>
          </div>
        </div>

        {/* Incident Directory Table in Admin HQ */}
        <div style={{ background: '#FFF', borderRadius: 6, border: '1px solid #E2E8F0', padding: 20, marginBottom: 24 }}>
          <h3 style={{ color: '#1F3A5F', margin: '0 0 16px 0' }}>City-Wide Incident Directory & Verification Review</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: 12 }}>ID</th>
                <th style={{ padding: 12 }}>Location / Ward</th>
                <th style={{ padding: 12 }}>Detection Source & Type</th>
                <th style={{ padding: 12 }}>Peak g-Force</th>
                <th style={{ padding: 12 }}>Verification Photo</th>
                <th style={{ padding: 12 }}>Admin HQ Decision</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => {
                const isAuto = report.source.includes('ACCELEROMETER') || report.source.includes('Auto-Detect');
                return (
                  <tr key={report.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: 12, fontWeight: 700, color: '#1F3A5F' }}>{report.id}</td>
                    <td style={{ padding: 12 }}>{report.location} ({report.ward})</td>
                    <td style={{ padding: 12 }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        background: isAuto ? '#FFF7ED' : '#EFF6FF',
                        color: isAuto ? '#C2410C' : '#1D4ED8',
                        border: `1px solid ${isAuto ? '#FFEDD5' : '#DBEAFE'}`,
                        padding: '4px 10px',
                        borderRadius: 6,
                        fontWeight: 700,
                        fontSize: '0.78rem'
                      }}>
                        {isAuto ? '📡 ACCELEROMETER TELEMETRY (Z-SHOCK)' : '📸 Citizen Manual Photo Upload'}
                      </span>
                    </td>
                    <td style={{ padding: 12, color: report.severity === 'high' ? '#C0392B' : '#E8842C', fontWeight: 700 }}>
                      {report.gForce}
                    </td>
                    <td style={{ padding: 12 }}>
                      {report.verificationPhoto ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ color: '#2E8B57', fontWeight: 700 }}>Photo Attached ✅</span>
                          <button 
                            onClick={() => handleOpenReview(report)}
                            style={{ background: '#1F3A5F', color: '#FFF', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}
                          >
                            👁️ View & Review
                          </button>
                        </div>
                      ) : (
                        <span style={{ color: '#94A3B8' }}>Pending Inspection</span>
                      )}
                    </td>
                    <td style={{ padding: 12 }}>
                      {report.adminReview ? (
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: 4,
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          background: report.adminReview.status === 'APPROVED' ? '#DCFCE7' : '#FEE2E2',
                          color: report.adminReview.status === 'APPROVED' ? '#166534' : '#991B1B'
                        }}>
                          {report.adminReview.text}
                        </span>
                      ) : (
                        <span style={{ color: '#64748B', fontSize: '0.75rem' }}>Awaiting Review</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal for Admin Verification Review */}
        {reviewingReport && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
            <div style={{ background: '#FFF', borderRadius: 8, padding: 24, maxWidth: 540, width: '100%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ margin: 0, color: '#1F3A5F' }}>Admin HQ Verification Review — {reviewingReport.id}</h3>
                <button onClick={handleCloseReview} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#64748B' }}>✕</button>
              </div>

              <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: 16 }}>
                <div><strong>Location:</strong> {reviewingReport.location} ({reviewingReport.ward})</div>
                <div><strong>Coordinates:</strong> {reviewingReport.coords}</div>
                <div><strong>Detection Type:</strong> {reviewingReport.source.includes('ACCELEROMETER') || reviewingReport.source.includes('Auto-Detect') ? '📡 ACCELEROMETER TELEMETRY (Z-SHOCK)' : '📸 Citizen Manual Photo Upload'}</div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1F3A5F', display: 'block', marginBottom: 8 }}>Field Officer Submitted Verification Photo:</label>
                <div style={{ width: '100%', height: 220, borderRadius: 6, overflow: 'hidden', border: '1px solid #CBD5E1', background: '#F8FAFC' }}>
                  <img src={reviewingReport.verificationPhoto} alt="Verification Site" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1F3A5F', display: 'block', marginBottom: 6 }}>Commissioner Reply / Feedback Notes (Optional):</label>
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="e.g. Surface patch quality looks good / Requires extra layer of asphalt compaction."
                  style={{ width: '100%', height: 70, padding: 8, borderRadius: 6, border: '1px solid #CBD5E1', fontFamily: 'inherit', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button 
                  onClick={() => handleReviewSubmit(true)}
                  style={{ flex: 1, background: '#2E8B57', color: '#FFF', border: 'none', padding: '12px', borderRadius: 6, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  🟢 Satisfied (Approve)
                </button>
                <button 
                  onClick={() => handleReviewSubmit(false)}
                  style={{ flex: 1, background: '#C0392B', color: '#FFF', border: 'none', padding: '12px', borderRadius: 6, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  🔴 Not Satisfied (Reject)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Top Backlog Table */}
        <div style={{ background: '#FFF', borderRadius: 6, border: '1px solid #E2E8F0', padding: 20 }}>
          <h3 style={{ color: '#1F3A5F', margin: '0 0 16px 0' }}>Top Backlog Wards Ranking</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: 10 }}>Ward Name</th>
                <th style={{ padding: 10 }}>Pending Count</th>
                <th style={{ padding: 10 }}>Avg SLA Days</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: 10 }}>Ward 52 (Siripuram)</td>
                <td style={{ padding: 10, color: '#C0392B', fontWeight: 700 }}>48</td>
                <td style={{ padding: 10 }}>3.8 Days</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: 10 }}>Ward 40 (Gajuwaka)</td>
                <td style={{ padding: 10, color: '#C0392B', fontWeight: 700 }}>42</td>
                <td style={{ padding: 10 }}>5.1 Days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
