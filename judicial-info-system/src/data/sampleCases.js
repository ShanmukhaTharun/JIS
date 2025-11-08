// src/data/sampleCases.js

// Sample case data
export const sampleCases = [
    {
      id: "C001",
      title: "Robbery at Main Street",
      type: "Criminal",
      court: "High Court",
      judge: "Judge A",
      lawyer: "Lawyer X",
      status: "Pending",
      accused: ["John Doe", "Jane Smith"],
      evidence: [],
      hearingDates: ["2025-11-15"],
    },
    {
      id: "C002",
      title: "Property Dispute",
      type: "Civil",
      court: "District Court",
      judge: "Judge B",
      lawyer: "Lawyer Y",
      status: "Ongoing",
      accused: ["Alice Brown"],
      evidence: [],
      hearingDates: ["2025-11-20"],
    },
    {
      id: "C003",
      title: "Traffic Violation",
      type: "Criminal",
      court: "Magistrate Court",
      judge: "Judge C",
      lawyer: "Lawyer Z",
      status: "Resolved",
      accused: ["Bob White"],
      evidence: [],
      hearingDates: ["2025-10-30"],
    },
  ];
  
  // ========================
  // General Helpers
  // ========================
  
  export function findCase(caseId) {
    return sampleCases.find((c) => c.id === caseId);
  }
  
  export function updateCase(caseId, updates) {
    const c = findCase(caseId);
    if (!c) return null;
    Object.assign(c, updates);
    return c;
  }
  
  // ========================
  // Judge Actions
  // ========================
  
  export function assignLawyer(caseId, lawyerName) {
    return updateCase(caseId, { lawyer: lawyerName });
  }
  
  export function scheduleHearing(caseId, date) {
    const c = findCase(caseId);
    if (!c) return null;
    c.hearingDates.push(date);
    return c;
  }
  
  export function reviewEvidence(caseId, evidenceItem) {
    const c = findCase(caseId);
    if (!c) return null;
    c.evidence.push(evidenceItem);
    return c;
  }
  
  export function deliverJudgement(caseId, status) {
    return updateCase(caseId, { status });
  }
  
  // ========================
  // Lawyer Actions
  // ========================
  
  export function submitCaseReport(caseId, report) {
    const c = findCase(caseId);
    if (!c) return null;
    if (!c.reports) c.reports = [];
    c.reports.push(report);
    return c;
  }
  
  export function uploadDocuments(caseId, documents) {
    const c = findCase(caseId);
    if (!c) return null;
    if (!c.documents) c.documents = [];
    c.documents.push(...documents);
    return c;
  }
  
  // ========================
  // Police Actions
  // ========================
  
  export function registerFIR(firData) {
    const newCase = {
      id: `C${String(sampleCases.length + 1).padStart(3, "0")}`,
      ...firData,
      status: "Registered",
      evidence: [],
      hearingDates: [],
    };
    sampleCases.push(newCase);
    return newCase;
  }
  
  export function submitEvidence(caseId, evidenceItem) {
    return reviewEvidence(caseId, evidenceItem);
  }
  
  export function searchByCaseId(caseId) {
    return findCase(caseId);
  }
  
  export function searchByAccusedName(name) {
    return sampleCases.filter((c) =>
      c.accused.some((a) => a.toLowerCase().includes(name.toLowerCase()))
    );
  }
  
  // ========================
  // Registrar Actions
  // ========================
  
  export function registerNewCase(caseData) {
    const newCase = {
      id: `C${String(sampleCases.length + 1).padStart(3, "0")}`,
      ...caseData,
      status: "Pending",
      evidence: [],
      hearingDates: [],
    };
    sampleCases.push(newCase);
    return newCase;
  }
  
  export function updateCaseInfo(caseId, updates) {
    return updateCase(caseId, updates);
  }
  
  export function approveCaseFiles(caseId) {
    return updateCase(caseId, { status: "Approved" });
  }
  
  export function assignCaseToJudge(caseId, judgeName) {
    return updateCase(caseId, { judge: judgeName });
  }
  
  export function manageCourtSchedule(caseId, newDates) {
    return updateCase(caseId, { hearingDates: newDates });
  }
  
  // ========================
  // User Actions
  // ========================
  
  export function viewCaseStatus(caseId) {
    const c = findCase(caseId);
    return c ? c.status : null;
  }
  
  export function downloadCaseReports(caseId) {
    const c = findCase(caseId);
    return c && c.reports ? c.reports : [];
  }
  
  export function submitRequest(userId, caseId, request) {
    const c = findCase(caseId);
    if (!c) return null;
    if (!c.requests) c.requests = [];
    c.requests.push({ userId, request });
    return c;
  }
  
  export function contactLawyer(caseId, message) {
    const c = findCase(caseId);
    if (!c) return null;
    if (!c.messages) c.messages = [];
    c.messages.push({ type: "user", message });
    return c;
  }
  
  export function requestCaseDetails(caseId) {
    return findCase(caseId);
  }
  