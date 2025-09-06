import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useUser } from './hooks/useUser'
import './App.css'

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const credentials = {
      username: formData.username,
      password: formData.password
    };

    const result = await login(credentials);
    setLoading(false);

    if (result.success) {
      setIsLoggedIn(true);
      navigate('/');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={loading}>
          <legend>Login Form</legend>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleChange}
            required
          />
          <br /><br/>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br /><br/>
          <input type='checkbox' id='remember' name='remember' />
          <label htmlFor='remember'>Remember Me</label>
          <br /><br/>
          <button type='submit'>{loading ? 'Logging in...' : 'Login'}</button>
          <button type='reset' onClick={() => setFormData({ username: '', password: '' })}>Reset</button>
        </fieldset>
      </form>
    </>
  )
}

export default Login
