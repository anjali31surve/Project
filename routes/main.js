const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
    res.send('Welcome to Fur-Ever Friends!');
});

module.exports = router;
db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
  ['testuser', 'test@example.com', 'password123'], 
  (err) => {
    if (err) console.error('Error inserting user:', err.message);
  });
