import React from "react";
import { sampleCases } from "../../data/sampleCases";

export default function ViewAssignedCases() {
  // Filter cases assigned to a lawyer (mock: all for simplicity)
  const assignedCases = sampleCases;

  return (
    <div>
      <h3>Assigned Cases</h3>
      <ul>
        {assignedCases.map((c) => (
          <li key={c.id}>
            <b>{c.id}</b> — {c.title} | Hearing: {c.hearingDate} | Status: {c.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
