import React, { useState } from "react";

export default function SubmitRequest() {
  const [request, setRequest] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!request) return alert("Please type a request!");
    alert(`Request submitted: ${request}`);
    setRequest("");
  };

  return (
    <div>
      <h3>Submit Request</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Type your request..."
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          style={{ width: "100%", minHeight: "100px", padding: "8px", borderRadius: "6px", marginBottom: "8px" }}
        />
        <button type="submit" style={{ padding: "6px 14px", borderRadius: "6px", cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </div>
  );
}
