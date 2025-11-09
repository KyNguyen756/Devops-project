// src/pages/Register.jsx
import { useState } from 'react';
import { authAPI } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authAPI.register({ username, password, email });
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch {
      alert('Đăng ký thất bại!');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body p-4">
                <h3 className="text-center mb-4">Đăng Ký</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label>Tên đăng nhập</label>
                    <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label>Mật khẩu</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                  <button type="submit" className="btn btn-success w-100">Đăng Ký</button>
                </form>
                <p className="text-center mt-3">
                  Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}