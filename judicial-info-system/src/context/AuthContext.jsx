import React, { createContext, useContext, useEffect, useState } from 'react';
import { UsersAPI } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.user);
      setToken(parsed.token);
      // verify token by fetching /users/me; if invalid, clear auth
      (async () => {
        try {
          const me = await UsersAPI.me();
          setUser({ id: me.id, role: me.role, fullName: me.fullName, email: me.email });
        } catch (_) {
          localStorage.removeItem('auth');
          setUser(null);
          setToken(null);
        }
      })();
    }
  }, []);

  const login = async (emailOrId, password) => {
    const res = await UsersAPI.login({ identifier: emailOrId, password });
    const authData = { token: res.token, user: { id: res.id, role: res.role, fullName: res.fullName, email: res.email } };
    setUser(authData.user);
    setToken(authData.token);
    localStorage.setItem('auth', JSON.stringify(authData));
    return authData.user;
  };

  const signup = async (payload) => {
  const res = await UsersAPI.signup(payload);
  return res;
  };

  const logout = () => {
    setUser(null); setToken(null); localStorage.removeItem('auth');
  };

  return <AuthContext.Provider value={{ user, token, login, signup, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
