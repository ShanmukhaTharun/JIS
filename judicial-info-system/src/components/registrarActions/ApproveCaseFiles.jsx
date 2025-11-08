import React, { useState } from "react";
import { CasesAPI } from "../../services/api";
import { useCases } from "../../context/CasesContext.jsx";

export default function ApproveCaseFiles() {
  const [caseId, setCaseId] = useState("");

  const { refresh } = useCases();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const handleApprove = async () => {
    if (!caseId) return;
    try {
      setLoading(true); setMsg("");
      const updated = await CasesAPI.update(caseId, { status: 'Approved' });
      setMsg(`Approved case ${updated.id}`);
      setCaseId("");
      refresh();
    } catch (e) { setMsg(e.message); } finally { setLoading(false); }
  };

  return (
    <div>
      <h3>Approve Case Files</h3>
      <input
        type="text"
        placeholder="Case ID"
        value={caseId}
        onChange={(e) => setCaseId(e.target.value)}
        style={{ width: "100%", marginBottom: "6px" }}
      />
  <button onClick={handleApprove} disabled={loading}>{loading ? 'Approving...' : 'Approve'}</button>
  {msg && <div style={{ marginTop: '6px', color: '#0d6b0d' }}>{msg}</div>}
    </div>
  );
}
