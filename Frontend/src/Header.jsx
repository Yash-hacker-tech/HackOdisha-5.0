import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './hooks/useUser';
import NotificationsBell from './components/NotificationsBell';

const Header = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
            NIT Club
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-blue-200 transition-colors">About</Link>
            <Link to="/clubs" className="hover:text-blue-200 transition-colors">Clubs</Link>
            {user && (
              <>
                <Link to="/dashboard" className="hover:text-blue-200 transition-colors">Dashboard</Link>
                <Link to="/events" className="hover:text-blue-200 transition-colors">Events</Link>
                <Link to="/posts" className="hover:text-blue-200 transition-colors">Posts</Link>
                {(user.role === 'club_admin' || user.role === 'college_admin') && (
                  <>
                    <Link to="/clubs/create" className="hover:text-blue-200 transition-colors">Create Club</Link>
                    <Link to="/events/create" className="hover:text-blue-200 transition-colors">Create Event</Link>
                    <Link to="/collaborations" className="hover:text-blue-200 transition-colors">Collaborations</Link>
                  </>
                )}
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <NotificationsBell />
                <div className="hidden md:flex items-center space-x-3">
                  <span className="text-sm font-medium">Welcome, {user.username}</span>
                  <span className="text-xs bg-blue-700 px-2 py-1 rounded-full">
                    {user.role?.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="hover:text-blue-200 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button className="md:hidden p-2 hover:bg-blue-700 rounded-md transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <nav className="md:hidden mt-4 pt-4 border-t border-blue-500">
          <div className="flex flex-col space-y-2">
            <Link to="/" className="hover:text-blue-200 transition-colors py-2">Home</Link>
            <Link to="/about" className="hover:text-blue-200 transition-colors py-2">About</Link>
            <Link to="/clubs" className="hover:text-blue-200 transition-colors py-2">Clubs</Link>
            {user && (
              <>
                <Link to="/dashboard" className="hover:text-blue-200 transition-colors py-2">Dashboard</Link>
                <Link to="/events" className="hover:text-blue-200 transition-colors py-2">Events</Link>
                <Link to="/posts" className="hover:text-blue-200 transition-colors py-2">Posts</Link>
                {(user.role === 'club_admin' || user.role === 'college_admin') && (
                  <>
                    <Link to="/clubs/create" className="hover:text-blue-200 transition-colors py-2">Create Club</Link>
                    <Link to="/events/create" className="hover:text-blue-200 transition-colors py-2">Create Event</Link>
                    <Link to="/collaborations" className="hover:text-blue-200 transition-colors py-2">Collaborations</Link>
                  </>
                )}
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
