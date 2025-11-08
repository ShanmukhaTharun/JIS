import React, { useState } from "react";
import { CasesAPI } from "../../services/api";
import { useCases } from "../../context/CasesContext.jsx";

export default function ManageCourtSchedule() {
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");

  const { refresh } = useCases();
  const [caseId, setCaseId] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSchedule = async () => {
    if (!caseId || !date) return;
    try {
      setLoading(true); setMsg("");
      await CasesAPI.addHearing(caseId, date);
      setMsg(`Added hearing date ${date} to ${caseId}`);
      setDate(""); setDetails(""); setCaseId("");
      refresh();
    } catch (e) { setMsg(e.message); } finally { setLoading(false); }
  };

  return (
    <div>
      <h3>Manage Court Schedule</h3>
  <input type="text" placeholder="Case ID" value={caseId} onChange={(e) => setCaseId(e.target.value)} style={{ width:'100%', marginBottom:'6px' }} />
  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: "100%", marginBottom: "6px" }} />
      <textarea
        placeholder="Schedule Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        rows={3}
        style={{ width: "100%" }}
      />
  <button onClick={handleSchedule} style={{ marginTop: "10px" }} disabled={loading}>{loading ? 'Saving...' : 'Add Schedule'}</button>
  {msg && <div style={{ marginTop: '6px', color:'#0d6b0d' }}>{msg}</div>}
    </div>
  );
}
