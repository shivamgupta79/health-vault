import React, { useState } from 'react';
import { register, login } from '../services/api';

export default function Login({ onLogin }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister(e){
    e.preventDefault();
    try {
      const r = await register(email, password);
      alert('Registered (demo). Now login.');
    } catch(err){
      console.error(err);
      alert('Register failed');
    }
  }

  async function handleLogin(e){
    e.preventDefault();
    try {
      const j = await login(email, password);
      if(j.token){
        onLogin(j.token);
      } else {
        alert('Login failed');
      }
    } catch(err){
      console.error(err);
      alert('Login failed');
    }
  }

  return (
    <div style={{maxWidth:420}}>
      <h2>Sign in</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} type="text" />
        <input placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" />
        <div style={{marginTop:8}}>
          <button type="submit">Login</button>
          <button type="button" className="secondary" onClick={handleRegister}>Register</button>
        </div>
      </form>
    </div>
  );
}
