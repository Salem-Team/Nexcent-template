import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const menus = [
  { to: '/', label: 'Dashboard', roles: ['admin', 'manager', 'cashier'] },
  { to: '/products', label: 'Products', roles: ['admin', 'manager'] },
  { to: '/inventory', label: 'Inventory', roles: ['admin', 'manager'] },
  { to: '/sales', label: 'Sales', roles: ['admin', 'manager', 'cashier'] },
  { to: '/purchases', label: 'Purchases', roles: ['admin', 'manager'] },
  { to: '/customers', label: 'Customers', roles: ['admin', 'manager', 'cashier'] },
  { to: '/suppliers', label: 'Suppliers', roles: ['admin', 'manager'] },
  { to: '/users', label: 'Users', roles: ['admin'] },
  { to: '/reports', label: 'Reports', roles: ['admin', 'manager'] }
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>BMS</h2>
        {menus.filter((m) => m.roles.includes(user.role)).map((menu) => (
          <NavLink key={menu.to} to={menu.to} end={menu.to === '/'}>
            {menu.label}
          </NavLink>
        ))}
      </aside>
      <main className="main">
        <header className="topbar">
          <span>{user.fullName} ({user.role})</span>
          <button onClick={logout}>Logout</button>
        </header>
        <section className="content"><Outlet /></section>
      </main>
    </div>
  );
}
