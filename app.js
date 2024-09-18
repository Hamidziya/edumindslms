const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/db');

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

sequelize.sync().then(() => console.log('DB Synced'));

module.exports = app;
