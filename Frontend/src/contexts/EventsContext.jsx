import React, { createContext, useState, useEffect } from 'react';
import { eventAPI } from '../services/api';

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async (params = {}) => {
    setLoading(true);
    try {
      const response = await eventAPI.getEvents(params);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData) => {
    try {
      const response = await eventAPI.createEvent(eventData);
      setEvents(prev => [...prev, response.data]);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to create event' };
    }
  };

  const updateEvent = async (id, eventData) => {
    try {
      const response = await eventAPI.updateEvent(id, eventData);
      setEvents(prev => prev.map(event => event.id === id ? response.data : event));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to update event' };
    }
  };

  const deleteEvent = async (id) => {
    try {
      await eventAPI.deleteEvent(id);
      setEvents(prev => prev.filter(event => event.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete event' };
    }
  };

  const registerForEvent = async (id) => {
    try {
      await eventAPI.registerForEvent(id);
      // Update the event's registered users or something
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to register' };
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventsContext.Provider value={{ events, loading, fetchEvents, createEvent, updateEvent, deleteEvent, registerForEvent }}>
      {children}
    </EventsContext.Provider>
  );
};
