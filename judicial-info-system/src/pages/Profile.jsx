import React, { useEffect, useState } from "react";
import Layout from "../components/Layout"; // optional if you want consistent sidebar/nav
import "../styles/Profile.css";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    bio: ""
  });

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUser(storedUser);
  }, []);

  // Update bio in state and localStorage
  const handleBioChange = (e) => {
    const updatedUser = { ...user, bio: e.target.value };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>

        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          value={user.bio || ""}
          onChange={handleBioChange}
          placeholder="Write something about yourself..."
        />
      </div>
    </div>
  );
}
