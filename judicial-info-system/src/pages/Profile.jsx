import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../styles/Profile.css';

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (user?.bio) setBio(user.bio);
  }, [user]);

  const handleBioChange = (e) => {
    setBio(e.target.value);
    // Persist a lightweight copy separately if needed by other legacy code
    const legacy = { name: user?.fullName, email: user?.email, role: user?.role, bio: e.target.value, id: user?.id };
    localStorage.setItem('user', JSON.stringify(legacy));
  };

  return (
    <div className="profile-page">
      <button
        type="button"
        onClick={() => navigate(-1)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#b30000', color: '#fff', padding: '8px 12px',
          borderRadius: 8, border: 'none', cursor: 'pointer', marginBottom: 12
        }}
        aria-label="Go back"
      >
        <ArrowLeft size={18} /> Back
      </button>
      <h2>Profile</h2>
      <div className="profile-card">
        <p><strong>Generated ID:</strong> {user?.id}</p>
        <p><strong>Name:</strong> {user?.fullName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          value={bio}
          onChange={handleBioChange}
          placeholder="Write something about yourself..."
        />
      </div>
    </div>
  );
}
