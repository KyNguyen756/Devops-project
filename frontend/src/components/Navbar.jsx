// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        
        <div className="navbar-nav ms-auto d-flex align-items-center gap-3">
          <span className="navbar-text text-light">
            Xin chào, <strong>{user.username}</strong>
            {user.role === 'ADMIN' && <span className="badge bg-warning text-dark ms-2">ADMIN</span>}
          </span>
          {user.role === 'ADMIN' && (
            <Link to="/admin" className="btn btn-outline-light btn-sm">Quản trị</Link>
          )}
          <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
            Đăng xuất
          </button>
        </div>
      </div>
    </nav>
  );
}