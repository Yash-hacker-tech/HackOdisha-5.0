import React, { useState } from 'react';
import { useClubs } from '../hooks/useClubs';
import ClubCard from './ClubCard';

const ClubList = () => {
  const { clubs, loading, fetchClubs } = useClubs();
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');



  const filteredClubs = clubs.filter(club => {
    const matchesCollege = !selectedCollege || club.college === selectedCollege;
    const matchesCategory = !selectedCategory || club.category === selectedCategory;
    const matchesSearch = !searchTerm ||
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCollege && matchesCategory && matchesSearch;
  });

  const colleges = [...new Set(clubs.map(club => club.college))];
  const categories = [...new Set(clubs.map(club => club.category))];

  if (loading) {
    return <div className="text-center py-8">Loading clubs...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">College Clubs</h1>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        <div className="flex flex-col">
          <label className="mb-2 font-medium">College:</label>
          <select
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Colleges</option>
            {colleges.map(college => (
              <option key={college} value={college}>{college}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Search:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search clubs..."
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Clubs Grid */}
      {filteredClubs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No clubs found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map(club => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClubList;