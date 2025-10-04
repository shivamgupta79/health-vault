import React, { useState, useEffect } from 'react';
import { uploadFile, listRecords, downloadRecord } from '../services/api';

export default function Upload({ onLogout }){
  const [file, setFile] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  async function doUpload(e){
    e.preventDefault();
    if(!file) return alert('Select a file first');
    setLoading(true);
    const res = await uploadFile(file);
    setLoading(false);
    if(res.ok) {
      alert('Uploaded. CID: ' + res.cid);
      fetchRecords();
    } else {
      alert('Upload failed: ' + (res.error || JSON.stringify(res)));
    }
  }

  async function fetchRecords(){
    const data = await listRecords();
    setRecords(Array.isArray(data) ? data : []);
  }

  async function handleDownload(id, name){
    const res = await downloadRecord(id);
    if(!res.ok){ alert('Download failed'); return; }
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name || 'record.bin';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  useEffect(()=>{ fetchRecords(); }, []);

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2>Upload record</h2>
        <div>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>

      <form onSubmit={doUpload} style={{maxWidth:600}}>
        <input type="file" onChange={e=>setFile(e.target.files?.[0])} />
        <button type="submit" style={{marginTop:8}}>{loading ? 'Uploading...' : 'Upload'}</button>
      </form>

      <section className="record-list">
        <h3>Your records</h3>
        {records.length === 0 && <p>No records yet.</p>}
        {records.map(r => (
          <div className="record-item" key={r._id}>
            <div>
              <strong>{r.metadata?.originalName || r.cid}</strong>
              <div style={{color:'#6b7280', fontSize:13}}>{r.cid}</div>
            </div>
            <div>
              <button onClick={()=>handleDownload(r._id, r.metadata?.originalName)}>Download</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
