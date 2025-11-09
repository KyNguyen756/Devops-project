// src/pages/Admin/AdminOrders.jsx
import { useEffect, useState } from 'react';
import { orderAPI, tableAPI, tableStatusAPI } from '../../services/api'; // ĐÃ THÊM

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderAPI.getAll().then(res => setOrders(res.data));
  }, []);

  const updateStatus = async (orderId, statusName, tableId) => {
    await orderAPI.updateStatus(orderId, statusName);
    if (statusName === 'PAID') {
      const statusRes = await tableStatusAPI.getAll(); 
      const available = statusRes.data.find(s => s.name === 'AVAILABLE');
      if (available) {
        await tableAPI.updateStatus(tableId, available.id);
      }
    }
    orderAPI.getAll().then(res => setOrders(res.data));
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 text-danger">Quản Lý Đơn Hàng</h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Bàn</th>
              <th>Khách</th>
              <th>Món</th>
              <th>Tổng</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.table?.name}</td>
                <td>{order.user?.username || 'Khách vãng lai'}</td>
                <td>
                  {order.items?.map((it, i) => (
                    <div key={i}>{it.productName} x {it.quantity}</div>
                  ))}
                </td>
                <td>{order.totalPrice.toLocaleString()}đ</td>
                <td>
                  <span className={`badge bg-${order.status?.name === 'PENDING' ? 'warning' : 'success'}`}>
                    {order.status?.name}
                  </span>
                </td>
                <td>
                  {order.status?.name === 'PENDING' && (
                    <button onClick={() => updateStatus(order.id, 'PAID', order.table.id)} className="btn btn-sm btn-success">
                      Thanh toán
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}