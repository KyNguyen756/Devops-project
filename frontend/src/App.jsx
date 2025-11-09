// src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import MainRoutes from './routes/MainRoutes';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <OrderProvider>
          <MainRoutes />
        </OrderProvider>
      </AuthProvider>
    </Router>
  );
}