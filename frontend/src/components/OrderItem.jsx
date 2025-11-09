// src/components/OrderItem.jsx
import { useOrder } from '../context/OrderContext';

export default function OrderItem({ item }) {
  const { removeItem } = useOrder();

  return (
    <div className="d-flex justify-content-between align-items-center border p-3 mb-2 rounded">
      <div>
        <strong>{item.name}</strong> × {item.qty}
      </div>
      <div className="d-flex align-items-center gap-2">
        <span className="text-success fw-bold">{(item.price * item.qty).toLocaleString()}đ</span>
        <button
          onClick={() => removeItem(item.id)}
          className="btn btn-sm btn-danger"
        >
          Xóa
        </button>
      </div>
    </div>
  );
}