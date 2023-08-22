const express = require('express');
const db = require('./db');
const router = express.Router();

router.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error fetching person' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(results[0]);
    }
  });
});

router.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error fetching users' });
        return;
      }
      res.json(results);
    });
  });
  
  router.post('/users', (req, res) => {
    const { firstname,lastname, phone, email, country } = req.body;
    db.query('INSERT INTO users (firstname, lastname, phone, email, country) VALUES (? ,?, ?, ?, ?)', [firstname, lastname, phone, email, country], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error creating user' });
        return;
      }
      res.status(201).json({ id: result.insertId, firstname,lastname, phone, email, country});
    });
  });

  router.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { firstname,lastname, phone, email, country } = req.body;
  
    db.query('UPDATE users SET firstname = ?, lastname = ?, phone = ?, email = ?, country = ? WHERE id = ?', [firstname,lastname, phone, email, country, userId], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error updating user' });
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    });
  });
  router.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
  
    db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error deleting user' });
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    });
  });

module.exports = router;
