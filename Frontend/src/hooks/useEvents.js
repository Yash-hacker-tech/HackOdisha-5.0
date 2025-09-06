import { useContext } from 'react';
import { EventsContext } from '../contexts/EventsContext';

export const useEvents = () => useContext(EventsContext);
