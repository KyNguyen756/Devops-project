import { useOrder } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';

export default function TableCard({ table, onDelete, onEdit, isAdmin = false }) {
  const { setSelectedTable } = useOrder();
  const navigate = useNavigate();

  const handleSelect = () => {
    if (table.status?.name !== 'AVAILABLE' || isAdmin) return;
    setSelectedTable(table);
    navigate('/menu');
  };

  return (
    <div className="col-md-4 mb-3">
      <div className={`card h-100 shadow-sm ${table.status?.name !== 'AVAILABLE' ? 'bg-secondary text-white' : ''}`}>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{table.name}</h5>
          <p className="card-text">Sức chứa: {table.capacity} người</p>
          <p className="card-text">
            <strong>Trạng thái:</strong>{' '}
            <span className={`badge bg-${table.status?.name === 'AVAILABLE' ? 'success' : 'danger'}`}>
              {table.status?.name || 'N/A'}
            </span>
          </p>

          <button
            onClick={handleSelect}
            disabled={table.status?.name !== 'AVAILABLE' || isAdmin}
            className={`btn mb-2 ${table.status?.name === 'AVAILABLE' ? 'btn-success' : 'btn-secondary'} w-100`}
          >
            {table.status?.name === 'AVAILABLE' ? 'Chọn bàn' : 'Đã đặt'}
          </button>

          {isAdmin && (
            <div className="d-flex gap-2 mt-auto">
              <button onClick={() => onEdit(table)} className="btn btn-warning w-50">
                Sửa
              </button>
              <button onClick={() => onDelete(table.id)} className="btn btn-danger w-50">
                Xóa
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}