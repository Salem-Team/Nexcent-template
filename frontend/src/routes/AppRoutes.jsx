import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ProductsPage from '../pages/ProductsPage';
import InventoryPage from '../pages/InventoryPage';
import SalesPage from '../pages/SalesPage';
import PurchasesPage from '../pages/PurchasesPage';
import CustomersPage from '../pages/CustomersPage';
import SuppliersPage from '../pages/SuppliersPage';
import UsersPage from '../pages/UsersPage';
import ReportsPage from '../pages/ReportsPage';
import DashboardLayout from '../layouts/DashboardLayout';

function Protected({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <Protected>
            <DashboardLayout />
          </Protected>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="sales" element={<SalesPage />} />
        <Route path="purchases" element={<PurchasesPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="suppliers" element={<SuppliersPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>
    </Routes>
  );
}
