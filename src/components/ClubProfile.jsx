import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useClubs } from '../hooks/useClubs';
import { useUser } from '../hooks/useUser';
import { FiCalendar, FiUsers, FiStar, FiMail, FiGlobe, FiMapPin, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';

const ClubProfile = () => {
  const { id } = useParams();
  const { clubs, loading } = useClubs();
  const { user } = useUser();
  const [club, setClub] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const foundClub = clubs.find(c => c.id === parseInt(id));
    setClub(foundClub);
  }, [clubs, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-indigo-400 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-indigo-400 rounded w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Club Not Found</h2>
          <p className="text-gray-600 mb-6">The club you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/clubs"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Browse All Clubs
          </Link>
        </div>
      </div>
    );
  }

  const isClubAdmin = user && user.role === 'club_admin' && user.club_id === club.id;
  const isCollegeAdmin = user && user.role === 'college_admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Club Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-700 relative">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent opacity-50"></div>
          </div>

          <div className="pt-6 pb-6 px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{club.name}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <FiMapPin className="mr-2" />
                  <span>{club.college}</span>
                </div>
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {club.category}
                </span>
              </div>

              {(isClubAdmin || isCollegeAdmin) && (
                <Link
                  to={`/clubs/${club.id}/edit`}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg flex items-center"
                >
                  Edit Club
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-blue-50 p-4 rounded-xl text-center transition-all duration-300 hover:bg-blue-100 hover:scale-105">
                <div className="flex justify-center mb-2">
                  <FiUsers className="text-3xl text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{club.members_count || 0}</div>
                <div className="text-sm text-gray-600">Members</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl text-center transition-all duration-300 hover:bg-purple-100 hover:scale-105">
                <div className="flex justify-center mb-2">
                  <FiCalendar className="text-3xl text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{club.events_count || 0}</div>
                <div className="text-sm text-gray-600">Events</div>
              </div>
              <div className="bg-pink-50 p-4 rounded-xl text-center transition-all duration-300 hover:bg-pink-100 hover:scale-105">
                <div className="flex justify-center mb-2">
                  <FiStar className="text-3xl text-pink-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{club.followers_count || 0}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-white-200">
            <nav className="flex flex-wrap justify-center md:justify-start gap-4">
              {['about', 'events', 'members', 'posts'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 text-sm font-medium capitalize flex items-center transition-all duration-300 ${
                    activeTab === tab
                      ? 'border-b-2 border-gray-500 text-gray-700 bg-gray-200'
                      : 'text-white-500 hover:text-white-700 hover:bg-grey-50'
                  }`}
                >
                  {tab === 'about' && <FiGlobe className="mr-2" />}
                  {tab === 'events' && <FiCalendar className="mr-2" />}
                  {tab === 'members' && <FiUsers className="mr-2" />}
                  {tab === 'posts' && <FiStar className="mr-2" />}
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'about' && (
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">About {club.name}</h3>
                <p className="text-gray-700 leading-relaxed mb-8 text-lg">{club.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {club.contact_email && (
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold mb-4 text-gray-800 flex items-center">
                        <FiMail className="mr-2 text-blue-600" />
                        Contact Information
                      </h4>
                      <p className="text-gray-600">Email: {club.contact_email}</p>
                    </div>
                  )}

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-semibold mb-4 text-gray-800">Connect With Us</h4>
                    <div className="flex space-x-6">
                      <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                        <FiInstagram className="text-5xl" />
                      </a>
                      <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors">
                        <FiTwitter className="text-5xl" />
                      </a>
                      <a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">
                        <FiFacebook className="text-5xl" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">Upcoming Events</h3>
                <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <FiCalendar className="text-5xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Events section coming soon...</p>
                  <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Notify Me
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">Club Members</h3>
                <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <FiUsers className="text-5xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Members section coming soon...</p>
                </div>
              </div>
            )}

            {activeTab === 'posts' && (
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">Recent Posts</h3>
                <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <FiStar className="text-5xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Posts section coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubProfile;