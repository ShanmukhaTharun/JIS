import React, { useState } from "react";

export default function RegisterFIR() {
  const [firNumber, setFirNumber] = useState("");
  const [accused, setAccused] = useState("");

  const handleRegister = () => {
    alert(`FIR Registered\nFIR#: ${firNumber}\nAccused: ${accused}`);
    setFirNumber(""); setAccused("");
  };

  return (
    <div>
      <h3>Register FIR / Case</h3>
      <input
        type="text"
        placeholder="FIR Number"
        value={firNumber}
        onChange={(e) => setFirNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Accused Name"
        value={accused}
        onChange={(e) => setAccused(e.target.value)}
        style={{ marginTop: "5px" }}
      />
      <button onClick={handleRegister} style={{ marginTop: "10px" }}>
        Register
      </button>
    </div>
  );
}
