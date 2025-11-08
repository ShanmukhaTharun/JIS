import React from "react";
import { sampleCases } from "../../data/sampleCases";

export default function ViewCaseStatus() {
  return (
    <div>
      <h3>View Case Status</h3>
      {sampleCases.map((c) => (
        <div
          key={c.id}
          style={{
            border: "1px dashed #2f3b87",
            padding: "8px",
            borderRadius: "6px",
            marginBottom: "6px",
          }}
        >
          <strong>{c.id}</strong>: {c.accused} — <em>{c.status}</em>
        </div>
      ))}
    </div>
  );
}
