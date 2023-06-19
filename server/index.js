'use strict';
const express = require('express');
const morgan = require('morgan'); //Middleware used for login
const { check, validationResult } = require('express-validator'); // validation middleware
const cors = require('cors'); // To enable requests coming from React Developement server (http://localhost:3000)

// Passport-related imports
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

// init express
const port = 3001;
const app = express();

// set up the middlewares
app.use(morgan('dev'));
app.use(express.json()); // for parsing json request body
const corsOptions = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200,
    credentials: true,
}
app.use(cors(corsOptions));

// Passport: set up local strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {
    const user = await dao.getUser(username, password)
    if(!user)
      return cb(null, false, 'Incorrect username or password.');
      
    return cb(null, user);
  }));
  
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
  
passport.deserializeUser(function (user, cb) { 
  return cb(null, user);
});

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({error: 'Not authorized'});
}

app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.authenticate('session'));

 /*** User APIs ***/
 app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).send(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        return res.status(201).json(req.user);
      });
  })(req, res, next);
})

// GET /api/sessions/current
app.get('/api/sessions/current', (req, res) => {
    if(req.isAuthenticated()) {
      res.json(req.user);}
    else
      res.status(401).json({error: 'Not authenticated'});
});

// DELETE /api/session/current
app.delete('/api/sessions/current', (req, res) => {
    req.logout(() => {
      res.end();
    });
});

/*** APIs ***/
app.get('/api/allCourses', (req, res) => {
  dao.getAllCourses()
  .then(courses => res.json(courses))
  .catch(() => res.status(500).end());
});

app.get('/api/allEnrolledCourses', isLoggedIn, (req, res) => {
  dao.getAllEnrolledCourses(req.user.id)
    .then(courses => res.json(courses))
    .catch(() => res.status(500).end());
});

app.post('/api/addCourse', isLoggedIn, (req, res) => {
  const { course } = req.body;
  dao.addCourse(req.user.id, course)
    .then(() =>  res.end())
    .catch(() => {
    res.status(503).json({ error: `Database error while adding the course` })
  });
});

app.put('/api/updateCourse', isLoggedIn, (req, res) => {
  const { course } = req.body;
  dao.updateCourse(course)
    .then(() =>  res.end())
    .catch(() => {
    res.status(500).json({ error: `Database error while updating course number of students.` });
  });
});

app.put('/api/createStudyPlan', isLoggedIn, (req, res) => {
  const { plan } = req.body;
  dao.createStudyPlan(req.user.id, plan)
    .then((course) => course === 0 ? res.status(404).json({ error: `Cannot create a studyplan, id doesn't exist` }) : response.status(204).end())
    .catch(() => res.status(503).json({ error: `Database error while updating the study plan` }));
});

app.delete('/api/removeCourse', isLoggedIn, (req, res) => {
  const { course } = req.body;
  dao.removeCourse(req.user.id, course)
    .then(() => res.end())
    .catch(() => res.status(503).json({ error: `Database error when deleting a course with id ${course}` }));
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));


