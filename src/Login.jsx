import { useNavigate } from 'react-router-dom'
import './App.css'


function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <>
       <form onSubmit={handleSubmit}>
         <fieldset>
              <legend>Login Form</legend>
                <label htmlFor='username'>Username:</label>
                <input type='text' id='username' name='username' required />
                <br /><br/>
                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' name='password' required />
                <br /><br/>
                 <input type='checkbox' id='remember' name='remember' />
                <label htmlFor='remember'>Remember Me</label>
                <br /><br/>
                <button type='submit'>Login</button>
                <button type='reset'>Reset</button>
         </fieldset>
       </form>
    </>
  )
}

export default Login
