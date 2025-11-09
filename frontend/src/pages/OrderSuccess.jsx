// src/pages/OrderSuccess.jsx
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { setSelectedTable, setOrderItems } = useOrder();

  const handleNewOrder = () => {
    setSelectedTable(null);
    setOrderItems([]);
    navigate('/tables');
  };

  return (
    <div className="container py-5 text-center">
      <div className="my-5">
        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '5rem' }}></i>
        <h1 className="mt-4 text-success">Đặt món thành công!</h1>
        <p className="lead">Nhân viên sẽ mang món đến bàn của bạn sớm nhất.</p>
      </div>
      <button onClick={handleNewOrder} className="btn btn-primary btn-lg">
        Đặt bàn mới
      </button>
    </div>
  );
}