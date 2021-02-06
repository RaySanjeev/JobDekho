const path = require('path');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRouter');
const jobRouter = require('./routes/jobRoutes');
const globalErrorHandler = require('./controller/errorController');
const app = express();

app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

app.use(compression());

app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/jobs', jobRouter);

app.use(globalErrorHandler);
module.exports = app;
