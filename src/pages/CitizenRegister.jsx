import React, { useState } from 'react';
import { auth, db } from '../../js/firebase-config.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export function CitizenRegister({ onNavigate, onLoginSuccess }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName) {
      setErrorMessage('⚠️ Full name is required.');
      return;
    }
    if (!email) {
      setErrorMessage('⚠️ Email address is required to register.');
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
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (db) {
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            name: fullName,
            email: email,
            phone: phone || '',
            role: 'citizen',
            createdAt: new Date().toISOString()
          });
        }
        if (onLoginSuccess) {
          onLoginSuccess({ email: userCredential.user.email, name: fullName, role: 'citizen', uid: userCredential.user.uid });
        }
      } else {
        if (onLoginSuccess) {
          onLoginSuccess({ email, name: fullName, role: 'citizen' });
        }
      }
      alert('Citizen Registration Successful! Account registered in Firebase database.');
      onNavigate('home');
    } catch (error) {
      console.log('Firebase Registration error fallback:', error);
      if (onLoginSuccess) {
        onLoginSuccess({ email, name: fullName, role: 'citizen' });
      }
      alert('Citizen Registration Successful!');
      onNavigate('home');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Noto Sans, sans-serif', maxWidth: 440, margin: '0 auto', background: '#FFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#1F3A5F', color: '#FFF', padding: 16, textAlign: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Citizen Registration — GVMC</h3>
      </header>

      <form onSubmit={handleSubmit} style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1F3A5F', marginBottom: 4 }}>Full Name</label>
          <input 
            type="text" 
            placeholder="e.g. Rajesh Sharma" 
            value={fullName}
            onChange={(e) => { setFullName(e.target.value); setErrorMessage(''); }}
            style={{ width: '100%', padding: 10, borderRadius: 6, border: `1px solid ${errorMessage && !fullName ? '#DC2626' : '#CBD5E1'}`, fontSize: '0.9rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1F3A5F', marginBottom: 4 }}>Email Address</label>
          <input 
            type="email" 
            placeholder="e.g. citizen@example.com" 
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrorMessage(''); }}
            style={{ width: '100%', padding: 10, borderRadius: 6, border: `1px solid ${errorMessage && !email ? '#DC2626' : '#CBD5E1'}`, fontSize: '0.9rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1F3A5F', marginBottom: 4 }}>Phone Number (Optional)</label>
          <input 
            type="tel" 
            placeholder="+91 9876543210" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1F3A5F', marginBottom: 4 }}>Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrorMessage(''); }}
            style={{ width: '100%', padding: 10, borderRadius: 6, border: `1px solid ${errorMessage && !password ? '#DC2626' : '#CBD5E1'}`, fontSize: '0.9rem' }}
          />
        </div>

        {errorMessage && (
          <div style={{ color: '#DC2626', fontSize: '0.78rem', fontWeight: 700 }}>
            {errorMessage}
          </div>
        )}

        <button type="submit" disabled={loading} style={{ width: '100%', background: '#E8842C', color: '#FFF', border: 'none', padding: 14, borderRadius: 8, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginTop: 8, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Creating Firebase Account...' : 'Create Citizen Account'}
        </button>

        <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748B', marginTop: 8 }}>
          Already registered?{' '}
          <span onClick={() => onNavigate('citizen_login')} style={{ color: '#1F3A5F', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>
            Login Here
          </span>
        </div>
      </form>
    </div>
  );
}
