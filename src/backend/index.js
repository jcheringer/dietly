const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

const db = require('./dao');

const foodRoutes = require('./routes/food-routes');
const recipeRoutes = require('./routes/recipe-routes');
const dietRoutes = require('./routes/diet-routes');
const scheduleRoutes = require('./routes/schedule-router');
const diaryRoutes = require('./routes/diary-routes');
const userRoutes = require('./routes/user-routes');

const Constants = require('../constants');

dotenv.config({ path: path.join(__dirname, '../config/config.env') });

const app = express();

db.connect();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../../public')));

app.use('/api/food', foodRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/diet', dietRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/diary', diaryRoutes);
app.use('/api/user', userRoutes);

app.use('/api/*', (req, res) => {
    res.sendStatus(500).end();
});

app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

//Default error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const msg = err.message || 'Failed to handle request';
    const code = err.code || Constants.ERROR_CODES.GENERAL_ERROR;
    res.status(status).json({ msg, code });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening on port 3000');
});