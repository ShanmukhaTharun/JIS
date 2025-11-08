import React, { useState } from "react";
import { CasesAPI } from "../../services/api";
import { useCases } from "../../context/CasesContext.jsx";
import "./JudgeActions.css";

export default function AssignLawyer() {
  const { refresh } = useCases();
  const [caseId, setCaseId] = useState("");
  const [lawyer, setLawyer] = useState("");
  const [msg, setMsg] = useState("");

  const handleAssign = async (e) => {
    e.preventDefault();
    setMsg("");
    const id = caseId.trim();
    const name = lawyer.trim();
    try {
  const updated = await CasesAPI.assignLawyer(id, name);
      setMsg(`Assigned ${updated.lawyer || "(cleared)"} to ${updated.id}.`);
  refresh();
    } catch (e) {
      setMsg(e.message);
    }
  };

  return (
    <div className="ja-panel">
      <h3>�‍⚖️ Assign Lawyer</h3>
      <form className="ja-form" onSubmit={handleAssign}>
        <input value={caseId} onChange={(e) => setCaseId(e.target.value)} placeholder="Case ID (e.g., C001)" className="ja-input" />
        <input value={lawyer} onChange={(e) => setLawyer(e.target.value)} placeholder="Lawyer Name" className="ja-input" />
        <button className="ja-btn" type="submit">Assign</button>
      </form>
      {msg && <div className="ja-info">{msg}</div>}
    </div>
  );
}
