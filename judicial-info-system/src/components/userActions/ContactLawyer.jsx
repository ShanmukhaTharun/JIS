import React, { useState } from "react";
import { sampleCases } from "../../data/sampleCases";

export default function ContactLawyer() {
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!message) return alert("Type a message first!");
    alert(`Message sent: ${message}`);
    setMessage("");
  };

  return (
    <div>
      <h3>Contact Your Lawyer</h3>
      <ul>
        {sampleCases.map((c) => (
          <li key={c.id} style={{ marginBottom: "8px" }}>
            {c.assignedLawyer} - {c.caseTitle}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSend}>
        <textarea
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "100%", minHeight: "80px", padding: "8px", borderRadius: "6px", marginBottom: "8px" }}
        />
        <button type="submit" style={{ padding: "6px 14px", borderRadius: "6px", cursor: "pointer" }}>
          Send
        </button>
      </form>
    </div>
  );
}
