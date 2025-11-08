import React, { useState } from "react";
import { submitEvidence } from "../../data/sampleCases";

export default function SubmitEvidence() {
  const [text, setText] = useState("");

  const [caseId, setCaseId] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = () => {
    const id = caseId.trim();
    const t = text.trim();
    if (!id || !t) return setMsg("Provide case ID and evidence details.");
    submitEvidence(id, t);
    setMsg("Evidence submitted.");
    setText("");
  };

  return (
    <div>
      <h3>Submit Evidence</h3>
      <input
        type="text"
        placeholder="Case ID"
        value={caseId}
        onChange={(e) => setCaseId(e.target.value)}
        style={{ width: "100%", marginBottom: "6px" }}
      />
      <textarea
        placeholder="Enter evidence details"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        style={{ width: "100%" }}
      />
      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        Submit
      </button>
      {msg && <div style={{ marginTop: "8px", color: "#0d6b0d" }}>{msg}</div>}
    </div>
  );
}
