// src/pages/Admin/AdminDashboard.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Chào Admin: {user?.username}</h2>
      <div className="row g-4">
        <div className="col-md-3"><Link to="/admin/products" className="btn btn-primary w-100 p-4">Quản lý món</Link></div>
        <div className="col-md-3"><Link to="/admin/tables" className="btn btn-primary w-100 p-4">Quản lý bàn</Link></div>
        <div className="col-md-3"><Link to="/admin/orders" className="btn btn-primary w-100 p-4">Quản lý đơn</Link></div>
        <div className="col-md-3"><Link to="/admin/reports" className="btn btn-primary w-100 p-4">Báo cáo</Link></div>
      </div>
    </div>
  );
}