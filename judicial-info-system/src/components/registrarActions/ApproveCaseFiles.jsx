import React, { useState } from "react";

export default function ApproveCaseFiles() {
  const [caseId, setCaseId] = useState("");

  const handleApprove = () => {
    alert(`Case files approved for ID: ${caseId}`);
    setCaseId("");
  };

  return (
    <div>
      <h3>Approve Case Files</h3>
      <input
        type="text"
        placeholder="Case ID"
        value={caseId}
        onChange={(e) => setCaseId(e.target.value)}
        style={{ width: "100%", marginBottom: "6px" }}
      />
      <button onClick={handleApprove}>Approve</button>
    </div>
  );
}
