import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('admin@bms.local');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <form className="card" onSubmit={onSubmit}>
        <h1>Business Management Login</h1>
        {error && <p className="error">{error}</p>}
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
      </form>
    </div>
  );
}
