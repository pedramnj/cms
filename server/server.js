const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware
const userDao=require('./user-dao');
const session=require('express-session');
const LocalStrategy=require('passport-local').Strategy;
const passport=require('passport')
const cors=require('cors')
const pageDao = require('./page-dao');
const path = require('path');
const fs = require('fs');
const currentDirectory = path.resolve(__dirname);
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(
  new LocalStrategy((username, password, done) => {
    userDao.getUserByUsername(username)
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!userDao.validatePassword(user, password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the CMS server!');
});

// Define your routes using express.Router() here

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
