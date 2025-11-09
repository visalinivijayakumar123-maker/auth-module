const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Dummy users array for testing
const users = [];

// Register route
app.post('/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const exists = users.find(u => u.email === email);
    if (exists) return res.status(400).json({ message: 'User already exists' });

    users.push({ name, email, password });
    res.status(201).json({ message: 'User registered successfully', user: { name, email } });
});

// Login route
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
});

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));