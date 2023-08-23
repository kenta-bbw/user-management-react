<template>
  <div>
    <h2 class="form-title">Create New User</h2>
    <form @submit.prevent="createUser" class="user-form">
      <div class="form-group">
        <label for="name">Firstname:</label>
        <input type="text" id="firstname" v-model="newUser.firstname" class="form-control" required />
        <span v-if="!newUser.firstname" class="error-message">First name is required</span>
        <span v-if="showFirstnameErrorMessage" class="error-message">Invalid firstname format | firstname can only contain <b>a-z A-Z</b></span>
      </div>     
      <div class="form-group">
        <label for="name">Lastname:</label>
        <input type="text" id="lastname" v-model="newUser.lastname" class="form-control" required />
        <span v-if="!newUser.lastname" class="error-message">Last name is required</span>
        <span v-if="showLastnameErrorMessage" class="error-message">Invalid lastname format | lastname can only contain <b>a-z A-Z</b></span>
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="text" id="phone" v-model="newUser.phone" class="form-control" required />
        <span v-if="!newUser.phone" class="error-message">Phone is required</span>
        <span v-if="showPhoneErrorMessage" class="error-message">Invalid phone format | phone can only contain <b>0-9 - ()</b></span>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="newUser.email" class="form-control" required />
        <span v-if="!newUser.email" class="error-message">Email is required</span>
        <span v-if="showEmailErrorMessage" class="error-message">Invalid email format | email cannot contain <b>"!#$%^&*()_-+=,</b></span>
      </div>
      <div class="form-group">
        <label for="country">Country:</label>
        <input type="text" id="country" v-model="newUser.country" class="form-control" required />
        <span v-if="!newUser.country" class="error-message">Country is required</span>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary" :disabled="isFormInvalid || showErrorMessage">Create User</button>
        <button class="btn backbutton" @click="redirectToDashboard">Back</button>
      </div>
    </form>
      </div>
</template>

<script>
export default {
  data() {
    return {
      newUser: {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        country: ''
      },
      showFirstnameErrorMessage: false,
      showLastnameErrorMessage: false, 
      showPhoneErrorMessage: false,
      showEmailErrorMessage: false, 
    };
  },
  computed: {
    isFormInvalid() {
      return (
        !this.newUser.firstname ||
        !this.newUser.lastname ||
        !this.newUser.phone ||
        !this.newUser.email ||
        !this.newUser.country
      );
    }
  },
  methods: {
    async createUser() {
      // Reset all error messages before validation checks
      this.showFirstnameErrorMessage = false;
      this.showLastnameErrorMessage = false;
      this.showPhoneErrorMessage = false;
      this.showEmailErrorMessage = false;

      const validEmail = this.newUser.email.replace(/[^a-zA-Z0-9@.]/g, '');
      if (validEmail !== this.newUser.email) {
        this.showEmailErrorMessage = true; 
        return;
      }
      this.newUser.email = validEmail;

      const validFirstname = this.newUser.firstname.replace(/[^a-zA-Z]/g, '');
      if (validFirstname !== this.newUser.firstname) {
        this.showFirstnameErrorMessage = true; 
        return;
      }
      this.newUser.firstname = validFirstname;

      const validLastname = this.newUser.lastname.replace(/[^a-zA-Z]/g, '');
      if (validLastname !== this.newUser.lastname) {
        this.showLastnameErrorMessage = true; 
        return;
      }
      this.newUser.lastname = validLastname;

      const validPhone = this.newUser.phone.replace(/[^0-9-() ]/g, '');
      if (validPhone !== this.newUser.phone) {
        this.showPhoneErrorMessage = true; 
        return;
      }
      this.newUser.phone = validPhone;

      try {
        const response = await fetch('http://localhost:3000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newUser)
        });

        if (response.ok) {
          console.log('User created successfully');
          this.$router.push({ name: 'Dashboard' });
        } else {
          console.error('Failed to create user');
        }
      } catch (error) {
        console.error('Error creating user:', error);
      }
    },
    redirectToDashboard() {
      this.$router.push({ name: 'Dashboard' });
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
  font-family: 'Roboto', sans-serif;
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
.backbutton{
	background-color: #dc3545;
	color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}
.error-message{
color: red;
font-size: 12px;
}
</style>