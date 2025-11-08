import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import "./Login.css";

export default function Login() {
  const [emailOrId, setEmailOrId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!emailOrId || !password) return setError("All fields required.");
    try {
      setLoading(true);
  const user = await login(emailOrId, password);
      const r = user.role?.toLowerCase();
      navigate(`/${r === 'user' ? 'user' : r}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const backBtnStyle = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: '#b30000', color: '#fff', padding: '8px 12px',
    borderRadius: 8, border: 'none', cursor: 'pointer', marginBottom: 12
  };

  return (
    <div className="login-container">
      <button type="button" onClick={() => navigate(-1)} style={backBtnStyle} aria-label="Go back">
        <ArrowLeft size={18} /> Back
      </button>
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Login to Judiciary Information System</h2>

  <label>Email or Generated ID</label>
        <input
          type="text"
          value={emailOrId}
          onChange={(e) => setEmailOrId(e.target.value)}
          placeholder="Enter your Email or Generated ID"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          required
        />

        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>Registrar</option>
          <option>Judge</option>
          <option>Lawyer</option>
          <option>Police</option>
          <option>User</option>
        </select>

  {error && <div style={{ color: 'red', marginBottom: '8px' }}>{error}</div>}
  <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      <div style={{ marginTop: '12px', fontSize: '14px', textAlign: 'center' }}>
        Don't have an account? <Link to="/signup" style={{ color: '#0077cc', textDecoration: 'underline' }}>Sign Up</Link>
      </div>
    </div>
  );
}
