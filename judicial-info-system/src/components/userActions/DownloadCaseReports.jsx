import React from "react";
import { sampleCases } from "../../data/sampleCases";

export default function DownloadCaseReports() {
  return (
    <div>
      <h3>Download Case Reports</h3>
      <ul>
        {sampleCases.map((c) => (
          <li key={c.id} style={{ marginBottom: "8px" }}>
            {c.caseTitle} -{" "}
            <button
              style={{ padding: "4px 8px", borderRadius: "4px", cursor: "pointer" }}
              onClick={() => alert(`Downloading report for ${c.caseTitle}`)}
            >
              Download PDF
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
