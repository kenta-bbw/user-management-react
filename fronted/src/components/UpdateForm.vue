<template>
  <div>
    <h2 class="form-title">Edit User</h2>
    <form @submit.prevent="saveChanges" class="user-form">
      <div class="form-group">
        <label for="name">Firstname:</label>
        <input type="text" id="firstname" v-model="editedUser.firstname" class="form-control" required />
        <span v-if="!editedUser.firstname" class="error-message">First name is required</span>
        <span v-if="showFirstnameErrorMessage" class="error-message">Invalid firstname format | firstname can only contain <b>a-z A-Z</b></span>
      </div>     
      <div class="form-group">
        <label for="name">Lastname:</label>
        <input type="text" id="lastname" v-model="editedUser.lastname" class="form-control" required />
        <span v-if="!editedUser.lastname" class="error-message">Last name is required</span>
        <span v-if="showLastnameErrorMessage" class="error-message">Invalid lastname format | lastname can only contain <b>a-z A-Z</b></span>
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="text" id="phone" v-model="editedUser.phone" class="form-control" required />
        <span v-if="!editedUser.phone" class="error-message">Phone is required</span>
        <span v-if="showPhoneErrorMessage" class="error-message">Invalid phone format | phone can only contain <b>0-9 - ()</b></span>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="editedUser.email" class="form-control" required />
        <span v-if="!editedUser.email" class="error-message">Email is required</span>
        <span v-if="showEmailErrorMessage" class="error-message">Invalid email format | email cannot contain <b>"!#$%^&*()_-+=,</b></span>
      </div>
      <div class="form-group">
      <label for="country">Country:</label>
      <select id="country" v-model="editedUser.country" class="form-control" required>
        <option value="">Select a country</option>
        <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
      </select>
      <span v-if="!editedUser.country" class="error-message">Country is required</span>
    </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary" :disabled="isFormInvalid">Save Changes</button>
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
      editedUser: {},
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
      showFirstnameErrorMessage:false,
      showLastnameErrorMessage: false,
      showPhoneErrorMessage:false,
      showEmailErrorMessa: false,
    };
  },
  computed: {
    isFormInvalid() {
      return (
        !this.editedUser.firstname ||
        !this.editedUser.lastname ||
        !this.editedUser.phone ||
        !this.editedUser.email ||
        !this.editedUser.country
      );
    }
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
      this.showFirstnameErrorMessage = false;
      this.showLastnameErrorMessage = false;
      this.showPhoneErrorMessage = false;
      this.showEmailErrorMessage = false;

      const validEmail = this.editedUser.email.replace(/[^a-zA-Z0-9@.]/g, '');
      if (validEmail !== this.editedUser.email) {
        this.showEmailErrorMessage = true; 
        return;
      }
      this.editedUser.email = validEmail;

      const validFirstname = this.editedUser.firstname.replace(/[^a-zA-Z]/g, '');
      if (validFirstname !== this.editedUser.firstname) {
        this.showFirstnameErrorMessage = true; 
        return;
      }
      this.editedUser.firstname = validFirstname;

      const validLastname = this.editedUser.lastname.replace(/[^a-zA-Z]/g, '');
      if (validLastname !== this.editedUser.lastname) {
        this.showLastnameErrorMessage = true; 
        return;
      }
      this.editedUser.lastname = validLastname;

      const validPhone = this.editedUser.phone.replace(/[^0-9-() ]/g, '');
      if (validPhone !== this.editedUser.phone) {
        this.showPhoneErrorMessage = true; 
        return;
      }
      this.editedUser.phone = validPhone;
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
.error-message{
color: red;
font-size: 12px;
}
</style>