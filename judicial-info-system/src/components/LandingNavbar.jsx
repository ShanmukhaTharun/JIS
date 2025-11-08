// src/components/LandingNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Scale } from "lucide-react";
import "../styles/LandingNavbar.css"; // separate CSS for landing navbar

export default function LandingNavbar() {
  return (
    <header className="landing-navbar">
      <div className="logo">
        <Scale className="icon" />
        <h1>Judicial Information System</h1>
      </div>

      <nav className="nav-right">
        <Link to="/"><button className="nav-btn">Home</button></Link>
        <Link to="/login"><button className="nav-btn">Login</button></Link>
        <Link to="/signup"><button className="nav-btn">Signup</button></Link>
      </nav>
    </header>
  );
}
