const path = require('path');
const express = require('express');

const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRouter')
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json({ limit: '10kb' }));

app.use('/', viewRouter)
app.use('/api/v1/users', userRouter);

module.exports = app;