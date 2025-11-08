import React, { useState } from "react";

export default function SubmitEvidence() {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    alert(`Evidence submitted: ${text}`);
    setText("");
  };

  return (
    <div>
      <h3>Submit Evidence</h3>
      <textarea
        placeholder="Enter evidence details"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        style={{ width: "100%" }}
      />
      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        Submit
      </button>
    </div>
  );
}
