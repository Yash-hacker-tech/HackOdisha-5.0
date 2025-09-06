import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useUser } from './hooks/useUser'
import './App.css'

function SignUp() {
  const navigate = useNavigate();
  const { signup } = useUser();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student',
    college: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signup(formData);
    setLoading(false);

    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error || 'Signup failed');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={loading}>
          <legend>Sign Up Form</legend>
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
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
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
          <label htmlFor='role'>Role:</label>
          <select
            id='role'
            name='role'
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value='student'>Student</option>
            <option value='club_admin'>Club Admin</option>
            <option value='college_admin'>College Admin</option>
          </select>
          <br /><br/>
          <label htmlFor='college'>College:</label>
          <input
            type='text'
            id='college'
            name='college'
            value={formData.college}
            onChange={handleChange}
            required
          />
          <br /><br/>
          <input type='checkbox' id='agree' name='agree' required />
          <label htmlFor='agree'>I agree to the terms</label>
          <br /><br/>
          <button type='submit'>{loading ? 'Signing up...' : 'Sign Up'}</button>
          <button type='reset' onClick={() => setFormData({ username: '', email: '', password: '', role: 'student', college: '' })}>Reset</button>
        </fieldset>
      </form>
    </>
  )
}

export default SignUp
