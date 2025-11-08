import React, { useState } from "react";

export default function ManageCourtSchedule() {
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");

  const handleSchedule = () => {
    alert(`Court schedule added:\nDate: ${date}\nDetails: ${details}`);
    setDate(""); setDetails("");
  };

  return (
    <div>
      <h3>Manage Court Schedule</h3>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ width: "100%", marginBottom: "6px" }}
      />
      <textarea
        placeholder="Schedule Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        rows={3}
        style={{ width: "100%" }}
      />
      <button onClick={handleSchedule} style={{ marginTop: "10px" }}>Add Schedule</button>
    </div>
  );
}
