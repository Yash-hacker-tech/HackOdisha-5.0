import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch, placeholder = "Search clubs, events, posts..." }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query, searchType);
      } else {
        // Navigate to search results page
        navigate(`/search?q=${encodeURIComponent(query)}&type=${searchType}`);
      }
    }
  };

  const searchTypes = [
    { value: 'all', label: 'All' },
    { value: 'clubs', label: 'Clubs' },
    { value: 'events', label: 'Events' },
    { value: 'posts', label: 'Posts' },
    { value: 'users', label: 'Users' }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex gap-2">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          >
            {searchTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Search
          </button>
        </div>
      </form>

      {/* Quick search suggestions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-sm text-gray-600">Quick search:</span>
        {['Computer Science', 'Robotics', 'Music', 'Sports', 'Tech Fest'].map(term => (
          <button
            key={term}
            onClick={() => {
              setQuery(term);
              setSearchType('all');
            }}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
