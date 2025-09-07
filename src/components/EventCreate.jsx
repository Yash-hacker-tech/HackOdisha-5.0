import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { useUser } from '../hooks/useUser';
import { useClubs } from '../hooks/useClubs';

const EventCreate = () => {
  const navigate = useNavigate();
  const { createEvent } = useEvents();
  const { user } = useUser();
  const { clubs } = useClubs();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    venue: '',
    category: 'intra-college',
    club_id: user?.club_id || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
   
      const name = formData.title;
      const date = formData.start_date.split('T')[0]; 
      const start = formData.start_date.split('T')[1] || '00:00:00';
      const end = formData.end_date.split('T')[1] || '00:00:00';
      const location = formData.venue;
      const description = formData.description;
      const clubId = Number(formData.club_id);
      const createdBy = user?.username || user?.user_name || 'Unknown';
      const visibility = formData.category;

      console.log({ name, date, start, end, location, description, clubId, createdBy, visibility });

      const result = await createEvent(name, date, start, end, location, description, clubId, createdBy, visibility);

      if (result) {
        navigate('/events');
      }
    } catch (err) {
      console.error("🔥 Event creation error:", err);
      setError('Failed to create event. Check console for details.');
    } finally {
      setLoading(false);
    }
  };


  const availableClubs = clubs.filter(club => {
    if (user?.role === 'super_admin') return true;
    if (user?.role === 'club_admin') return club.id === user.club_id;
    return false;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Create New Event</h1>

        {error && <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2">Start Date & Time *</label>
              <input
                type="datetime-local"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-2">End Date & Time *</label>
              <input
                type="datetime-local"
                id="end_date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-2">Venue *</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Visibility *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="intra-college">Intra-College</option>
              <option value="inter-college">Inter-College</option>
              <option value="public">Public</option>
            </select>
          </div>

          {user?.role === 'super_admin' && (
            <div>
              <label htmlFor="club_id" className="block text-sm font-medium text-gray-700 mb-2">Organizing Club *</label>
              <select
                id="club_id"
                name="club_id"
                value={formData.club_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select club</option>
                {availableClubs.map(club => (
                  <option key={club.id} value={club.id}>{club.name}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? 'Creating Event...' : 'Create Event'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/events')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventCreate;
