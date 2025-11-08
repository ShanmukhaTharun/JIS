import React, { useState } from "react";
import { findCase, updateCase } from "../../data/sampleCases";
import "./JudgeActions.css";

export default function ReviewEvidence() {
  const [caseId, setCaseId] = useState("");
  const [fileName, setFileName] = useState("");
  const [msg, setMsg] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();
    setMsg("");
    const c = findCase(caseId.trim());
    if (!c) return setMsg("Case not found.");
    const newEvidence = { id: `E${Date.now()}`, name: fileName || "Unnamed", uploadedAt: new Date().toISOString().slice(0,10) };
    c.evidence = c.evidence || [];
    c.evidence.push(newEvidence);
    updateCase(c);
    setMsg(`Evidence ${newEvidence.name} added to ${c.caseId}.`);
  };

  return (
    <div className="ja-panel">
      <h3>📁 Review / Upload Evidence</h3>
      <form className="ja-form" onSubmit={handleUpload}>
        <input value={caseId} onChange={(e) => setCaseId(e.target.value)} placeholder="Case ID" className="ja-input" />
        <input value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="Evidence name (simulate)" className="ja-input" />
        <button className="ja-btn" type="submit">Add Evidence</button>
      </form>
      {msg && <div className="ja-info">{msg}</div>}
    </div>
  );
}
