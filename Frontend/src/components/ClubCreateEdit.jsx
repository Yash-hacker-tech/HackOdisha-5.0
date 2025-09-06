import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useClubs } from '../hooks/useClubs';
import { useUser } from '../hooks/useUser';

const ClubCreateEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clubs, createClub, updateClub } = useClubs();
  const { user } = useUser();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    college: '',
    contact_email: '',
    logo: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      const club = clubs.find(c => c.id === parseInt(id));
      if (club) {
        setFormData({
          name: club.name || '',
          description: club.description || '',
          category: club.category || '',
          college: club.college || '',
          contact_email: club.contact_email || '',
          logo: club.logo || ''
        });
      }
    } else if (user) {
      // Pre-fill college for new clubs
      setFormData(prev => ({
        ...prev,
        college: user.college || ''
      }));
    }
  }, [clubs, id, isEditing, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditing) {
        const result = await updateClub(parseInt(id), formData);
        if (result.success) {
          navigate(`/clubs/${id}`);
        } else {
          setError(result.error);
        }
      } else {
        const result = await createClub(formData);
        if (result.success) {
          navigate('/clubs');
        } else {
          setError(result.error);
        }
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Check permissions
  const canEdit = !isEditing || (user && (user.role === 'club_admin' || user.role === 'college_admin'));

  if (!canEdit) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to edit this club.</p>
        </div>
      </div>
    );
  }

  const categories = [
    'Technical', 'Cultural', 'Sports', 'Social', 'Academic',
    'Music', 'Dance', 'Drama', 'Photography', 'Literary', 'Other'
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {isEditing ? 'Edit Club' : 'Create New Club'}
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Club Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter club name"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your club..."
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-2">
              College *
            </label>
            <input
              type="text"
              id="college"
              name="college"
              value={formData.college}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter college name"
            />
          </div>

          <div>
            <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email
            </label>
            <input
              type="email"
              id="contact_email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="contact@club.com"
            />
          </div>

          <div>
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
              Logo URL
            </label>
            <input
              type="url"
              id="logo"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? 'Saving...' : (isEditing ? 'Update Club' : 'Create Club')}
            </button>
            <button
              type="button"
              onClick={() => navigate(isEditing ? `/clubs/${id}` : '/clubs')}
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

export default ClubCreateEdit;
