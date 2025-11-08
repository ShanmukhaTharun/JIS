import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scale } from "lucide-react";
import "../styles/Navbar.css";

export default function Navbar({ roleName }) {
  const navigate = useNavigate();

  // This could be replaced with actual user profile image from localStorage
  const profileImage = "https://i.pravatar.cc/40"; // placeholder avatar

  return (
    <header className="navbar">
      {/* Left: Logo */}
      <div className="logo">
        <Scale className="icon" />
        <h1>Judicial Information System</h1>
      </div>

      {/* Right: Buttons + Role + Profile */}
      <div className="nav-right">
        {roleName && <span className="role">{roleName}</span>}

        <Link to="/"><button>Home</button></Link>
        <Link to="/login"><button>Logout</button></Link>

        {/* Profile Circle */}
        <div
          className="profile-circle"
          onClick={() => navigate("/profile")}
          title="Profile"
        >
          <img src={profileImage} alt="Profile" />
        </div>
      </div>
    </header>
  );
}
