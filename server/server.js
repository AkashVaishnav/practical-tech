const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authController = require('./controllers/authController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/register', authController.register);
app.post('/admin-login', authController.adminLogin);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is Running on port: ${port}`);
})