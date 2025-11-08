import React, { useState } from "react";
import { findCase, updateCase } from "../../data/sampleCases";
import "./JudgeActions.css";

export default function ScheduleHearing() {
  const [caseId, setCaseId] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [msg, setMsg] = useState("");

  const handleSchedule = (e) => {
    e.preventDefault();
    setMsg("");
    const c = findCase(caseId.trim());
    if (!c) return setMsg("Case not found.");
    c.hearings = c.hearings || [];
    c.hearings.push({ date, notes: notes || "Scheduled by Judge" });
    updateCase(c);
    setMsg(`Hearing scheduled for ${date} (${c.caseId}).`);
  };

  return (
    <div className="ja-panel">
      <h3>📅 Schedule Hearing</h3>
      <form className="ja-form" onSubmit={handleSchedule}>
        <input value={caseId} onChange={(e) => setCaseId(e.target.value)} placeholder="Case ID" className="ja-input" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="ja-input" />
        <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes (optional)" className="ja-input" />
        <button className="ja-btn" type="submit">Schedule</button>
      </form>
      {msg && <div className="ja-info">{msg}</div>}
    </div>
  );
}
