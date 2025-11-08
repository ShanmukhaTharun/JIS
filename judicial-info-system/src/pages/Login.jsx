import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [emailOrId, setEmailOrId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // (Frontend-only) mock validation
    if (!emailOrId || !password) {
      alert("Please fill all fields.");
      return;
    }

    alert(`Login Successful! Redirecting to ${role} dashboard...`);

    // redirect based on role
    switch (role.toLowerCase()) {
      case "registrar":
        navigate("/registrar");
        break;
      case "judge":
        navigate("/judge");
        break;
      case "lawyer":
        navigate("/lawyer");
        break;
      case "police":
        navigate("/police");
        break;
      case "user":
      default:
        navigate("/user");
        break;
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Login to Judiciary Information System</h2>

        <label>Email or ID</label>
        <input
          type="text"
          value={emailOrId}
          onChange={(e) => setEmailOrId(e.target.value)}
          placeholder="Enter your Email or ID"
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
