import React, { useState } from "react";
import { CasesAPI } from "../../services/api";

export default function SubmitRequest() {
  const [request, setRequest] = useState("");
  const [caseId, setCaseId] = useState("");
  const [msg, setMsg] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();
  if (!request || !caseId) return setMsg("Enter case ID and request.");
  await CasesAPI.addMessage(caseId, { from: 'user', text: request });
  setMsg("Request submitted.");
  setRequest(""); setCaseId("");
  };

  return (
    <div>
      <h3>Submit Request</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Case ID"
          value={caseId}
          onChange={(e) => setCaseId(e.target.value)}
          style={{ width: "100%", padding: "8px", borderRadius: "6px", marginBottom: "8px" }}
        />
        <textarea
          placeholder="Type your request..."
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          style={{ width: "100%", minHeight: "100px", padding: "8px", borderRadius: "6px", marginBottom: "8px" }}
        />
        <button type="submit" style={{ padding: "6px 14px", borderRadius: "6px", cursor: "pointer" }}>
          Submit
        </button>
        {msg && <div style={{ marginTop: '6px', color: '#0d6b0d' }}>{msg}</div>}
      </form>
    </div>
  );
}
