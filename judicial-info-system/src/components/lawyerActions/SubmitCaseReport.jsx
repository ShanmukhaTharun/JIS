import React, { useState } from "react";
import { sampleCases, submitCaseReport } from "../../data/sampleCases";

export default function SubmitCaseReport() {
  const [selectedCase, setSelectedCase] = useState(sampleCases[0].id);
  const [report, setReport] = useState("");

  const handleSubmit = () => {
    if (!report.trim()) return;
    submitCaseReport(selectedCase, report.trim());
    alert(`Report submitted for ${selectedCase}.`);
    setReport("");
  };

  return (
    <div>
      <h3>Submit Case Report</h3>
      <select value={selectedCase} onChange={(e) => setSelectedCase(e.target.value)}>
        {sampleCases.map((c) => (
          <option key={c.id} value={c.id}>
            {c.id} — {c.title}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Write your report here..."
        value={report}
        onChange={(e) => setReport(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit Report</button>
    </div>
  );
}
