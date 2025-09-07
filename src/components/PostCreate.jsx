
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
      console.log('Creating post:', formData);

      setTimeout(() => {
        navigate('/posts');
      }, 1000);
    } catch {
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user || (user.role !== 'club_admin' && user.role !== 'super_admin')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-10 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">Access Denied</h2>
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

  const availableClubs = clubs.filter(club => {
    if (user.role === 'super_admin') return true;
    if (user.role === 'club_admin') return club.id === user.club_id;
    return false;
  });

  return (
    <div className="flex justify-center py-12 bg-gray-50 min-h-screen">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Create New Post</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-md">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            >
              {postTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {user.role === 'super_admin' && (
            <div>
              <label htmlFor="club_id" className="block text-sm font-medium text-gray-700 mb-2">
                Post As (Club)
              </label>
              <select
                id="club_id"
                name="club_id"
                value={formData.club_id}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              placeholder="Write your post content here..."
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              {loading ? 'Creating Post...' : 'Create Post'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/posts')}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 font-medium"
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
