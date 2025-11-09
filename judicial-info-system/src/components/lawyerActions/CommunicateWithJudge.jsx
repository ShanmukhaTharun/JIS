import React, { useState } from "react";
import { sampleCases, findCase, updateCase } from "../../data/sampleCases";

export default function CommunicateWithJudge() {
  const [selectedCase, setSelectedCase] = useState(sampleCases[0].id);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const m = message.trim();
    if (!m) return;
    const c = findCase(selectedCase);
    if (c) {
      const messages = Array.isArray(c.messages) ? [...c.messages] : [];
      messages.push({ from: "lawyer", text: m, at: new Date().toISOString() });
      updateCase(selectedCase, { messages });
    }
    alert(`Message sent to Judge for case ${selectedCase}.`);
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
