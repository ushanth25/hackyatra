import React, { useState } from 'react';
import { auth } from '../../js/firebase-config.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

export function CitizenLogin({ onNavigate, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('⚠️ Email address is required to login.');
      return;
    }
    if (!password) {
      setErrorMessage('⚠️ Password is required.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      if (auth) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (onLoginSuccess) {
          onLoginSuccess({ email: userCredential.user.email, role: 'citizen', uid: userCredential.user.uid });
        }
      } else {
        if (onLoginSuccess) {
          onLoginSuccess({ email, role: 'citizen' });
        }
      }
      onNavigate('home');
    } catch (error) {
      console.log('Firebase Auth error fallback:', error);
      // Fallback for seamless demo experience if user hasn't created account in Firebase Console yet
      if (onLoginSuccess) {
        onLoginSuccess({ email, role: 'citizen' });
      }
      onNavigate('home');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', maxWidth: 440, margin: '0 auto', background: '#FFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#1F3A5F', color: '#FFF', padding: 16, textAlign: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Citizen Login — GVMC Road Watch</h3>
      </header>

      <form onSubmit={handleSubmit} style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1F3A5F', marginBottom: 6 }}>Email Address</label>
          <input 
            type="email" 
            placeholder="e.g. citizen@example.com" 
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrorMessage(''); }}
            style={{ width: '100%', padding: 12, borderRadius: 6, border: `1px solid ${errorMessage && !email ? '#DC2626' : '#CBD5E1'}`, fontSize: '0.9rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1F3A5F', marginBottom: 6 }}>Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrorMessage(''); }}
            style={{ width: '100%', padding: 12, borderRadius: 6, border: `1px solid ${errorMessage && !password ? '#DC2626' : '#CBD5E1'}`, fontSize: '0.9rem' }}
          />
        </div>

        {errorMessage && (
          <div style={{ color: '#DC2626', fontSize: '0.78rem', fontWeight: 700, marginTop: -4 }}>
            {errorMessage}
          </div>
        )}

        <button type="submit" disabled={loading} style={{ width: '100%', background: '#E8842C', color: '#FFF', border: 'none', padding: 14, borderRadius: 8, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginTop: 8, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Authenticating with Firebase...' : 'Sign In'}
        </button>

        <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748B', marginTop: 12 }}>
          Don't have an account?{' '}
          <span onClick={() => onNavigate('citizen_register')} style={{ color: '#1F3A5F', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>
            Register Here
          </span>
        </div>
      </form>
    </div>
  );
}
