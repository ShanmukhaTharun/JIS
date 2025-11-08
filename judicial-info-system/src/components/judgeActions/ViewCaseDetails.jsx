import React, { useState } from "react";
import { findCase } from "../../data/sampleCases";
import "./JudgeActions.css";

export default function ViewCaseDetails() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!query.trim()) {
      setError("Please enter a Case ID (e.g., C10001).");
      return;
    }
    const c = findCase(query.trim());
    if (!c) {
      setError("Case not found.");
      return;
    }
    setResult(c);
  };

  return (
    <div className="ja-panel">
      <h3>🔎 View Case Details</h3>

      <form className="ja-form" onSubmit={handleSearch}>
        <input
          className="ja-input"
          placeholder="Enter Case ID (e.g., C10001)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="ja-btn">Search</button>
      </form>

      {error && <div className="ja-error">{error}</div>}

      {result && (
        <div className="case-card">
          <h4>{result.caseId} — {result.title}</h4>
          <p><strong>Court:</strong> {result.court}</p>
          <p><strong>Type:</strong> {result.type}</p>
          <p><strong>Accused:</strong> {result.accused}</p>
          <p><strong>Judge:</strong> {result.judge}</p>
          <p><strong>Status:</strong> {result.status}</p>

          <div className="case-section">
            <h5>Hearings</h5>
            {result.hearings.length ? (
              <ul>
                {result.hearings.map((h, i) => <li key={i}>{h.date} — {h.notes}</li>)}
              </ul>
            ) : <p>No hearings scheduled.</p>}
          </div>

          <div className="case-section">
            <h5>Evidence</h5>
            {result.evidence.length ? (
              <ul>
                {result.evidence.map((ev) => <li key={ev.id}>{ev.name} — {ev.uploadedAt}</li>)}
              </ul>
            ) : <p>No evidence uploaded.</p>}
          </div>

          <div className="case-section">
            <h5>Assigned Lawyer</h5>
            <p>{result.assignedLawyer || "None"}</p>
          </div>

          {result.judgement && (
            <div className="case-section">
              <h5>Judgement</h5>
              <p>{result.judgement}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
