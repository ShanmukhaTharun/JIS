import React, { useState } from "react";
import { CasesAPI } from "../../services/api";
import { useCases } from "../../context/CasesContext.jsx";
import "./JudgeActions.css";

export default function ScheduleHearing() {
  const { refresh } = useCases();
  const [caseId, setCaseId] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [msg, setMsg] = useState("");

  const handleSchedule = async (e) => {
    e.preventDefault();
    setMsg("");
    const id = caseId.trim();
    if (!date) return setMsg("Please pick a date.");
    try {
  const updated = await CasesAPI.addHearing(id, date);
      setMsg(`Hearing scheduled for ${date} (${updated.id}).`);
  refresh();
    } catch (e) {
      setMsg(e.message);
    }
  };

  return (
    <div className="ja-panel">
      <h3>📅 Schedule Hearing</h3>
      <form className="ja-form" onSubmit={handleSchedule}>
        <input value={caseId} onChange={(e) => setCaseId(e.target.value)} placeholder="Case ID (e.g., C001)" className="ja-input" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="ja-input" />
        <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes (optional)" className="ja-input" />
        <button className="ja-btn" type="submit">Schedule</button>
      </form>
      {msg && <div className="ja-info">{msg}</div>}
    </div>
  );
}
