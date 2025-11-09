import { useEffect, useState } from 'react';
import { tableAPI, tableStatusAPI } from '../../services/api';
import TableCard from '../../components/TableCard';

export default function AdminTables() {
  const [tables, setTables] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [tableRes, statusRes] = await Promise.all([
        tableAPI.getAll(),
        tableStatusAPI.getAll()
      ]);
      setTables(tableRes.data);
      setStatuses(statusRes.data);
    } catch (err) {
      alert('Lỗi tải dữ liệu bàn!');
    }
  };

  const handleCreate = async () => {
    if (!name || !capacity) return alert('Vui lòng nhập tên và sức chứa!');
    const availableStatus = statuses.find(s => s.name === 'AVAILABLE');
    if (!availableStatus) return alert('Không tìm thấy trạng thái AVAILABLE!');

    try {
      await tableAPI.create({ name, capacity: +capacity, status: availableStatus });
      setName('');
      setCapacity('');
      loadData();
    } catch (err) {
      alert('Tạo bàn thất bại!');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa bàn này?')) return;
    try {
      await tableAPI.delete(id);
      loadData();
    } catch {
      alert('Xóa bàn thất bại!');
    }
  };

  const handleEdit = (table) => {
    const newName = prompt('Nhập tên mới cho bàn:', table.name);
    if (!newName) return;
    const newCapacity = prompt('Nhập sức chứa mới:', table.capacity);
    if (!newCapacity) return;

    const updatedTable = { ...table, name: newName, capacity: +newCapacity };
    tableAPI.update(table.id, updatedTable)
      .then(() => loadData())
      .catch(() => alert('Cập nhật bàn thất bại!'));
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 text-danger">Quản Lý Bàn</h1>

      <div className="row mb-5">
        {/* Form tạo bàn mới */}
        <div className="col-md-4">
          <div className="card p-4 shadow">
            <h4>Tạo bàn mới</h4>
            <input
              placeholder="Tên bàn"
              value={name}
              onChange={e => setName(e.target.value)}
              className="form-control mb-2"
            />
            <input
              placeholder="Sức chứa"
              type="number"
              value={capacity}
              onChange={e => setCapacity(e.target.value)}
              className="form-control mb-3"
            />
            <button onClick={handleCreate} className="btn btn-success w-100">Tạo bàn</button>
          </div>
        </div>

        {/* Danh sách bàn */}
        <div className="col-md-8">
          <h4>Danh sách bàn</h4>
          <div className="row">
            {tables.length === 0 ? (
              <div className="col-12 text-center text-muted">Không có bàn nào.</div>
            ) : (
              tables.map(table => (
                <TableCard
                  key={table.id}
                  table={table}
                  isAdmin={true}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}