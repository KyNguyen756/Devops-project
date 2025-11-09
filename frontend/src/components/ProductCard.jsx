import { useOrder } from '../context/OrderContext';

export default function ProductCard({ product, onDelete, onEdit, isAdmin = false }) {
  const { addItem } = useOrder(); // chỉ dùng cho user

  return (
    <div className="card h-100 shadow-sm">
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          className="card-img-top"
          alt={product.name}
          style={{ height: '180px', objectFit: 'cover' }}
        />
      )}

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-danger fw-bold">
          {product.price?.toLocaleString()}đ
        </p>
        <p className="card-text text-muted">
          {product.description || 'Không có mô tả'}
        </p>

        {isAdmin ? (
          <div className="mt-auto d-flex justify-content-between">
            <button
              className="btn btn-warning"
              onClick={() => onEdit(product)}
            >
              Sửa
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(product.id)}
            >
              Xóa
            </button>
          </div>
        ) : (
          <button
            onClick={() => addItem(product)}
            className="btn btn-outline-primary mt-auto"
          >
            Thêm vào giỏ
          </button>
        )}
      </div>
    </div>
  );
}