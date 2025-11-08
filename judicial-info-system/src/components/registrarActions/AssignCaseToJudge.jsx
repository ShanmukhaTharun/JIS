import React, { useState } from "react";

export default function AssignCaseToJudge() {
  const [caseId, setCaseId] = useState("");
  const [judgeName, setJudgeName] = useState("");

  const handleAssign = () => {
    alert(`Case ${caseId} assigned to Judge ${judgeName}`);
    setCaseId(""); setJudgeName("");
  };

  return (
    <div>
      <h3>Assign Case to Judge</h3>
      <input
        type="text"
        placeholder="Case ID"
        value={caseId}
        onChange={(e) => setCaseId(e.target.value)}
        style={{ width: "100%", marginBottom: "6px" }}
      />
      <input
        type="text"
        placeholder="Judge Name"
        value={judgeName}
        onChange={(e) => setJudgeName(e.target.value)}
        style={{ width: "100%" }}
      />
      <button onClick={handleAssign} style={{ marginTop: "10px" }}>Assign</button>
    </div>
  );
}
