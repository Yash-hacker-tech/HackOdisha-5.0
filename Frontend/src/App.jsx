import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import Login from './Login.jsx'
import SignUp from './SignUp.jsx'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
