const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const errorHandler = require('./middleware/error');

const connectDB = require('./config/db');

//Load env files
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

const app = express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Dev logging middleware
if (process.env.NODE_ENV === 'developement') {
  app.use(morgan('dev'));
}

//File Uploading
app.use(fileUpload());

// sanitize the received data, and remove any offending keys, or replace the characters with a 'safe' one.
//ex prevent
// {
// "email": {"$gt":""},
// "password": "123456"
// } to log in
app.use(mongoSanitize());

//Set Security headers
app.use(helmet());

//Set xss attacks
//ex pevent  injection of malicious scripts like <script>.. in description..
app.use(xss());

//Rate limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
});
// Apply the rate limiting middleware to all requests
app.use(limiter);

//Express middleware to protect against HTTP Parameter Pollution attacks
app.use(hpp());

//enable CORS  allow using  API on different domain
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount documentation page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

//order matter
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_env} mode on port ${PORT}`.yellow.bold
  )
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error:${err.message}`.red);
  //Close server &  exit process
  server.close(() => process.exit(1));
});

module.exports = app;
