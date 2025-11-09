import React, { useEffect, useState } from 'react';
import { UsersAPI } from '../../services/api';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [creating, setCreating] = useState(false);

  const load = async () => {
    setLoading(true); setError('');
    try {
      const data = await UsersAPI.list();
      setUsers(data);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) { setError('Fill all required fields'); return; }
    setCreating(true); setError('');
    try {
      await UsersAPI.adminCreate({ fullName, email, password, role });
      setFullName(''); setEmail(''); setPassword(''); setRole('User');
      await load();
    } catch (e) { setError(e.message); }
    finally { setCreating(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete user ' + id + '?')) return;
    try {
      await UsersAPI.remove(id);
      setUsers(u => u.filter(x => x.id !== id));
    } catch (e) { setError(e.message); }
  };

  return (
    <div className="ja-panel">
      <h3>Manage Users</h3>
      <form className="ja-form" onSubmit={handleCreate} style={{ background:'#fff', padding:16, border:'1px solid #eee', borderRadius:8 }}>
        <h4 style={{ margin:0 }}>Create New User</h4>
        <input className="ja-input" placeholder="Full Name" value={fullName} onChange={e=>setFullName(e.target.value)} />
        <input className="ja-input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="ja-input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <select className="ja-input" value={role} onChange={e=>setRole(e.target.value)}>
          <option>User</option>
          <option>Registrar</option>
          <option>Judge</option>
          <option>Lawyer</option>
          <option>Police</option>
        </select>
        <button className="ja-btn" disabled={creating}>{creating ? 'Creating...' : 'Create User'}</button>
      </form>

      {error && <div className="ja-error" style={{ marginTop:12 }}>{error}</div>}

      <div style={{ marginTop:24 }}>
        <h4 style={{ margin:'0 0 8px' }}>All Users ({users.length})</h4>
        {loading ? <p>Loading...</p> : (
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'#f5f5f5' }}>
                <th style={{ textAlign:'left', padding:8 }}>ID</th>
                <th style={{ textAlign:'left', padding:8 }}>Name</th>
                <th style={{ textAlign:'left', padding:8 }}>Email</th>
                <th style={{ textAlign:'left', padding:8 }}>Role</th>
                <th style={{ textAlign:'left', padding:8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td style={{ padding:8, borderBottom:'1px solid #eee' }}>{u.id}</td>
                  <td style={{ padding:8, borderBottom:'1px solid #eee' }}>{u.fullName}</td>
                  <td style={{ padding:8, borderBottom:'1px solid #eee' }}>{u.email}</td>
                  <td style={{ padding:8, borderBottom:'1px solid #eee' }}>{u.role}</td>
                  <td style={{ padding:8, borderBottom:'1px solid #eee' }}>
                    <button className="ja-btn" style={{ background:'#7a0f0f' }} onClick={()=>handleDelete(u.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && !loading && (
                <tr><td colSpan={5} style={{ padding:12, textAlign:'center' }}>No users</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
