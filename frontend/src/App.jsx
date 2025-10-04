import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Upload from './pages/Upload';
import { API_BASE } from './config';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {

    if (token) {
      // could call an auth-check endpoint to validate token
      // fetch(`${API_BASE}/auth/check`, { headers: { Authorization: 'Bearer ' + token }})
      //   .then(r => { if (!r.ok) { localStorage.removeItem('token'); setToken(null); } })
      //   .catch(()=>{});
    }
  }, [token]);

  return (
    <div className="container">
      <header>
        <h1>Health Vault — Demo</h1>
        <p className="subtitle">Prototype: encrypted records → IPFS → pointer on ledger</p>
      </header>

      <main>
        {token ? (
          <Upload onLogout={() => { localStorage.removeItem('token'); setToken(null); }} />
        ) : (
          <Login onLogin={(t) => { localStorage.setItem('token', t); setToken(t); }} />
        )}
      </main>

      <footer>
        <small>Demo — do not use with real PHI until secure KMS/Compliance is implemented.</small>
      </footer>
    </div>
  );
}
