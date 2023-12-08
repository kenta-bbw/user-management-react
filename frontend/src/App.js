// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import UserList from './components/UserList'; // Adjust the path based on your project structure

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [editingUser]); // Add editingUser as a dependency if needed

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const RedirectToEditForm = (user) => {
    setEditingUser(user);
    const history = useHistory();
    history.push(`/edit-user/${user.id}`);
  };

  return (
    <div id="app">
      <Router>
        <Route path="/dashboard">
          <UserList users={users} openEditForm={RedirectToEditForm} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
