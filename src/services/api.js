import axios from 'axios';

const API_BASE_URL = '/api';
const API_URL = import.meta.env.VITE_API_URL;


export const authAPI = {
  login: (credentials) => axios.post(`${API_BASE_URL}/login`, credentials),
  signup: (userData) => axios.post(`${API_BASE_URL}/users`, {
    name: userData.username,
    email: userData.email,
    password: userData.password,
    role: userData.role,
    collegeId: 1 
  }),
};


export const userAPI = {
  getUsers: () => axios.get(`${API_BASE_URL}/users`),
  getUserById: (id) => axios.get(`${API_BASE_URL}/users/${id}`),
  createUser: (userData) => axios.post(`${API_BASE_URL}/users`, userData),
};


export const clubAPI = {
  getClubs: (params) => axios.get(`${API_BASE_URL}/clubs`, { params }),
  getClub: (id) => axios.get(`${API_BASE_URL}/clubs/${id}`),
  createClub: (data) => axios.post(`${API_BASE_URL}/clubs`, {
    club_name: data.name,
    domain: data.domain,
    college_id: data.college_id,
    created_by: data.created_by
  }),
  updateClub: (id, clubData) => axios.put(`${API_BASE_URL}/clubs/${id}`, clubData),
  deleteClub: (id) => axios.delete(`${API_BASE_URL}/clubs/${id}`),
};


export const eventAPI = {
  getEvents: () => axios.get(`${API_BASE_URL}/events`),
  getEventsByClub: (clubId) => axios.get(`${API_BASE_URL}/events/club/${clubId}`),
  createEvent: (eventData) => axios.post(`${API_BASE_URL}/events`, eventData),
};


export const participantAPI = {
  registerParticipant: (participantData) => axios.post(`${API_BASE_URL}/participants`, participantData),
  getParticipantsByEvent: (eventId) => axios.get(`${API_BASE_URL}/participants/event/${eventId}`),
};
