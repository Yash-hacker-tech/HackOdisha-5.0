import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useEvents } from '../hooks/useEvents';
import { useUser } from '../hooks/useUser';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const EventCalendar = () => {
  const { events, loading, fetchEvents } = useEvents();
  const { user } = useUser();
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const calendarEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    start: new Date(event.start_date),
    end: new Date(event.end_date),
    resource: event
  }));

  const handleSelectEvent = (event) => {
    setSelectedEvent(event.resource);
  };

  const handleSelectSlot = ({ start, end }) => {
    if (user && (user.role === 'club_admin' || user.role === 'college_admin')) {
      
      console.log('Selected time slot:', { start, end });
    }
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = '#3174ad'; 

    if (event.resource.category === 'technical') {
      backgroundColor = '#10b981'; 
    } else if (event.resource.category === 'cultural') {
      backgroundColor = '#f59e0b'; 
    } else if (event.resource.category === 'sports') {
      backgroundColor = '#ef4444'; 
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  if (loading) {
    return <div className="text-center py-8">Loading events...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Event Calendar</h1>
        <div className="flex gap-4 mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
            <span className="text-sm">General</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-600 rounded mr-2"></div>
            <span className="text-sm">Technical</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-600 rounded mr-2"></div>
            <span className="text-sm">Cultural</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-600 rounded mr-2"></div>
            <span className="text-sm">Sports</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable={user && (user.role === 'club_admin' || user.role === 'college_admin')}
          eventPropGetter={eventStyleGetter}
          views={['month', 'week', 'day', 'agenda']}
          defaultView="month"
        />
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">{selectedEvent.title}</h3>
            <p className="text-gray-600 mb-2">{selectedEvent.description}</p>
            <div className="text-sm text-gray-500 mb-4">
              <p><strong>Club:</strong> {selectedEvent.club_name}</p>
              <p><strong>Start:</strong> {format(new Date(selectedEvent.start_date), 'PPP p')}</p>
              <p><strong>End:</strong> {format(new Date(selectedEvent.end_date), 'PPP p')}</p>
              <p><strong>Venue:</strong> {selectedEvent.venue}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
