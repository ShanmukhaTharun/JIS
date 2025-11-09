import React, { useState } from "react";
import { useCases } from "../../context/CasesContext.jsx";
import { CasesAPI } from "../../services/api";

export default function ContactLawyer() {
  const [message, setMessage] = useState("");
  const [caseId, setCaseId] = useState("");
  const [msg, setMsg] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
  if (!message || !caseId) return setMsg("Enter case ID and message.");
  await CasesAPI.addMessage(caseId, { from: 'user', text: message });
  setMsg("Message sent to lawyer.");
  setMessage(""); setCaseId("");
  };

  return (
    <div>
      <h3>Contact Your Lawyer</h3>
      <ul>
        {useCases().cases.map((c) => (
          <li key={c.id} style={{ marginBottom: "8px" }}>
            {c.lawyer || 'Unassigned'} - {c.title}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Case ID"
          value={caseId}
          onChange={(e) => setCaseId(e.target.value)}
          style={{ width: "100%", padding: "8px", borderRadius: "6px", marginBottom: "8px" }}
        />
        <textarea
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "100%", minHeight: "80px", padding: "8px", borderRadius: "6px", marginBottom: "8px" }}
        />
        <button type="submit" style={{ padding: "6px 14px", borderRadius: "6px", cursor: "pointer" }}>
          Send
        </button>
        {msg && <div style={{ marginTop: '6px', color: '#0d6b0d' }}>{msg}</div>}
      </form>
    </div>
  );
}
