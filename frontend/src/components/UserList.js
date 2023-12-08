  import React, { useState, useEffect } from 'react';
  import { useHistory } from 'react-router-dom';
  import "./UserList.css";
  
  const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [loading, setLoading] = useState(true);
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
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/users');
          const data = await response.json();
          setFilteredUsers(data);
          setUsers(data);
          setLoading(false);
          console.log('Fetched Users:', data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
      filterUsers();
      // eslint-disable-next-line
    }, [selectedCountry, users, searchQuery]);
  
    const filterUsers = () => {
      if (selectedCountry === '') {
        setFilteredUsers([...users]);
      } else {
        setFilteredUsers([...users.filter((user) => user.country.toLowerCase() === selectedCountry.toLowerCase())]);
      }
    };
  
    const searchUsers = () => {
      const query = searchQuery.toLowerCase();
      if (query === '') {
        setFilteredUsers([...users]);
      } else {
        setFilteredUsers([...users.filter((user) => (user.firstname && user.firstname.toLowerCase().includes(query)) ||
          (user.lastname && user.lastname.toLowerCase().includes(query)))]);
      }
    };
  
    const deleteUser = async (userId) => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          setUsers([...users.filter((user) => user.id !== userId)]);
          setFilteredUsers([...users.filter((user) => user.id !== userId)]);
          console.log('User deleted successfully');
        } else {
          console.error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };
  
    const RedirectToUpdateForm = (userId) => {
      const history = useHistory();
      history.push(`/edit-user/${userId}`);
    };
  
    const RedirectToCreateForm = () => {
      const history = useHistory();
      history.push('/create-user');
    };
  
    if (loading) {
      return <p>Loading...</p>;
    }
  

  return (
    <div>
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="search-filter-container">
          <div className="search-bar">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchUsers()}
              placeholder="Search by name"
            />
            <i className="fas fa-search"></i>
          </div>
          <div className="filter-dropdown">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              onBlur={filterUsers}
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <i className="fas fa-filter"></i>
          </div>
        </div>
      </header>
      <table className="user-table">
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Country</th>
            <th><button className="action-button createButton" onClick={RedirectToCreateForm}>Create</button></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.country}</td>
              <td>
                <button className="action-button updateButton" onClick={() => RedirectToUpdateForm(user.id)}>Update</button>
              </td>
              <td>
                <button className="action-button deleteButton" onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Dashboard;