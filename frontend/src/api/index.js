const baseURL = 'http://localhost:3000/api';

const apiClient = {
  getUsers: () => {
    return fetch(`${baseURL}/users`).then(response => response.json());
  },
  updateUser: (userId, userData) => {
    return fetch(`${baseURL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }).then(response => response.json());
  },
  deleteUser: userId => {
    return fetch(`${baseURL}/users/${userId}`, {
      method: 'DELETE',
    }).then(response => response.json());
  },
};

export default apiClient;
