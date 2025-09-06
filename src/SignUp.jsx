import { useNavigate } from 'react-router-dom'
import './App.css'

function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add form validation or API call for signup
    navigate('/login');
  };

  return (
    <>
       <form onSubmit={handleSubmit}>
         <fieldset>
              <legend>Sign Up Form</legend>
                <label htmlFor='username'>Username:</label>
                <input type='text' id='username' name='username' required />
                <br /><br/>
                <label htmlFor='email'>Email:</label>
                <input type='email' id='email' name='email' required />
                <br /><br/>
                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' name='password' required />
                <br /><br/>
                 <input type='checkbox' id='agree' name='agree' />
                <label htmlFor='agree'>I agree to the terms</label>
                <br /><br/>
                <button type='submit'>Sign Up</button>
                <button type='reset'>Reset</button>
         </fieldset>
       </form>
    </>
  )
}

export default SignUp
