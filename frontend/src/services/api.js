import { API_BASE } from '../config';

// Helper to get auth headers
export function authHeaders(){
  const token = localStorage.getItem('token');
  return token ? { Authorization: 'Bearer ' + token } : {};
}

// Simple API wrappers
export async function register(email, password){
  const res = await fetch(`${API_BASE}/auth/register`, {
    method:'POST', headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function login(email, password){
  const res = await fetch(`${API_BASE}/auth/login`, {
    method:'POST', headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function uploadFile(file){
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_BASE}/records/upload`, {
    method: 'POST', headers: { ...authHeaders() }, body: form
  });
  return res.json();
}

export async function listRecords(){
  const res = await fetch(`${API_BASE}/records`, { headers: { ...authHeaders() }});
  return res.json();
}

export async function downloadRecord(recordId){
  const res = await fetch(`${API_BASE}/records/download/${recordId}`, { headers: { ...authHeaders() }});
  return res;
}
