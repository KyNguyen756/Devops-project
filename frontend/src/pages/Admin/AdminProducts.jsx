import { useEffect, useState } from 'react';
import { productAPI } from '../../services/api';
import ProductCard from '../../components/ProductCard';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    productAPI.getAll()
      .then(res => setProducts(res.data))
      .catch(() => alert('Lỗi tải sản phẩm!'));
  };

  const handleCreate = async () => {
    if (!name || !price) return alert('Vui lòng nhập tên và giá!');
    try {
      await productAPI.create({ name, price: +price, description, imageUrl });
      setName(''); setPrice(''); setDescription(''); setImageUrl('');
      loadProducts();
    } catch {
      alert('Thêm sản phẩm thất bại!');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      await productAPI.delete(id);
      setProducts(products.filter(p => p.id !== id));
    } catch {
      alert('Xóa sản phẩm thất bại!');
    }
  };

  const handleEdit = async (product) => {
    const newName = prompt("Tên mới:", product.name);
    const newPrice = prompt("Giá mới:", product.price);
    const newDesc = prompt("Mô tả mới:", product.description);
    const newImage = prompt("URL hình mới:", product.imageUrl);

    if (!newName || !newPrice) return;

    try {
      await productAPI.update(product.id, {
        name: newName,
        price: +newPrice,
        description: newDesc,
        imageUrl: newImage
      });
      loadProducts();
    } catch {
      alert('Cập nhật sản phẩm thất bại!');
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 text-danger">Quản Lý Sản Phẩm</h1>

      <div className="row mb-5">
        {/* Form thêm món mới */}
        <div className="col-md-4">
          <div className="card p-4 shadow">
            <h4>Thêm món mới</h4>
            <input
              placeholder="Tên món"
              value={name}
              onChange={e => setName(e.target.value)}
              className="form-control mb-2"
            />
            <input
              placeholder="Giá (VNĐ)"
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="form-control mb-2"
            />
            <textarea
              placeholder="Mô tả"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="form-control mb-2"
              rows="2"
            />
            <input
              placeholder="URL hình ảnh"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              className="form-control mb-3"
            />
            <button onClick={handleCreate} className="btn btn-success w-100">Thêm món</button>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="col-md-8">
          <h4>Danh sách món</h4>
          <div className="row">
            {products.map(product => (
              <div key={product.id} className="col-md-6 mb-3">
                <ProductCard
                  product={product}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  isAdmin={true} // admin
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}