import React, { useState } from "react";
import { sampleCases } from "../../data/sampleCases";

export default function SearchByAccusedName() {
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const found = sampleCases.filter((c) =>
      c.accused.toLowerCase().includes(name.toLowerCase())
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
            <pre key={c.id}>{JSON.stringify(c, null, 2)}</pre>
          ))
        )}
      </div>
    </div>
  );
}
