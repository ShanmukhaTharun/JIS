import React, { useState } from "react";
import { sampleCases } from "../../data/sampleCases";

export default function CommunicateWithJudge() {
  const [selectedCase, setSelectedCase] = useState(sampleCases[0].id);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    alert(`Message sent to Judge for case ${selectedCase}: ${message}`);
    setMessage("");
  };

  return (
    <div>
      <h3>Communicate with Judge</h3>
      <select value={selectedCase} onChange={(e) => setSelectedCase(e.target.value)}>
        {sampleCases.map((c) => (
          <option key={c.id} value={c.id}>
            {c.id} — {c.title}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Type message to Judge..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send Message</button>
    </div>
  );
}
