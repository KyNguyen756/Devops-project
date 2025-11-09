import { createContext, useContext, useState } from 'react';
import { orderAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // ← ĐÚNG ĐẶNG

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [selectedTable, setSelectedTable] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth(); // ← GỌI useAuth Ở CẤP CAO NHẤT → HỢP LỆ

  const addItem = (product) => {
    setOrderItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeItem = (id) => {
    setOrderItems(prev => prev.filter(i => i.id !== id));
  };

  const createOrder = async () => {
    if (!selectedTable || orderItems.length === 0) return;

    if (!user?.id) {
      alert('Không tìm thấy thông tin người dùng! Vui lòng đăng nhập lại.');
      navigate('/login');
      return;
    }

    const orderData = {
      user: { id: user.id }, // ← GỬI user.id
      table: { id: selectedTable.id },
      items: orderItems.map(item => ({
        productId: item.id,
        productName: item.name,
        quantity: item.qty,
        price: item.price
      })),
      totalPrice: orderItems.reduce((sum, i) => sum + i.price * i.qty, 0)
    };

    try {
      await orderAPI.create(orderData);
      alert('Đặt món thành công!');
      setOrderItems([]);
      setSelectedTable(null);
      navigate('/order-success');
    } catch (err) {
      console.error(err);
      alert('Lỗi: ' + (err.response?.data?.message || 'Không thể đặt món'));
    }
  };

  return (
    <OrderContext.Provider value={{
      selectedTable, setSelectedTable,
      orderItems, addItem, removeItem, createOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);