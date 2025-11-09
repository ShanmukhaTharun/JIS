import React, { useState } from "react";
import { CasesAPI } from "../../services/api";
import { useCases } from "../../context/CasesContext.jsx";
import "./JudgeActions.css";

export default function ReviewEvidence() {
  const { refresh } = useCases();
  const [caseId, setCaseId] = useState("");
  const [fileName, setFileName] = useState("");
  const [msg, setMsg] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    setMsg("");
    const id = caseId.trim();
    const name = fileName.trim() || "Unnamed";
    try {
  const evidenceItem = await CasesAPI.addEvidence(id, name);
      setMsg(`Evidence '${evidenceItem.name}' added to ${id}.`);
      setFileName("");
  refresh();
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="ja-panel">
      <h3>📁 Review / Upload Evidence</h3>
      <form className="ja-form" onSubmit={handleUpload}>
        <input value={caseId} onChange={(e) => setCaseId(e.target.value)} placeholder="Case ID (e.g., C001)" className="ja-input" />
        <input value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="Evidence name" className="ja-input" />
        <button className="ja-btn" type="submit">Add Evidence</button>
      </form>
      {msg && <div className="ja-info">{msg}</div>}
    </div>
  );
}
