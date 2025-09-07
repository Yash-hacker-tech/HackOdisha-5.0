import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from './hooks/useUser';
import './App.css';

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);   

    if (!formData.email || !formData.password) {
      setError('Please fill in both email and password');
      setLoading(false);
      return;
    }

    const credentials = {
      email: formData.email,
      password: formData.password,
    };

    const result = await login(credentials);
    setLoading(false);

    if (result.success) {
      setIsLoggedIn(true);
      navigate('/home');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const handleReset = () => {
    setFormData({ email: '', password: '' });
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={loading}>
        <legend>Login Form</legend>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br /><br />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" id="remember" name="remember" />
          <label htmlFor="remember">Remember Me</label>
        </div>
        <br /><br />

        <button type="submit">{loading ? 'Logging in...' : 'Login'}</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </fieldset>
    </form>
  );
}

export default Login;
