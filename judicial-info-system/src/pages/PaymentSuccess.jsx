import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CasesAPI } from '../services/api';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const qCaseId = params.get('caseId');
  const qLawyer = params.get('lawyer');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [assigned, setAssigned] = useState(false);

  const assignKey = useMemo(() => sessionId ? `assigned:${sessionId}` : qCaseId && qLawyer ? `assigned:${qCaseId}:${qLawyer}` : null, [sessionId, qCaseId, qLawyer]);

  useEffect(() => {
    const load = async () => {
      // Fallback path when we don't have Stripe session (dev/no key): assign using query params
      if (!sessionId && qCaseId && qLawyer) {
        try {
          if (!assignKey || localStorage.getItem(assignKey)) { setAssigned(true); return; }
          await CasesAPI.assignLawyer(qCaseId, qLawyer);
          // record client-side activity to server
          try { await fetch(`${API_BASE}/activity`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ actorRole:'User', action:'LAWYER_ASSIGNED_AFTER_PAYMENT', targetType:'Case', targetId:qCaseId, details:{ lawyer:qLawyer, mode:'fallback' } }) }); } catch {}
          localStorage.setItem(assignKey, '1');
          setAssigned(true);
        } catch (e) { setError(e.message || 'Failed to assign lawyer'); }
        return;
      }

      if (!sessionId) return; // Nothing to do
      try {
        const res = await fetch(`${API_BASE}/payments/session/${sessionId}`);
        if (!res.ok) throw new Error('Failed to fetch session');
        const json = await res.json();
        setData(json);
        const metaCase = json?.metadata?.caseId;
        const metaLawyer = json?.metadata?.lawyer;
        if (json?.payment_status === 'paid' && metaCase && metaLawyer) {
          if (!assignKey || localStorage.getItem(assignKey)) { setAssigned(true); return; }
          await CasesAPI.assignLawyer(metaCase, metaLawyer);
          try { await fetch(`${API_BASE}/activity`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ actorRole:'User', action:'PAYMENT_SUCCESS', targetType:'Case', targetId:metaCase, details:{ lawyer:metaLawyer, sessionId } }) }); } catch {}
          localStorage.setItem(assignKey, '1');
          setAssigned(true);
        }
      } catch (e) { setError(e.message); }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, qCaseId, qLawyer, assignKey]);

  return (
    <div style={{ maxWidth:640, margin:'40px auto', padding:24, background:'#fff', borderRadius:12, boxShadow:'0 6px 18px rgba(0,0,0,0.06)', textAlign:'center' }}>
      <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:80, height:80, borderRadius:'50%', background:'#eaffea', marginBottom:12, boxShadow:'inset 0 0 0 2px #cfe9cf' }}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#22a322" strokeWidth="2" fill="#eaffea"/>
          <path d="M7 12.5l3 3 7-7" stroke="#22a322" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 style={{ marginTop:0, color:'#145214' }}>Payment Successful</h2>
      {error && <p style={{ color:'red' }}>{error}</p>}
      {data && (
        <div style={{ fontSize:15, marginBottom:12 }}>
          <p><strong>Lawyer:</strong> {data.metadata?.lawyer}</p>
          <p><strong>Case:</strong> {data.metadata?.caseId}</p>
          <p><strong>Amount:</strong> {(data.amount_total/100).toFixed(2)} {data.currency?.toUpperCase()}</p>
          <p><strong>Status:</strong> {data.payment_status}</p>
          <p><strong>Session ID:</strong> {data.id}</p>
        </div>
      )}
      {(qCaseId && qLawyer) && (
        <div style={{ fontSize:15, marginBottom:12 }}>
          <p><strong>Lawyer:</strong> {qLawyer}</p>
          <p><strong>Case:</strong> {qCaseId}</p>
          <p style={{ color:'#666' }}>(Test mode without Stripe session)</p>
        </div>
      )}
      <p style={{ color: assigned ? '#145214' : '#666' }}>
        {assigned ? 'Lawyer assigned to your case successfully.' : 'Finalizing your booking...'}
      </p>
      <div style={{ marginTop:16 }}>
        <Link to="/user" style={{ background:'#b22222', color:'#fff', padding:'10px 16px', borderRadius:8, textDecoration:'none' }}>Back to Dashboard</Link>
      </div>
    </div>
  );
}
