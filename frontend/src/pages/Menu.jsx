import { useEffect, useState } from 'react';
import { productAPI } from '../services/api';
import { useOrder } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Menu() {
  const [products, setProducts] = useState([]);
  const { selectedTable, orderItems } = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    productAPI.getAll()
      .then(res => setProducts(res.data))
      .catch(() => alert('Lỗi tải menu!'));
  }, []);

  if (!selectedTable) {
    navigate('/tables');
    return null;
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-success">Menu - Bàn: {selectedTable.name}</h1>
        <button
          onClick={() => navigate('/order')}
          className="btn btn-warning position-relative"
        >
          Giỏ hàng
          {orderItems.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {orderItems.length}
            </span>
          )}
        </button>
      </div>

      <div className="row">
        {products.length === 0 ? (
          <div className="col-12 text-center">
            <p className="text-muted">Chưa có món nào trong menu.</p>
          </div>
        ) : (
          products.map(product => (
            <div key={product.id} className="col-md-4 mb-3">
              <ProductCard
                product={product}
                isAdmin={false} // user
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}