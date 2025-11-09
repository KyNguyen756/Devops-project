// src/routes/MainRoutes.jsx
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Tables from '../pages/Tables';
import Menu from '../pages/Menu';
import OrderPage from '../pages/OrderPage';
import OrderSuccess from '../pages/OrderSuccess';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import AdminProducts from '../pages/Admin/AdminProducts';
import AdminTables from '../pages/Admin/AdminTables';
import AdminOrders from '../pages/Admin/AdminOrders';
import AdminReports from '../pages/Admin/AdminReports';
import Navbar from '../components/Navbar';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    } else if (adminOnly && user.role !== 'ADMIN') {
      navigate('/tables', { replace: true });
    }
  }, [user, adminOnly, navigate]);

  if (!user || (adminOnly && user.role !== 'ADMIN')) {
    return null;
  }

  return children;
}

function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {user && <Navbar user={user} onLogout={handleLogout} />}
      <main className="min-vh-100 bg-light">{children}</main>
    </>
  );
}

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/tables" element={<ProtectedRoute><Layout><Tables /></Layout></ProtectedRoute>} />
      <Route path="/menu" element={<ProtectedRoute><Layout><Menu /></Layout></ProtectedRoute>} />
      <Route path="/order" element={<ProtectedRoute><Layout><OrderPage /></Layout></ProtectedRoute>} />
      <Route path="/order-success" element={<ProtectedRoute><Layout><OrderSuccess /></Layout></ProtectedRoute>} />

      <Route path="/admin" element={<ProtectedRoute adminOnly><Layout><AdminDashboard /></Layout></ProtectedRoute>} />
      <Route path="/admin/products" element={<ProtectedRoute adminOnly><Layout><AdminProducts /></Layout></ProtectedRoute>} />
      <Route path="/admin/tables" element={<ProtectedRoute adminOnly><Layout><AdminTables /></Layout></ProtectedRoute>} />
      <Route path="/admin/orders" element={<ProtectedRoute adminOnly><Layout><AdminOrders /></Layout></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute adminOnly><Layout><AdminReports /></Layout></ProtectedRoute>} />

      <Route path="/" element={<Navigate to="/tables" replace />} />
      <Route path="*" element={<Navigate to="/tables" replace />} />
    </Routes>
  );
}