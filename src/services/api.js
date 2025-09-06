import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Adjust to your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
};

// Club APIs
export const clubAPI = {
  getClubs: (params) => api.get('/clubs', { params }),
  getClub: (id) => api.get(`/clubs/${id}`),
  createClub: (clubData) => api.post('/clubs', clubData),
  updateClub: (id, clubData) => api.put(`/clubs/${id}`, clubData),
  deleteClub: (id) => api.delete(`/clubs/${id}`),
};

// Event APIs
export const eventAPI = {
  getEvents: (params) => api.get('/events', { params }),
  getEvent: (id) => api.get(`/events/${id}`),
  createEvent: (eventData) => api.post('/events', eventData),
  updateEvent: (id, eventData) => api.put(`/events/${id}`, eventData),
  deleteEvent: (id) => api.delete(`/events/${id}`),
  registerForEvent: (id) => api.post(`/events/${id}/register`),
};

// Collaboration APIs
export const collabAPI = {
  getRequests: () => api.get('/collab/requests'),
  sendRequest: (data) => api.post('/collab/requests', data),
  acceptRequest: (id) => api.put(`/collab/requests/${id}/accept`),
  rejectRequest: (id) => api.put(`/collab/requests/${id}/reject`),
};

// Posts APIs
export const postAPI = {
  getPosts: (params) => api.get('/posts', { params }),
  getPost: (id) => api.get(`/posts/${id}`),
  createPost: (postData) => api.post('/posts', postData),
  updatePost: (id, postData) => api.put(`/posts/${id}`, postData),
  deletePost: (id) => api.delete(`/posts/${id}`),
};

// Notifications APIs
export const notificationAPI = {
  getNotifications: () => api.get('/notifications'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
};

// Search APIs
export const searchAPI = {
  searchClubs: (query) => api.get('/search/clubs', { params: { q: query } }),
  searchEvents: (query) => api.get('/search/events', { params: { q: query } }),
};

export default api;
