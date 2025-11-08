import React, { useState } from "react";
import { CasesAPI } from "../../services/api";
import { useCases } from "../../context/CasesContext.jsx";

export default function UpdateCaseInfo() {
  const [caseId, setCaseId] = useState("");
  const [status, setStatus] = useState("");
  const [lawyer, setLawyer] = useState("");

  const { refresh } = useCases();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const handleUpdate = async () => {
    if (!caseId || (!status && !lawyer)) return;
    try {
      setLoading(true); setMsg("");
      const payload = {};
      if (status) payload.status = status;
      if (lawyer) payload.lawyer = lawyer;
      const updated = await CasesAPI.update(caseId, payload);
      setMsg(`Updated ${updated.id}${status ? ` status -> ${updated.status}` : ''}${lawyer ? ` lawyer -> ${updated.lawyer}` : ''}`);
      setCaseId(""); setStatus(""); setLawyer("");
      refresh();
    } catch (e) { setMsg(e.message); } finally { setLoading(false); }
  };

  return (
    <div>
      <h3>Update Case Information</h3>
      <input
        type="text"
        placeholder="Case ID"
        value={caseId}
        onChange={(e) => setCaseId(e.target.value)}
        style={{ width: "100%", marginBottom: "6px" }}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ width: '100%', marginBottom: '6px' }}
      >
        <option value="">Select New Status (optional)</option>
        {['Pending','Approved','Adjourned','In Progress','Closed','Rejected'].map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <input
        type="text"
        placeholder="Assign/Edit Lawyer (optional)"
        value={lawyer}
        onChange={(e) => setLawyer(e.target.value)}
        style={{ width: '100%' }}
      />
  <button onClick={handleUpdate} style={{ marginTop: "10px" }} disabled={loading}>{loading ? 'Updating...' : 'Update'}</button>
  {msg && <div style={{ marginTop: '6px', color: '#0d6b0d' }}>{msg}</div>}
    </div>
  );
}
