import React from "react";
import { useCases } from "../../context/CasesContext.jsx";

export default function ViewAssignedCases() {
  // Filter cases assigned to a lawyer (mock: all for simplicity)
  const { cases, loading, error } = useCases();
  const assignedCases = cases; // future filter by lawyer

  return (
    <div>
  <h3>Assigned Cases</h3>
  {loading && <p>Loading...</p>}
  {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {assignedCases.map((c) => (
          <li key={c.id}>
            <b>{c.id}</b> — {c.title} | Next Hearing: {Array.isArray(c.hearingDates) && c.hearingDates.length ? c.hearingDates[0] : "—"} | Status: {c.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
