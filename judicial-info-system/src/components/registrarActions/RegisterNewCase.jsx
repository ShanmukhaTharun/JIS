import React, { useState } from "react";

export default function RegisterNewCase() {
  const [caseTitle, setCaseTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleRegister = () => {
    alert(`New case registered:\nTitle: ${caseTitle}\nDescription: ${description}`);
    setCaseTitle(""); setDescription("");
  };

  return (
    <div>
      <h3>Register New Case</h3>
      <input
        type="text"
        placeholder="Case Title"
        value={caseTitle}
        onChange={(e) => setCaseTitle(e.target.value)}
        style={{ width: "100%", marginBottom: "6px" }}
      />
      <textarea
        placeholder="Case Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        style={{ width: "100%" }}
      />
      <button onClick={handleRegister} style={{ marginTop: "10px" }}>Register</button>
    </div>
  );
}
