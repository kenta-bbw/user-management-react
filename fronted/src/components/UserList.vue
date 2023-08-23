<template>
  <div>
    <header class="dashboard-header">
      <h1>Dashboard</h1>
      <div class="search-filter-container">
        <div class="search-bar">
          <input type="text" v-model="searchQuery" @input="searchUsers" @keydown.enter="searchUsers" placeholder="Search by name">
          <i class="fas fa-search"></i>
        </div>
        <div class="filter-dropdown">
          <select v-model="selectedCountry" @change="filterUsers">
            <option value="">All Countries</option>
            <option v-for="country in countries" :key="country" :value="country">
              {{ country }}
            </option>
          </select>
          <i class="fas fa-filter"></i>
        </div>
      </div>
    </header>
    <table class="user-table">
      <thead>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Country</th>
          <th><button class="action-button createButton" @click="redirectToCreateForm">Create</button></th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
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
      searchQuery: '',
      filteredUsers: [], 
      selectedCountry: '',
      countries: [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
        "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
        "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
        "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the",
        "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
        "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
        "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
        "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
        "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
        "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali",
        "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
        "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria",
        "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
        "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
        "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
        "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
        "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
        "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
        "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
      ], 
    };
  },
  mounted() {
    this.filterUsers();
    this.fetchUsers();
  },
  methods: {

    async fetchUsers() {
  try {
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();
    this.filteredUsers = data;
    this.users = data;
    console.log('Fetched Users:', this.filteredUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}
,
    filterUsers() {
      console.log('Selected Country:', this.selectedCountry);
      console.log('Users:', this.filteredUsers);
      if (this.selectedCountry === '') {
        this.filteredUsers = this.users;
      } else {
        this.filteredUsers = this.users.filter(user => {
          return user.country.toLowerCase() === this.selectedCountry.toLowerCase();
        });
      }
    },

    searchUsers() {
  console.log('searching...');
  const query = this.searchQuery.toLowerCase();
  if (query === '') {
        this.filteredUsers = this.users;
      } else {
        this.filteredUsers = this.users.filter(user => {
          return (
          (user.firstname && user.firstname.toLowerCase().includes(query)) ||
          (user.lastname && user.lastname.toLowerCase().includes(query))
          );
        });
      }
    },
    async deleteUser(userId) {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          this.users = this.users.filter(user => user.id !== userId);
          this.filteredUsers = this.users.filter(user => user.id !== userId);
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

    },    
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

.search-filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 5px 10px;
}

.search-bar input {
  border: none;
  background-color: transparent;
  flex: 1;
  padding: 5px;
  outline: none;
  font-size: 14px;
}

.filter-dropdown {
  position: relative;
  display: inline-block;
  margin-left: 10px;
}

.filter-dropdown select {
  appearance: none;
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
}

.fa-search,
.fa-filter {
  color: #666;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
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

