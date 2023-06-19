// passportMiddleware.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

// Configure the local strategy for passport
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Find the user with the given username
      const user = await User.findOne({ username });

      // If user is not found, authentication fails
      if (!user) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      // Compare the password with the stored hash
      const isMatch = await bcrypt.compare(password, user.password);

      // If passwords do not match, authentication fails
      if (!isMatch) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      // Authentication succeeded, pass the user to the next middleware
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
