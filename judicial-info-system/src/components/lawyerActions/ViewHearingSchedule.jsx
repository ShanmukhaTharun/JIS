import React from "react";
import { useCases } from "../../context/CasesContext.jsx";

export default function ViewHearingSchedule() {
  return (
    <div>
      <h3>Hearing Schedule</h3>
      <ul>
  {useCases().cases.map((c) => {
          const dates = Array.isArray(c.hearingDates) ? c.hearingDates : [];
          return (
            <li key={c.id}>
              {c.id} — {c.title} | {dates.length ? `Next: ${dates[0]}` : "No hearings"}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
