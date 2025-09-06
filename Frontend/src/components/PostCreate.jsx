import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useClubs } from '../hooks/useClubs';

const PostCreate = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { clubs } = useClubs();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'announcement',
    club_id: user?.club_id || ''
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
      // In real implementation, this would make an API call
      console.log('Creating post:', formData);

      // Simulate API call
      setTimeout(() => {
        navigate('/posts');
      }, 1000);
    } catch {
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Check if user has permission to create posts
  if (!user || (user.role !== 'club_admin' && user.role !== 'college_admin')) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Only club administrators can create posts.</p>
        </div>
      </div>
    );
  }

  const postTypes = [
    { value: 'announcement', label: 'Announcement' },
    { value: 'event', label: 'Event' },
    { value: 'recruitment', label: 'Recruitment' },
    { value: 'general', label: 'General' }
  ];

  // Filter clubs based on user role
  const availableClubs = clubs.filter(club => {
    if (user.role === 'college_admin') return true;
    if (user.role === 'club_admin') return club.id === user.club_id;
    return false;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Create New Post</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Post Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Post Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {postTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {user.role === 'college_admin' && (
            <div>
              <label htmlFor="club_id" className="block text-sm font-medium text-gray-700 mb-2">
                Post As (Club)
              </label>
              <select
                id="club_id"
                name="club_id"
                value={formData.club_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">College Administration</option>
                {availableClubs.map(club => (
                  <option key={club.id} value={club.id}>{club.name}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your post content here..."
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? 'Creating Post...' : 'Create Post'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/posts')}
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

export default PostCreate;
