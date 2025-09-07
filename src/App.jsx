import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import Login from './Login.jsx'
import SignUp from './SignUp.jsx'
import Dashboard from './Dashboard.jsx'
import ClubList from './components/ClubList.jsx'
import ClubProfile from './components/ClubProfile.jsx'
import ClubCreateEdit from './components/ClubCreateEdit.jsx'
import EventCalendar from './components/EventCalendar.jsx'
import EventCreate from './components/EventCreate.jsx'
import EventDetails from './components/EventDetails.jsx'
import EventRegistration from './components/EventRegistration.jsx'
import CollabRequests from './components/CollabRequests.jsx'
import PostFeed from './components/PostFeed.jsx'
import PostCreate from './components/PostCreate.jsx'
import NotificationsList from './components/NotificationsList.jsx'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clubs" element={<ClubList />} />
        <Route path="/clubs/:id" element={<ClubProfile />} />
        <Route path="/clubs/:id/edit" element={<ClubCreateEdit />} />
        <Route path="/clubs/create" element={<ClubCreateEdit />} />
        <Route path="/events" element={<EventCalendar />} />
        <Route path="/events/create" element={<EventCreate />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/events/:id/register" element={<EventRegistration />} />
        <Route path="/collaborations" element={<CollabRequests />} />
        <Route path="/posts" element={<PostFeed />} />
        <Route path="/posts/create" element={<PostCreate />} />
        <Route path="/notifications" element={<NotificationsList />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
