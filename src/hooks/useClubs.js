import { useContext } from 'react';
import { ClubsContext } from '../contexts/ClubsContext';

export const useClubs = () => useContext(ClubsContext);
