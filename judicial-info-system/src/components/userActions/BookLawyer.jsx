import React, { useState } from 'react';
import { PaymentsAPI } from '../../services/api';

export default function BookLawyer() {
  const [caseId, setCaseId] = useState('');
  const [lawyer, setLawyer] = useState('');
  const [amount, setAmount] = useState('99');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const startCheckout = async () => {
    setMsg('');
    if (!caseId || !lawyer || !amount) { setMsg('Please fill all fields'); return; }
    setLoading(true);
    try {
      const { url } = await PaymentsAPI.createCheckout({ caseId, lawyer, amount: Number(amount), customerEmail: email });
      window.location.href = url; // redirect to Stripe Checkout
    } catch (e) {
  // If payments not configured or any failure, fallback to local success page
  const q = new URLSearchParams({ caseId, lawyer }).toString();
  window.location.href = `/payment/success?${q}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ja-panel">
      <h3>Book a Lawyer</h3>
      <div className="ja-form" style={{ maxWidth:520 }}>
        <input className="ja-input" placeholder="Case ID (e.g., C001)" value={caseId} onChange={e=>setCaseId(e.target.value)} />
        <input className="ja-input" placeholder="Lawyer Name" value={lawyer} onChange={e=>setLawyer(e.target.value)} />
        <input className="ja-input" type="number" min="1" step="1" placeholder="Amount (USD)" value={amount} onChange={e=>setAmount(e.target.value)} />
        <input className="ja-input" type="email" placeholder="Your Email (optional)" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="ja-btn" onClick={startCheckout} disabled={loading}>{loading ? 'Redirecting...' : 'Pay & Book'}</button>
        {msg && <div className={msg.includes('Please') ? 'ja-error' : 'ja-info'}>{msg}</div>}
      </div>
    </div>
  );
}
