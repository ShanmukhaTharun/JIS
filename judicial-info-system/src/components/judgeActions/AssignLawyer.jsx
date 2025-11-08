import React, { useState } from "react";
import { findCase, updateCase } from "../../data/sampleCases";
import "./JudgeActions.css";

export default function AssignLawyer() {
  const [caseId, setCaseId] = useState("");
  const [lawyer, setLawyer] = useState("");
  const [msg, setMsg] = useState("");

  const handleAssign = (e) => {
    e.preventDefault();
    setMsg("");
    const c = findCase(caseId.trim());
    if (!c) {
      setMsg("Case not found.");
      return;
    }
    c.assignedLawyer = lawyer.trim() || null;
    updateCase(c);
    setMsg(`Assigned ${c.assignedLawyer || "no one"} to ${c.caseId}.`);
  };

  return (
    <div className="ja-panel">
      <h3>👨‍⚖️ Assign Lawyer</h3>
      <form className="ja-form" onSubmit={handleAssign}>
        <input value={caseId} onChange={(e) => setCaseId(e.target.value)} placeholder="Case ID" className="ja-input" />
        <input value={lawyer} onChange={(e) => setLawyer(e.target.value)} placeholder="Lawyer Name (e.g., Adv. K Rao)" className="ja-input" />
        <button className="ja-btn" type="submit">Assign</button>
      </form>
      {msg && <div className="ja-info">{msg}</div>}
    </div>
  );
}
