// src/pages/Admin/AdminReports.jsx
import { useEffect, useState } from 'react';
import { orderAPI } from '../../services/api';

export default function AdminReports() {
  const [report, setReport] = useState({ totalOrders: 0, totalRevenue: 0 });

  useEffect(() => {
    orderAPI.getAll().then(res => {
      const paidOrders = res.data.filter(o => o.status?.name === 'PAID');
      const revenue = paidOrders.reduce((sum, o) => sum + o.totalPrice, 0);
      setReport({ totalOrders: paidOrders.length, totalRevenue: revenue });
    });
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 text-danger">Báo Cáo Doanh Thu Hôm Nay</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card p-5 text-center shadow">
            <h2 className="text-primary">{report.totalOrders}</h2>
            <p className="lead">Tổng đơn hàng</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-5 text-center shadow">
            <h2 className="text-success">{report.totalRevenue.toLocaleString()}đ</h2>
            <p className="lead">Tổng doanh thu</p>
          </div>
        </div>
      </div>
    </div>
  );
}