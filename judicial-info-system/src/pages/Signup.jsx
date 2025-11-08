import React, { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "User",
    bio: "",
  });

  const [generatedId, setGeneratedId] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Generate unique user ID based on role
  const generateId = (role) => {
    const prefix = role[0].toUpperCase();
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    return `${prefix}${randomDigits}`;
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = generateId(formData.role);
    setGeneratedId(userId);
    setShowModal(true);

    // Save user in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ ...formData, id: userId });
    localStorage.setItem("users", JSON.stringify(users));

    // Optionally clear form
    setFormData({
      fullName: "",
      email: "",
      password: "",
      role: "User",
      bio: "",
    });
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option>User</option>
          <option>Judge</option>
          <option>Lawyer</option>
          <option>Police</option>
          <option>Registrar</option>
        </select>
        <textarea
          name="bio"
          placeholder="Write a short bio..."
          value={formData.bio}
          onChange={handleChange}
          rows="3"
        />
        <button type="submit">Sign Up</button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Your ID has been generated!</h3>
            <p>
              <strong>{generatedId}</strong>
            </p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
