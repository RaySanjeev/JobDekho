const path = require('path');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRouter');
const jobRouter = require('./routes/jobRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const app = express();

app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Rate limiter
const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP. Please try again after an hour.',
});
app.use('/api', limiter);

// BODY AND FORM PARSER
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Data sanitisation against NoSQL query injection
app.use(mongoSanitize());

// Data sanitisation against xss
app.use(xss());

app.use(compression());

app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/jobs', jobRouter);

// ALL OTHER UNIDENTIFIED ROUTES
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
