const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    create: async (firstName, lastName, email, password, role) => {
        const hashPass = await bcrypt.hash(password, 10);
        const query = `INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)`;
        return db.promise().query(query, [firstName, lastName, email, hashPass, role]);
    },
    findByEmail: (email) => {
        const query = `SELECT * FROM users WHERE email = ?`;
        return db.promise().query(query, [email]);
    }
}
module.exports = User;