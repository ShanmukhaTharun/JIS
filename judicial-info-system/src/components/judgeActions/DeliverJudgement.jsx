import React, { useState } from "react";
import { CasesAPI } from "../../services/api";
import { useCases } from "../../context/CasesContext.jsx";
import "./JudgeActions.css";

export default function DeliverJudgement() {
  const { refresh } = useCases();
  const [caseId, setCaseId] = useState("");
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");

  const handleDeliver = async (e) => {
    e.preventDefault();
    setMsg("");
    const id = caseId.trim();
    try {
  const updated = await CasesAPI.deliverJudgement(id, text.trim());
      setMsg(`Judgement recorded for ${updated.id}.`);
      setText("");
  refresh();
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="ja-panel">
      <h3>⚖️ Deliver Judgement</h3>
      <form className="ja-form" onSubmit={handleDeliver}>
        <input value={caseId} onChange={(e) => setCaseId(e.target.value)} placeholder="Case ID (e.g., C001)" className="ja-input" />
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write judgement summary..." className="ja-textarea" />
        <button className="ja-btn" type="submit">Record Judgement</button>
      </form>
      {msg && <div className="ja-info">{msg}</div>}
    </div>
  );
}
