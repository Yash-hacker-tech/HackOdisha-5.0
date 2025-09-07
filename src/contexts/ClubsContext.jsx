import React, { createContext, useState, useEffect } from 'react';
import { clubAPI } from '../services/api';

const ClubsContext = createContext();

export { ClubsContext };

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

      const mockClubs = [
        {
          id: 1,
          name: 'Computer Science Club',
          description: 'A club for computer science enthusiasts to learn and collaborate on projects.',
          category: 'Technology',
          college: 'NIT Trichy',
          members_count: 45,
          created_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 2,
          name: 'Robotics Club',
          description: 'Building robots and participating in robotics competitions.',
          category: 'Technology',
          college: 'NIT Trichy',
          members_count: 32,
          created_at: '2024-01-02T00:00:00Z'
        },
        {
          id: 3,
          name: 'Music Club',
          description: 'For music lovers to practice and perform various musical instruments.',
          category: 'Arts',
          college: 'NIT Trichy',
          members_count: 28,
          created_at: '2024-01-03T00:00:00Z'
        },
        {
          id: 4,
          name: 'Photography Club',
          description: 'Capturing moments and learning photography techniques.',
          category: 'Arts',
          college: 'NIT Trichy',
          members_count: 22,
          created_at: '2024-01-04T00:00:00Z'
        },
        {
          id: 5,
          name: 'Sports Club',
          description: 'Organizing various sports activities and tournaments.',
          category: 'Sports',
          college: 'NIT Trichy',
          members_count: 67,
          created_at: '2024-01-05T00:00:00Z'
        }
      ];
      setClubs(mockClubs);
    } finally {
      setLoading(false);
    }
  };

   const createClub = async ({ name, domain, college_id, created_by }) => {
  try {
    const res = await axios.post("/clubs", {
      name,
      domain,
      college_id,
      created_by
    });
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || "Failed to create club" };
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