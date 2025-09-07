
import React from 'react';
import { Link } from 'react-router-dom';

const ClubCard = ({ club }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Club Image */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        {club.logo ? (
          <img
            src={club.logo}
            alt={`${club.name} logo`}
            className="w-24 h-24 object-contain"
          />
        ) : (
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">
              {club.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Club Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{club.name}</h3>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {club.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3">{club.college}</p>

        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {club.description}
        </p>

        {/* Club Stats */}
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>{club.members_count || 0} members</span>
          <span>{club.events_count || 0} events</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/clubs/${club.id}`}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-center text-sm font-medium"
          >
            View Details
          </Link>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 text-sm">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
