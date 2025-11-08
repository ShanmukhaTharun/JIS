import React from "react";
import { sampleCases } from "../../data/sampleCases";

export default function ViewHearingSchedule() {
  return (
    <div>
      <h3>Hearing Schedule</h3>
      <ul>
        {sampleCases.map((c) => (
          <li key={c.id}>
            {c.id} — {c.title} | Hearing Date: {c.hearingDate} | Courtroom: {c.courtroom}
          </li>
        ))}
      </ul>
    </div>
  );
}
