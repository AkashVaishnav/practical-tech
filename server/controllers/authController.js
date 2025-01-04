const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Registeration for both
exports.register = (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
        return res.status(400).send('All fields are required.');
    }

    if (role !== 'customer' && role !== 'admin') {
        return res.status(400).send('Invalid role. Role must be either "customer" or "admin".');
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send("Error hashing password.");
        
        const sql = `INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)`;
        db.query(sql, [firstName, lastName, email, hashedPassword, role], (error) => {
            if (error) {
                return res.status(400).send("User already exists.");
            }
            res.status(201).send(`User registered as ${role} successfully!`);
        });
    });
};

// Admin login
exports.adminLogin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], (err, result) => {
        if (err) {
            return res.status(500).send('Database error.');
        }

        if (result.length === 0) {
            return res.status(404).send('User not found.');
        }

        const user = result[0];
        // Check if the user role is admin
        if (user.role !== 'admin') {
            return res.status(403).send('You are not allowed to login from here.');
        }

        // compare password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Error comparing passwords.');
            }

            if (!isMatch) {
                return res.status(400).send('Invalid credentials.');
            }

            // Login successful, return user data
            res.status(200).json({
                message: 'Admin login successful.',
                firstName: user.firstName,
                lastName: user.lastName
            });
        });
    });
};