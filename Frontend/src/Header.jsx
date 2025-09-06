import { Link } from 'react-router-dom';

function Header({ isLoggedIn }){
    return(
        <header>
            <h1>Inter-NIT</h1>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                {!isLoggedIn && (
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>SignUp</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header
