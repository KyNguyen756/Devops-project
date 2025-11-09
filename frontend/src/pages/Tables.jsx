import { useEffect, useState } from 'react';
import { tableAPI } from '../services/api';
import TableCard from '../components/TableCard';

export default function Tables() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    tableAPI.getAll()
      .then(res => setTables(res.data))
      .catch(() => alert('Lỗi tải danh sách bàn!'));
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 text-primary">Chọn Bàn Trống</h1>
      <div className="row">
        {tables.length === 0 ? (
          <div className="col-12 text-center text-muted">
            Không có bàn nào.
          </div>
        ) : (
          tables.map(table => (
            <TableCard
              key={table.id}
              table={table}
              isAdmin={false} // chỉ để chọn bàn
            />
          ))
        )}
      </div>
    </div>
  );
}