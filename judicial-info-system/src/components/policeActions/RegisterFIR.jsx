import React, { useState } from "react";
import { registerFIR } from "../../data/sampleCases";

export default function RegisterFIR() {
  const [firNumber, setFirNumber] = useState("");
  const [accused, setAccused] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = () => {
    const num = firNumber.trim();
    const acc = accused.trim();
    if (!num || !acc) return setMsg("Provide FIR number and accused name.");
    const newCase = registerFIR({ title: `FIR ${num}`, type: "Criminal", court: "Pending", judge: "", lawyer: "", accused: [acc] });
    setMsg(`FIR registered as case ${newCase.id}.`);
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
  <button onClick={handleRegister} style={{ marginTop: "10px" }}>Register</button>
  {msg && <div style={{ marginTop: "8px", color: "#0d6b0d" }}>{msg}</div>}
    </div>
  );
}
