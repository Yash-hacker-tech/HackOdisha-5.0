import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { useUser } from '../hooks/useUser';
import { format } from 'date-fns';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, loading, registerForEvent, unregisterFromEvent } = useEvents();
  const { user } = useUser();
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    const foundEvent = events.find(e => e.id === parseInt(id));
    setEvent(foundEvent);
    // Check if user is registered (this would come from API in real implementation)
    setIsRegistered(foundEvent?.registered_users?.includes(user?.id) || false);
  }, [events, id, user]);

  const handleRegistration = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setRegistering(true);
    try {
      if (isRegistered) {
        const result = await unregisterFromEvent(event.id);
        if (result.success) {
          setIsRegistered(false);
        }
      } else {
        const result = await registerForEvent(event.id);
        if (result.success) {
          setIsRegistered(true);
        }
      }
    } catch {
      console.error('Registration error');
    } finally {
      setRegistering(false);
    }
  };

  const canEdit = user && (
    user.role === 'college_admin' ||
    (user.role === 'club_admin' && user.club_id === event?.club_id)
  );

  if (loading) {
    return <div className="text-center py-8">Loading event details...</div>;
  }

  if (!event) {
    return <div className="text-center py-8">Event not found.</div>;
  }

  const isEventFull = event.max_participants && event.registered_count >= event.max_participants;
  const isRegistrationOpen = new Date(event.registration_deadline) > new Date();
  const canRegister = user && user.role === 'student' && isRegistrationOpen && !isEventFull;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Event Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white text-center px-4">{event.title}</h1>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full capitalize">
                  {event.category}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">{event.club_name}</h2>
              </div>

              {canEdit && (
                <button
                  onClick={() => navigate(`/events/${event.id}/edit`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Edit Event
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Date & Time</h3>
                <p className="text-gray-600">
                  <strong>Start:</strong> {format(new Date(event.start_date), 'PPP p')}
                </p>
                <p className="text-gray-600">
                  <strong>End:</strong> {format(new Date(event.end_date), 'PPP p')}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Venue</h3>
                <p className="text-gray-600">{event.venue}</p>
              </div>
            </div>

            {event.max_participants && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Registration</h3>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    {event.registered_count || 0} / {event.max_participants} registered
                  </span>
                  {event.registration_deadline && (
                    <span className="text-sm text-gray-500">
                      Deadline: {format(new Date(event.registration_deadline), 'PPP p')}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Registration Button */}
            {canRegister && (
              <div className="mb-6">
                <button
                  onClick={handleRegistration}
                  disabled={registering}
                  className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
                    isRegistered
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {registering
                    ? 'Processing...'
                    : isRegistered
                      ? 'Unregister'
                      : 'Register for Event'
                  }
                </button>
              </div>
            )}

            {!canRegister && user && user.role === 'student' && (
              <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                {isEventFull
                  ? 'This event is full.'
                  : !isRegistrationOpen
                    ? 'Registration for this event has closed.'
                    : 'Registration is not available for your role.'
                }
              </div>
            )}
          </div>
        </div>

        {/* Event Description */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">About This Event</h3>
          <p className="text-gray-700 leading-relaxed">{event.description}</p>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">Event Details</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Category:</strong> <span className="capitalize">{event.category}</span></p>
              <p><strong>Organized by:</strong> {event.club_name}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              {event.max_participants && (
                <p><strong>Capacity:</strong> {event.max_participants} participants</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Club:</strong> {event.club_name}</p>
              {event.contact_email && (
                <p><strong>Email:</strong> {event.contact_email}</p>
              )}
              <p className="text-gray-500 mt-4">
                For any queries regarding this event, please contact the organizing club.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
