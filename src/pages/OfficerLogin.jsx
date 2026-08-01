import React, { useState } from 'react';
import { auth } from '../../js/firebase-config.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

export function OfficerLogin({ onNavigate, authorizedOfficers = [], onLoginSuccess }) {
  const [email, setEmail] = useState('officer.ward52@gvmc.gov.in');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('⚠️ Official Government Email is required.');
      return;
    }
    if (!password) {
      setErrorMessage('⚠️ Password is required.');
      return;
    }

    // Must be official government email domain
    if (!email.toLowerCase().endsWith('@gvmc.gov.in') && !email.toLowerCase().endsWith('@ap.gov.in')) {
      setErrorMessage('⚠️ Restricted Access: Field Officers must use official government email (@gvmc.gov.in / @ap.gov.in).');
      return;
    }

    // Verify if access has been granted & registered by Admin HQ
    const isAuthorized = authorizedOfficers.some(
      (off) => off.email.toLowerCase() === email.toLowerCase() && off.status === 'Active'
    );

    if (!isAuthorized) {
      setErrorMessage(`⚠️ Account Not Found / Access Denied: "${email}" is not registered or granted access by Admin HQ. Please contact Admin Commissioner HQ to register this account.`);
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      if (auth) {
        await signInWithEmailAndPassword(auth, email, password);
      }
      if (onLoginSuccess) {
        onLoginSuccess({ email, role: 'officer' });
      }
      onNavigate('officer');
    } catch (error) {
      console.log('Firebase Officer Auth error:', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        setErrorMessage(`⚠️ Account not registered in Firebase or invalid password. Please ensure Admin HQ has registered "${email}".`);
      } else {
        setErrorMessage('⚠️ Account verification failed. Please ensure your account is provisioned by Admin HQ.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', background: '#F8FAFC', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#FFF', border: '1px solid #CBD5E1', borderRadius: 8, width: 440, maxWidth: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ background: '#1F3A5F', color: '#FFF', padding: 24, textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '2px solid #38BDF8', borderRadius: 6, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, color: '#38BDF8' }}>GVMC</div>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '1.3rem' }}>GVMC Field Officer Access</h2>
          <div style={{ fontSize: '0.82rem', opacity: 0.85 }}>Jurisdiction Maintenance Portal</div>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: 24 }}>
          <div style={{ background: '#EFF6FF', border: '1px solid #93C5FD', color: '#1E40AF', padding: 10, borderRadius: 6, fontSize: '0.78rem', fontWeight: 700, marginBottom: 18 }}>
            🔒 ADMIN HQ REGISTERED ACCESS ONLY
            <br />
            <span style={{ fontWeight: 400, fontSize: '0.74rem' }}>Access must be registered directly by Admin HQ. Field Officers log in with their assigned @gvmc.gov.in email.</span>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 6, color: '#1F3A5F' }}>Government Email (@gvmc.gov.in)</label>
            <input 
              type="email" 
              placeholder="officer.ward52@gvmc.gov.in"
              value={email} 
              onChange={(e) => { setEmail(e.target.value); setErrorMessage(''); }} 
              style={{ width: '100%', padding: 11, border: `1px solid ${errorMessage ? '#DC2626' : '#CBD5E1'}`, borderRadius: 4, fontSize: '0.9rem' }} 
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 6, color: '#1F3A5F' }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => { setPassword(e.target.value); setErrorMessage(''); }} 
              style={{ width: '100%', padding: 11, border: `1px solid ${errorMessage ? '#DC2626' : '#CBD5E1'}`, borderRadius: 4, fontSize: '0.9rem' }} 
            />
          </div>

          {errorMessage && (
            <div style={{ color: '#DC2626', fontSize: '0.78rem', fontWeight: 700, marginBottom: 16, lineHeight: 1.4 }}>
              {errorMessage}
            </div>
          )}

          <button type="submit" disabled={loading} style={{ width: '100%', background: '#1F3A5F', color: '#FFF', border: 'none', padding: 13, borderRadius: 4, fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Verifying Registration with Firebase...' : 'Sign In to Field Officer Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
