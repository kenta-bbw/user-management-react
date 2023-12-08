// Import React and useState
import React, { useState } from 'react';

// Create CreateUser component
const CreateUser = () => {
  // Define initial state for the new user and error messages
  const [newUser, setNewUser] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    country: ''
  });

  const [showFirstnameErrorMessage, setShowFirstnameErrorMessage] = useState(false);
  const [showLastnameErrorMessage, setShowLastnameErrorMessage] = useState(false);
  const [showPhoneErrorMessage, setShowPhoneErrorMessage] = useState(false);
  const [showEmailErrorMessage, setShowEmailErrorMessage] = useState(false);

  // Define the list of countries
  const countries = [
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
  ];

  // Check if the form is invalid
  const isFormInvalid =
    !newUser.firstname ||
    !newUser.lastname ||
    !newUser.phone ||
    !newUser.email ||
    !newUser.country;

    const showErrorMessage = (
        showFirstnameErrorMessage ||
        showLastnameErrorMessage ||
        showPhoneErrorMessage ||
        showEmailErrorMessage
      );    

  // Create user function with validation
  const createUser = async (e) => {
    e.preventDefault();

    // Reset all error messages before validation checks
    setShowFirstnameErrorMessage(false);
    setShowLastnameErrorMessage(false);
    setShowPhoneErrorMessage(false);
    setShowEmailErrorMessage(false);

    // Validate and sanitize email
    const validEmail = newUser.email.replace(/[^a-zA-Z0-9@.]/g, '');
    if (validEmail !== newUser.email) {
      setShowEmailErrorMessage(true);
      return;
    }

    // Validate and sanitize firstname
    const validFirstname = newUser.firstname.replace(/[^a-zA-Z]/g, '');
    if (validFirstname !== newUser.firstname) {
      setShowFirstnameErrorMessage(true);
      return;
    }

    // Validate and sanitize lastname
    const validLastname = newUser.lastname.replace(/[^a-zA-Z]/g, '');
    if (validLastname !== newUser.lastname) {
      setShowLastnameErrorMessage(true);
      return;
    }

    // Validate and sanitize phone
    const validPhone = newUser.phone.replace(/[^0-9-() ]/g, '');
    if (validPhone !== newUser.phone) {
      setShowPhoneErrorMessage(true);
      return;
    }

    // Set sanitized values to the newUser state
    setNewUser({
      ...newUser,
      email: validEmail,
      firstname: validFirstname,
      lastname: validLastname,
      phone: validPhone
    });

    try {
      // Make API request to create a new user
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      // Check if the request was successful
      if (response.ok) {
        console.log('User created successfully');
        // Redirect to the dashboard
        redirectToDashboard();
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Redirect to the dashboard function
  const redirectToDashboard = () => {
    window.location.href = '/dashboard';
  };

  // Render the component
  return (
    <div>
      <h2 className="form-title">Create New User</h2>
      <form onSubmit={createUser} className="user-form">
        <div className="form-group">
          <label htmlFor="firstname">Firstname:</label>
          <input
            type="text"
            id="firstname"
            value={newUser.firstname}
            onChange={(e) => setNewUser({ ...newUser, firstname: e.target.value })}
            className="form-control"
            required
          />
          {!newUser.firstname && <span className="error-message">First name is required</span>}
          {showFirstnameErrorMessage && (
            <span className="error-message">Invalid firstname format | firstname can only contain <b>a-z A-Z</b></span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Lastname:</label>
          <input
            type="text"
            id="lastname"
            value={newUser.lastname}
            onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
            className="form-control"
            required
          />
          {!newUser.lastname && <span className="error-message">Last name is required</span>}
          {showLastnameErrorMessage && (
            <span className="error-message">Invalid lastname format | lastname can only contain <b>a-z A-Z</b></span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            className="form-control"
            required
          />
          {!newUser.phone && <span className="error-message">Phone is required</span>}
          {showPhoneErrorMessage && (
            <span className="error-message">Invalid phone format | phone can only contain <b>0-9 - ()</b></span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="form-control"
            required
          />
          {!newUser.email && <span className="error-message">Email is required</span>}
          {showEmailErrorMessage && (
            <span className="error-message">Invalid email format | email cannot contain <b>"!#$%^&*()_-+=,</b></span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            value={newUser.country}
            onChange={(e) => setNewUser({ ...newUser, country: e.target.value })}
            className="form-control"
            required
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {!newUser.country && <span className="error-message">Country is required</span>}
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={isFormInvalid || showErrorMessage}>
            Create User
          </button>
          <button className="btn backbutton" onClick={redirectToDashboard}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
