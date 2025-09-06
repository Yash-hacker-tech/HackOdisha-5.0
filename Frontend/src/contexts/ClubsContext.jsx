import React, { createContext, useState, useEffect } from 'react';
import { clubAPI } from '../services/api';

const ClubsContext = createContext();

export const ClubsProvider = ({ children }) => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchClubs = async (params = {}) => {
    setLoading(true);
    try {
      const response = await clubAPI.getClubs(params);
      setClubs(response.data);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    } finally {
      setLoading(false);
    }
  };

  const createClub = async (clubData) => {
    try {
      const response = await clubAPI.createClub(clubData);
      setClubs(prev => [...prev, response.data]);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to create club' };
    }
  };

  const updateClub = async (id, clubData) => {
    try {
      const response = await clubAPI.updateClub(id, clubData);
      setClubs(prev => prev.map(club => club.id === id ? response.data : club));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to update club' };
    }
  };

  const deleteClub = async (id) => {
    try {
      await clubAPI.deleteClub(id);
      setClubs(prev => prev.filter(club => club.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete club' };
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <ClubsContext.Provider value={{ clubs, loading, fetchClubs, createClub, updateClub, deleteClub }}>
      {children}
    </ClubsContext.Provider>
  );
};
