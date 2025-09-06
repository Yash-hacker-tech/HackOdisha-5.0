import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useClubs } from '../hooks/useClubs';
import { useUser } from '../hooks/useUser';

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
    return <div className="text-center py-8">Loading club details...</div>;
  }

  if (!club) {
    return <div className="text-center py-8">Club not found.</div>;
  }

  const isClubAdmin = user && user.role === 'club_admin' && user.club_id === club.id;
  const isCollegeAdmin = user && user.role === 'college_admin';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Club Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          {club.logo ? (
            <img
              src={club.logo}
              alt={`${club.name} logo`}
              className="w-32 h-32 object-contain"
            />
          ) : (
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-blue-600">
                {club.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{club.name}</h1>
              <p className="text-gray-600 mb-2">{club.college}</p>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {club.category}
              </span>
            </div>

            {(isClubAdmin || isCollegeAdmin) && (
              <Link
                to={`/clubs/${club.id}/edit`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Edit Club
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{club.members_count || 0}</div>
              <div className="text-sm text-gray-600">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{club.events_count || 0}</div>
              <div className="text-sm text-gray-600">Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{club.followers_count || 0}</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {['about', 'events', 'members', 'posts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'about' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">About</h3>
              <p className="text-gray-700 leading-relaxed">{club.description}</p>

              {club.contact_email && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Contact</h4>
                  <p className="text-gray-600">Email: {club.contact_email}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
              <div className="text-center py-8 text-gray-500">
                Events section coming soon...
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Club Members</h3>
              <div className="text-center py-8 text-gray-500">
                Members section coming soon...
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
              <div className="text-center py-8 text-gray-500">
                Posts section coming soon...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubProfile;
