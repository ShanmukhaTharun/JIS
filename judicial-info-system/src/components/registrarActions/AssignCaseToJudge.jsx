import React, { useState } from "react";
import { CasesAPI } from "../../services/api";
import { useCases } from "../../context/CasesContext.jsx";

export default function AssignCaseToJudge() {
  const [caseId, setCaseId] = useState("");
  const [judgeName, setJudgeName] = useState("");

  const { refresh } = useCases();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAssign = async () => {
    if (!caseId || !judgeName) return;
    try {
      setLoading(true); setMsg("");
      const updated = await CasesAPI.update(caseId, { judge: judgeName });
      setMsg(`Assigned judge ${updated.judge} to ${updated.id}`);
      setCaseId(""); setJudgeName("");
      refresh();
    } catch (e) { setMsg(e.message); } finally { setLoading(false); }
  };

  return (
    <div>
      <h3>Assign Case to Judge</h3>
      <input
        type="text"
        placeholder="Case ID"
        value={caseId}
        onChange={(e) => setCaseId(e.target.value)}
        style={{ width: "100%", marginBottom: "6px" }}
      />
      <input
        type="text"
        placeholder="Judge Name"
        value={judgeName}
        onChange={(e) => setJudgeName(e.target.value)}
        style={{ width: "100%" }}
      />
  <button onClick={handleAssign} style={{ marginTop: "10px" }} disabled={loading}>{loading ? 'Assigning...' : 'Assign'}</button>
  {msg && <div style={{ marginTop: '6px', color: '#0d6b0d' }}>{msg}</div>}
    </div>
  );
}
