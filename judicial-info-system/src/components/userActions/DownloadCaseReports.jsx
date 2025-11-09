import React, { useState } from "react";
import { CasesAPI } from "../../services/api";

export default function DownloadCaseReports() {
  const [caseId, setCaseId] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const triggerDownload = async (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleDownloadSummary = async () => {
    setMsg("");
    if (!caseId.trim()) {
      setMsg("Enter a Case ID (e.g., C001)");
      return;
    }
    setLoading(true);
    try {
      const blob = await CasesAPI.downloadSummary(caseId.trim());
      await triggerDownload(blob, `${caseId.trim()}-summary.json`);
      setMsg("Summary downloaded.");
    } catch (e) {
      setMsg(e.message || "Failed to download summary");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadLatestReport = async () => {
    setMsg("");
    if (!caseId.trim()) {
      setMsg("Enter a Case ID (e.g., C001)");
      return;
    }
    setLoading(true);
    try {
      const blob = await CasesAPI.downloadLatestReport(caseId.trim());
      await triggerDownload(blob, `${caseId.trim()}-report.json`);
      setMsg("Report downloaded.");
    } catch (e) {
      setMsg(e.message || "Failed to download report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ja-panel">
      <h3>Download Case Reports</h3>
      <div style={{ maxWidth: 520 }} className="ja-form">
        <input
          className="ja-input"
          placeholder="Enter Case ID (e.g., C001)"
          value={caseId}
          onChange={(e) => setCaseId(e.target.value)}
        />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="ja-btn" disabled={loading} onClick={handleDownloadSummary}>
            Download Case Details (JSON)
          </button>
          <button className="ja-btn" disabled={loading} onClick={handleDownloadLatestReport}>
            Download Latest Report (JSON)
          </button>
        </div>
        {msg && <div className={/downloaded|Enter/.test(msg) ? "ja-info" : "ja-error"}>{msg}</div>}
      </div>
    </div>
  );
}
