// src/pages/Login.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login({ username, password });
    if (success) {
      navigate('/tables');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body p-4">
                <h3 className="text-center mb-4">Đăng Nhập</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Tên đăng nhập</label>
                    <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mật khẩu</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Đăng Nhập</button>
                </form>
                <p className="text-center mt-3">
                  Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}