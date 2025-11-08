import React, { useState } from "react";
import { sampleCases } from "../../data/sampleCases";

export default function UploadDocuments() {
  const [selectedCase, setSelectedCase] = useState(sampleCases[0].id);
  const [fileName, setFileName] = useState("");

  const handleUpload = () => {
    if (fileName) {
      alert(`Uploaded file "${fileName}" for case ${selectedCase}`);
      setFileName("");
    }
  };

  return (
    <div>
      <h3>Upload Documents</h3>
      <select value={selectedCase} onChange={(e) => setSelectedCase(e.target.value)}>
        {sampleCases.map((c) => (
          <option key={c.id} value={c.id}>
            {c.id} — {c.title}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="File Name (mock)"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
