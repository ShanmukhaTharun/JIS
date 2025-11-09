import React, { useState } from "react";
import { CasesAPI } from "../../services/api";
import { useCases } from "../../context/CasesContext.jsx";

export default function UpdateCaseInfo() {
  const [caseIdInput, setCaseIdInput] = useState("");
  const [caseData, setCaseData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { refresh } = useCases();

  const loadCase = async () => {
    setError(""); setMsg("");
    if (!caseIdInput.trim()) { setError("Enter a Case ID"); return; }
    try {
      setLoading(true);
      const data = await CasesAPI.get(caseIdInput.trim());
      setCaseData(data);
      setEditing(false);
    } catch (e) { setError(e.message || 'Failed to load case'); setCaseData(null); }
    finally { setLoading(false); }
  };

  const startEdit = () => { if (caseData) { setEditing(true); setMsg(""); } };

  const handleFieldChange = (field, value) => {
    setCaseData(c => ({ ...c, [field]: value }));
  };

  const handleSave = async () => {
    if (!caseData) return;
    setLoading(true); setError(""); setMsg("");
    try {
  const editableFields = ["title","type","court","judge","lawyer","status","description"];
      const payload = {};
      editableFields.forEach(f => { if (caseData[f] !== undefined) payload[f] = caseData[f]; });
  // hint backend for activity logging
  payload.updatedByRole = 'Registrar';
      const updated = await CasesAPI.update(caseData.id, payload);
      setMsg(`Case ${updated.id} updated successfully.`);
      setEditing(false);
      refresh();
    } catch (e) { setError(e.message || 'Update failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="ja-panel">
      <h3>Update Case Information</h3>
      <div className="ja-form" style={{ maxWidth: 840 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input
            className="ja-input"
            placeholder="Enter Case ID (e.g., C001)"
            value={caseIdInput}
            onChange={(e) => setCaseIdInput(e.target.value)}
            disabled={loading}
          />
          <button type="button" className="ja-btn" onClick={loadCase} disabled={loading}>{loading ? 'Loading...' : 'Load Case'}</button>
        </div>
        {error && <div className="ja-error">{error}</div>}
        {caseData && !editing && (
          <div className="case-card">
            <h4 style={{ marginTop:0 }}>{caseData.title || '(Untitled Case)'} <span style={{ fontWeight:'normal', color:'#555' }}>({caseData.id})</span></h4>
            <p style={{ margin:'4px 0' }}><strong>Status:</strong> {caseData.status || '-'}</p>
            <p style={{ margin:'4px 0' }}><strong>Type:</strong> {caseData.type || '-'}</p>
            <p style={{ margin:'4px 0' }}><strong>Court:</strong> {caseData.court || '-'}</p>
            <p style={{ margin:'4px 0' }}><strong>Judge:</strong> {caseData.judge || '-'}</p>
            <p style={{ margin:'4px 0' }}><strong>Lawyer:</strong> {caseData.lawyer || '-'}</p>
            <p style={{ margin:'4px 0' }}><strong>Description:</strong> {caseData.description || '-'}</p>
            <p style={{ margin:'4px 0' }}><strong>Accused:</strong> {(caseData.accused || []).join(', ') || '-'}</p>
            <p style={{ margin:'4px 0' }}><strong>Hearing Dates:</strong> {(caseData.hearingDates || []).join(', ') || '-'}</p>
            <div style={{ marginTop:12 }}>
              <button type="button" className="ja-btn" onClick={startEdit}>Edit Fields</button>
            </div>
          </div>
        )}
        {caseData && editing && (
          <div className="case-card" style={{ background:'#fffaf8' }}>
            <h4 style={{ marginTop:0 }}>Editing {caseData.id}</h4>
            <input className="ja-input" value={caseData.title || ''} onChange={e=>handleFieldChange('title', e.target.value)} placeholder="Title" />
            <input className="ja-input" value={caseData.type || ''} onChange={e=>handleFieldChange('type', e.target.value)} placeholder="Type" />
            <input className="ja-input" value={caseData.court || ''} onChange={e=>handleFieldChange('court', e.target.value)} placeholder="Court" />
            <input className="ja-input" value={caseData.judge || ''} onChange={e=>handleFieldChange('judge', e.target.value)} placeholder="Judge" />
            <input className="ja-input" value={caseData.lawyer || ''} onChange={e=>handleFieldChange('lawyer', e.target.value)} placeholder="Lawyer" />
            <select className="ja-input" value={caseData.status || ''} onChange={e=>handleFieldChange('status', e.target.value)}>
              {['Pending','Approved','Adjourned','In Progress','Closed','Rejected'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <textarea className="ja-textarea" value={caseData.description || ''} onChange={e=>handleFieldChange('description', e.target.value)} placeholder="Description" />
            <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginTop:4 }}>
              <button type="button" className="ja-btn" onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</button>
              <button type="button" className="ja-btn" style={{ background:'#555' }} onClick={()=>{ setEditing(false); setMsg('Edit cancelled'); }}>Cancel</button>
            </div>
          </div>
        )}
        {msg && <div className="ja-info">{msg}</div>}
      </div>
    </div>
  );
}
