import React, { useState } from "react";
import { sampleCases } from "../../data/sampleCases";

export default function SearchByCaseID() {
  const [caseId, setCaseId] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    const found = sampleCases.find((c) => c.id === caseId);
    setResult(found || "No case found.");
  };

  return (
    <div>
      <h3>Search by Case ID</h3>
      <input
        type="text"
        placeholder="Enter Case ID"
        value={caseId}
        onChange={(e) => setCaseId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {result && (
        <div style={{ marginTop: "10px" }}>
          {typeof result === "string" ? (
            <p>{result}</p>
          ) : (
            <pre>{JSON.stringify(result, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
}
