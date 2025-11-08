import React, { useState } from "react";
import { sampleCases } from "../../data/sampleCases";

export default function UpdateCaseInfo() {
  const [caseId, setCaseId] = useState("");
  const [status, setStatus] = useState("");

  const handleUpdate = () => {
    alert(`Case updated:\nID: ${caseId}\nNew Status: ${status}`);
    setCaseId(""); setStatus("");
  };

  return (
    <div>
      <h3>Update Case Information</h3>
      <input
        type="text"
        placeholder="Case ID"
        value={caseId}
        onChange={(e) => setCaseId(e.target.value)}
        style={{ width: "100%", marginBottom: "6px" }}
      />
      <input
        type="text"
        placeholder="New Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ width: "100%" }}
      />
      <button onClick={handleUpdate} style={{ marginTop: "10px" }}>Update</button>
    </div>
  );
}
