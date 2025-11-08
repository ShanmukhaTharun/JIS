import React, { useState } from "react";
import { findCase, updateCase } from "../../data/sampleCases";
import "./JudgeActions.css";

export default function DeliverJudgement() {
  const [caseId, setCaseId] = useState("");
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");

  const handleDeliver = (e) => {
    e.preventDefault();
    setMsg("");
    const c = findCase(caseId.trim());
    if (!c) return setMsg("Case not found.");
    c.judgement = text;
    c.status = "Resolved";
    updateCase(c);
    setMsg(`Judgement recorded for ${c.caseId}.`);
  };

  return (
    <div className="ja-panel">
      <h3>⚖️ Deliver Judgement</h3>
      <form className="ja-form" onSubmit={handleDeliver}>
        <input value={caseId} onChange={(e) => setCaseId(e.target.value)} placeholder="Case ID" className="ja-input" />
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write judgement summary..." className="ja-textarea" />
        <button className="ja-btn" type="submit">Record Judgement</button>
      </form>
      {msg && <div className="ja-info">{msg}</div>}
    </div>
  );
}
