
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
    if (!events || events.length === 0) return;

    const foundEvent = events.find(e => e.id === parseInt(id));
    setEvent(foundEvent);
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
        if (result.success) setIsRegistered(false);
      } else {
        const result = await registerForEvent(event.id);
        if (result.success) setIsRegistered(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading event details...</div>;
  if (!event) return <div className="text-center py-8">Event not found.</div>;

  const isEventFull = event.max_participants && event.registered_count >= event.max_participants;
  const isRegistrationOpen = event.registration_deadline ? new Date(event.registration_deadline) > new Date() : true;
  const canRegister = user?.role === 'student' && isRegistrationOpen && !isEventFull;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Start:</strong> {format(new Date(event.start_date), 'PPP p')}</p>
      <p><strong>End:</strong> {format(new Date(event.end_date), 'PPP p')}</p>
      <p><strong>Registered:</strong> {event.registered_count} / {event.max_participants || '∞'}</p>

      {canRegister && (
        <button
          onClick={handleRegistration}
          disabled={registering}
          className={`mt-4 px-6 py-2 rounded-md text-white ${isRegistered ? 'bg-red-600' : 'bg-green-600'}`}
        >
          {registering ? 'Processing...' : isRegistered ? 'Unregister' : 'Register'}
        </button>
      )}
    </div>
  );
};

export default EventDetails;
