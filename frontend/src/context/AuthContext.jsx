// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async ({ username, password }) => {
  try {
    const res = await authAPI.login({ username, password });
    localStorage.setItem('token', res.data.token);

    const roleName = res.data.user?.roles?.name || 'USER';
    const userData = {
      id: res.data.user?.id,       
      username,
      role: roleName,
      email: res.data.user?.email || ''
    };

    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return true;
  } catch (err) {
    alert('Sai username hoặc mật khẩu!');
    return false;
  }
};

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);