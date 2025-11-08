import React, { useState } from "react";
import { sampleCases } from "../../data/sampleCases";

export default function RequestCaseDetails() {
  const [caseId, setCaseId] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const found = sampleCases.find((c) => c.id.toLowerCase() === caseId.toLowerCase());
    setResult(found || "Case not found.");
  };

  return (
    <div>
      <h3>Request Case Details</h3>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter Case ID"
          value={caseId}
          onChange={(e) => setCaseId(e.target.value)}
          style={{ padding: "6px 8px", borderRadius: "6px", marginRight: "8px" }}
        />
        <button type="submit" style={{ padding: "6px 14px", borderRadius: "6px", cursor: "pointer" }}>
          Search
        </button>
      </form>
      {result && (
        <div style={{ marginTop: "12px", padding: "10px", border: "1px dashed #0b7d77", borderRadius: "6px" }}>
          {typeof result === "string" ? (
            <p>{result}</p>
          ) : (
            <>
              <p><strong>Case ID:</strong> {result.id}</p>
              <p><strong>Title:</strong> {result.caseTitle}</p>
              <p><strong>Type:</strong> {result.caseType}</p>
              <p><strong>Status:</strong> {result.status}</p>
              <p><strong>Assigned Lawyer:</strong> {result.assignedLawyer}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
