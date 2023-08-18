import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default {
  getUsers() {
    return apiClient.get('/users');
  },
  updateUser(userId, userData) {
    return apiClient.put(`/users/${userId}`, userData);
  },
  deleteUser(userId) {
    return apiClient.delete(`/users/${userId}`);
  }
};
