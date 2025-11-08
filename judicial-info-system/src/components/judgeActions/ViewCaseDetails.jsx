import React, { useState } from "react";
import { CasesAPI } from "../../services/api";
import "./JudgeActions.css";

export default function ViewCaseDetails() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setResult(null);
      const q = query.trim();
      if (!q) return setError("Please enter a Case ID (e.g., C001).");
      const c = await CasesAPI.get(q);
      setResult(c);
    } catch (err) {
      setError(err.message || "Case not found.");
    }
  };

  return (
    <div className="ja-panel">
      <h3>🔎 View Case Details</h3>

      <form className="ja-form" onSubmit={handleSearch}>
        <input
          className="ja-input"
          placeholder="Enter Case ID (e.g., C001)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="ja-btn">Search</button>
      </form>

      {error && <div className="ja-error">{error}</div>}

      {result && (
        <div className="case-card">
          <h4>{result.id} — {result.title}</h4>
          <p><strong>Court:</strong> {result.court}</p>
          <p><strong>Type:</strong> {result.type}</p>
          <p><strong>Accused:</strong> {Array.isArray(result.accused) ? result.accused.join(", ") : result.accused}</p>
          <p><strong>Judge:</strong> {result.judge}</p>
          <p><strong>Status:</strong> {result.status}</p>

          <div className="case-section">
            <h5>Hearings</h5>
            {Array.isArray(result.hearingDates) && result.hearingDates.length ? (
              <ul>
                {result.hearingDates.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            ) : <p>No hearings scheduled.</p>}
          </div>

          <div className="case-section">
            <h5>Evidence</h5>
            {Array.isArray(result.evidence) && result.evidence.length ? (
              <ul>
                {result.evidence.map((ev, i) => (
                  <li key={ev?.id ?? i}>
                    {typeof ev === "string" ? ev : `${ev.name} — ${ev.uploadedAt || ""}`}
                  </li>
                ))}
              </ul>
            ) : <p>No evidence uploaded.</p>}
          </div>

          <div className="case-section">
            <h5>Assigned Lawyer</h5>
            <p>{result.lawyer || "None"}</p>
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
