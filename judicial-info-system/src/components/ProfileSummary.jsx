import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProfileSummary() {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div style={{
      background: '#f7f7f7',
      border: '1px solid #e5e5e5',
      borderRadius: 8,
      padding: '12px 16px',
      marginBottom: 16,
      fontSize: 14
    }}>
      <strong>ID:</strong> {user.id} &nbsp; | &nbsp;
      <strong>Name:</strong> {user.fullName} &nbsp; | &nbsp;
      <strong>Email:</strong> {user.email} &nbsp; | &nbsp;
      <strong>Role:</strong> {user.role}
    </div>
  );
}
