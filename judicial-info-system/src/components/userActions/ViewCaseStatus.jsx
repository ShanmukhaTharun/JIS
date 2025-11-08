import React from "react";
import { sampleCases } from "../../data/sampleCases";

export default function ViewCaseStatus() {
  return (
    <div>
      <h3>All Your Cases</h3>
      {sampleCases.length === 0 ? (
        <p>No cases available.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#0b7d77", color: "#fff" }}>
              <th style={{ padding: "8px", border: "1px solid #ccc" }}>Case ID</th>
              <th style={{ padding: "8px", border: "1px solid #ccc" }}>Title</th>
              <th style={{ padding: "8px", border: "1px solid #ccc" }}>Status</th>
              <th style={{ padding: "8px", border: "1px solid #ccc" }}>Next Hearing</th>
            </tr>
          </thead>
          <tbody>
            {sampleCases.map((c) => (
              <tr key={c.id}>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{c.id}</td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{c.caseTitle}</td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{c.status}</td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  {c.hearingDates.length > 0 ? c.hearingDates[0] : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
