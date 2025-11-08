import React, { useState } from "react";
import { sampleCases } from "../../data/sampleCases";

export default function SearchByAccusedName() {
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const q = name.trim().toLowerCase();
    if (!q) return setResults([]);
    const found = sampleCases.filter((c) =>
      Array.isArray(c.accused) && c.accused.some(a => a.toLowerCase().includes(q))
    );
    setResults(found);
  };

  return (
    <div>
      <h3>Search by Accused Name</h3>
      <input
        type="text"
        placeholder="Enter Accused Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div style={{ marginTop: "10px" }}>
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          results.map((c) => (
            <div key={c.id} style={{ marginBottom: "8px" }}>
              <strong>{c.id}</strong> — {c.title}<br />
              Accused: {c.accused.join(", ")}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
