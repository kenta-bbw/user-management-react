<template>
  <div>
    <header class="dashboard-header">
      <h1>Dashboard</h1>
    </header>
    <table class="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Country</th>
          <th><button class="action-button createButton" @click="redirectToCreateForm">Create</button></th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.country }}</td>
          <td>
            <button class="action-button updateButton" @click="redirectToUpdateForm(user.id)">Update</button>
          </td>
          <td>
            <button class="action-button deleteButton" @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      searchInput: ''
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:3000/api/users');
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async deleteUser(userId) {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          this.users = this.users.filter(user => user.id !== userId);
          console.log('User deleted successfully');
        } else {
          console.error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    redirectToUpdateForm(userId) {
      this.$router.push({ name: 'EditUser', params: { userId } });
    },
    redirectToCreateForm(){
      this.$router.push({ name: 'CreateUser'});
    },    
  }
  };
</script>


<style scoped>
*{
  font-family: 'Roboto', sans-serif;
}
.dashboard-header {
  background: linear-gradient(45deg, #007bff, #00bcd4);
  color: white;
  text-align: center;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px 5px 0 0;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.action-button {
  padding: 6px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.action-button:hover {
  opacity: 0.9;
}

.createButton {
  background-color: #28a745;
  color: white;
}

.updateButton {
  background-color: #007bff;
  color: white;
}

.deleteButton {
  background-color: #dc3545;
  color: white;
}
</style>

