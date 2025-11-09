import React from "react";
import { useCases } from "../../context/CasesContext.jsx";

export default function DownloadCaseReports() {
  return (
    <div>
      <h3>Download Case Reports</h3>
      <ul>
        {useCases().cases.map((c) => (
          <li key={c.id} style={{ marginBottom: "8px" }}>
            {c.title} -{" "}
            <button
              style={{ padding: "4px 8px", borderRadius: "4px", cursor: "pointer" }}
              disabled={!c.reports || c.reports.length === 0}
              onClick={() => alert(`Downloading latest report for ${c.title}`)}
            >
              Download PDF
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
