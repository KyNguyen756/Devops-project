// src/pages/OrderPage.jsx
import { useOrder } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import OrderItem from '../components/OrderItem';

export default function OrderPage() {
  const { selectedTable, orderItems, createOrder } = useOrder();
  const navigate = useNavigate();

  if (!selectedTable) {
    navigate('/tables');
    return null;
  }

  const total = orderItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 text-primary">
        Đơn hàng - {selectedTable.name}
      </h1>

      {orderItems.length === 0 ? (
        <div className="text-center">
          <p className="text-muted fs-5">Giỏ hàng trống</p>
          <button
            onClick={() => navigate('/menu')}
            className="btn btn-outline-primary"
          >
            Tiếp tục chọn món
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4">
            {orderItems.map(item => (
              <OrderItem key={item.id} item={item} />
            ))}
          </div>

          <div className="card p-4 bg-light">
            <h4 className="text-end text-success">
              Tổng cộng: <strong>{total.toLocaleString()}đ</strong>
            </h4>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={createOrder}
              className="btn btn-success btn-lg px-5"
            >
              Xác nhận đặt món
            </button>
          </div>
        </>
      )}
    </div>
  );
}