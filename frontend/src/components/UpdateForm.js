import React, { useState, useEffect } from 'react';

const EditUser = ({ userId }) => {
/* eslint-disable-next-line no-unused-vars */
  const [originalUser, setOriginalUser] = useState({});
  const [editedUser, setEditedUser] = useState({});
  const [showFirstnameErrorMessage, setShowFirstnameErrorMessage] = useState(false);
  const [showLastnameErrorMessage, setShowLastnameErrorMessage] = useState(false);
  const [showPhoneErrorMessage, setShowPhoneErrorMessage] = useState(false);
  const [showEmailErrorMessage, setShowEmailErrorMessage] = useState(false);

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

  const isFormInvalid =
    !editedUser.firstname ||
    !editedUser.lastname ||
    !editedUser.phone ||
    !editedUser.email ||
    !editedUser.country;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`);
        const data = await response.json();
        setOriginalUser(data);
        setEditedUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const saveChanges = async (e) => {
    e.preventDefault();

    setShowFirstnameErrorMessage(false);
    setShowLastnameErrorMessage(false); 
    setShowPhoneErrorMessage(false);
    setShowEmailErrorMessage(false);

    const validEmail = editedUser.email.replace(/[^a-zA-Z0-9@.]/g, '');
    if (validEmail !== editedUser.email) {
      setShowEmailErrorMessage(true);
      return;
    }
    setEditedUser({ ...editedUser, email: validEmail });

    const validFirstname = editedUser.firstname.replace(/[^a-zA-Z]/g, '');
    if (validFirstname !== editedUser.firstname) {
      setShowFirstnameErrorMessage(true);
      return;
    }
    setEditedUser({ ...editedUser, firstname: validFirstname });

    const validLastname = editedUser.lastname.replace(/[^a-zA-Z]/g, '');
    if (validLastname !== editedUser.lastname) {
      setShowLastnameErrorMessage(true);
      return;
    }
    setEditedUser({ ...editedUser, lastname: validLastname });

    const validPhone = editedUser.phone.replace(/[^0-9-() ]/g, '');
    if (validPhone !== editedUser.phone) {
      setShowPhoneErrorMessage(true);
      return;
    }
    setEditedUser({ ...editedUser, phone: validPhone });

    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedUser)
      });

      if (response.ok) {
        console.log('Changes saved successfully');
        setOriginalUser({ ...editedUser });
        // Navigate to the dashboard (you may need to adjust this based on your routing library)
      } else {
        console.error('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div>
      <h2 className="form-title">Edit User</h2>
      <form onSubmit={saveChanges} className="user-form">
        <div className="form-group">
          <label htmlFor="firstname">Firstname:</label>
          <input
            type="text"
            id="firstname"
            value={editedUser.firstname}
            onChange={(e) => setEditedUser({ ...editedUser, firstname: e.target.value })}
            className="form-control"
            required
          />
          {!editedUser.firstname && <span className="error-message">First name is required</span>}
          {showFirstnameErrorMessage && (
            <span className="error-message">Invalid firstname format | firstname can only contain <b>a-z A-Z</b></span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Lastname:</label>
          <input
            type="text"
            id="lastname"
            value={editedUser.lastname}
            onChange={(e) => setEditedUser({ ...editedUser, lastname: e.target.value })}
            className="form-control"
            required
          />
          {!editedUser.lastname && <span className="error-message">Last name is required</span>}
          {showLastnameErrorMessage && (
            <span className="error-message">Invalid lastname format | lastname can only contain <b>a-z A-Z</b></span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={editedUser.phone}
            onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
            className="form-control"
            required
          />
          {!editedUser.phone && <span className="error-message">Phone is required</span>}
          {showPhoneErrorMessage && (
            <span className="error-message">Invalid phone format | phone can only contain <b>0-9 - ()</b></span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={editedUser.email}
            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            className="form-control"
            required
          />
          {!editedUser.email && <span className="error-message">Email is required</span>}
          {showEmailErrorMessage && (
            <span className="error-message">Invalid email format | email cannot contain <b>"!#$%^&*()_-+=,</b></span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            value={editedUser.country}
            onChange={(e) => setEditedUser({ ...editedUser, country: e.target.value })}
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
          {!editedUser.country && <span className="error-message">Country is required</span>}
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={isFormInvalid}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};


export default EditUser;
