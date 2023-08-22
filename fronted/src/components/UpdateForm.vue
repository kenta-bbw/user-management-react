<template>
  <div>
    <h2 class="form-title">Edit User</h2>
    <form @submit.prevent="saveChanges" class="user-form">
      <div class="form-group">
        <label for="firstname">Firstname:</label>
        <input type="text" id="firstname" v-model="editedUser.firstname" class="form-control" />
      </div>
      <div class="form-group">
        <label for="lastname">Lastname:</label>
        <input type="text" id="lastname" v-model="editedUser.lastname" class="form-control" />
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="text" id="phone" v-model="editedUser.phone" class="form-control" />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="editedUser.email" class="form-control" />
      </div>
      <div class="form-group">
        <label for="country">Country:</label>
        <input type="text" id="country" v-model="editedUser.country" class="form-control" />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ['userId'], 

  data() {
    return {
      originalUser: {}, 
      editedUser: {} 
    };
  },
  async mounted() {
    await this.fetchUser();
    this.editedUser = { ...this.originalUser }; 
  },
  methods: {
    async fetchUser() {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${this.userId}`);
        const data = await response.json();
        this.originalUser = data;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async saveChanges() {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${this.userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.editedUser)
        });

        if (response.ok) {
          console.log('Changes saved successfully');
          this.originalUser = { ...this.editedUser };
          this.$router.push({ name: 'Dashboard' });
        } else {
          console.error('Failed to save changes');
        }
      } catch (error) {
        console.error('Error saving changes:', error);
      }
    }
  }
};
</script>
<style scoped>
*{
  font-family: 'Roboto', sans-serif;
}
.form-title {
  text-align: center;
  font-family: 'Roboto', sans-serif; /* Example font, replace with your chosen font */
  font-size: 24px;
  margin-bottom: 20px;
}
.user-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  padding-right: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.form-group {
  margin-bottom: 15px;
}

.label {
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>