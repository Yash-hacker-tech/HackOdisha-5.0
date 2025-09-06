import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { useUser } from '../hooks/useUser';

const EventRegistration = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, registerForEvent } = useEvents();
  const { user } = useUser();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    additional_info: '',
    dietary_restrictions: '',
    emergency_contact: '',
    tshirt_size: ''
  });

  useEffect(() => {
    const foundEvent = events.find(e => e.id === parseInt(id));
    setEvent(foundEvent);
  }, [events, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const registrationData = {
        event_id: event.id,
        user_id: user.id,
        ...formData
      };

      const result = await registerForEvent(registrationData);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate(`/events/${event.id}`);
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  if (user.role !== 'student') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Only students can register for events.</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return <div className="text-center py-8">Loading event...</div>;
  }

  const isEventFull = event.max_participants && event.registered_count >= event.max_participants;
  const isRegistrationOpen = new Date(event.registration_deadline) > new Date();
  const isAlreadyRegistered = event.registered_users?.includes(user.id);

  if (isAlreadyRegistered) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Already Registered</h2>
          <p className="text-gray-600 mb-4">You are already registered for this event.</p>
          <button
            onClick={() => navigate(`/events/${event.id}`)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            View Event Details
          </button>
        </div>
      </div>
    );
  }

  if (isEventFull) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Full</h2>
          <p className="text-gray-600 mb-4">This event has reached its maximum capacity.</p>
          <button
            onClick={() => navigate('/events')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Browse Other Events
          </button>
        </div>
      </div>
    );
  }

  if (!isRegistrationOpen) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Closed</h2>
          <p className="text-gray-600 mb-4">Registration for this event has closed.</p>
          <button
            onClick={() => navigate('/events')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Browse Other Events
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
          <p className="text-gray-600 mb-4">You have successfully registered for {event.title}.</p>
          <p className="text-sm text-gray-500">Redirecting to event details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Register for Event</h1>

        {/* Event Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
          <p className="text-gray-600 mb-2">{event.description}</p>
          <div className="text-sm text-gray-500">
            <p><strong>Date:</strong> {new Date(event.start_date).toLocaleDateString()}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Organized by:</strong> {event.club_name}</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="additional_info" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Information
            </label>
            <textarea
              id="additional_info"
              name="additional_info"
              value={formData.additional_info}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any additional information you'd like to share..."
            />
          </div>

          <div>
            <label htmlFor="dietary_restrictions" className="block text-sm font-medium text-gray-700 mb-2">
              Dietary Restrictions
            </label>
            <input
              type="text"
              id="dietary_restrictions"
              name="dietary_restrictions"
              value={formData.dietary_restrictions}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., vegetarian, vegan, allergies"
            />
          </div>

          <div>
            <label htmlFor="emergency_contact" className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact *
            </label>
            <input
              type="text"
              id="emergency_contact"
              name="emergency_contact"
              value={formData.emergency_contact}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name and phone number"
            />
          </div>

          <div>
            <label htmlFor="tshirt_size" className="block text-sm font-medium text-gray-700 mb-2">
              T-Shirt Size
            </label>
            <select
              id="tshirt_size"
              name="tshirt_size"
              value={formData.tshirt_size}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select size</option>
              <option value="xs">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
            </select>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
            >
              {loading ? 'Registering...' : 'Complete Registration'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/events/${event.id}`)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventRegistration;
