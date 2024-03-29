/**
 * @fileoverview Handles authentication using Passport.js, Passport-Local and Passport-JWT.
 * @requires passport
 * @requires passport-local
 * @requires passport-jwt
 * @requires ./models.js
 */

const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

/**
 * Use Passport's Local Strategy for username and password authentication.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @param {function} callback - A callback to be executed after authentication attempt.
 */
passport.use(new LocalStrategy({
  usernameField: 'Username',
  passwordField: 'Password'
}, (username, password, callback) => {
   // authentication logic
  console.log(username + '  ' + password);
  Users.findOne({ Username: username }, (error, user) => {
    if (error) {
      console.log(error);
      return callback(error);
    }

    if (!user) {
      console.log('incorrect username');
      return callback(null, false, {message: 'Incorrect username.'});
    }

    if (!user.validatePassword(password)) {
      console.log('incorrect password');
      return callback(null, false, {message: 'Incorrect password.'});
    }

    console.log('finished');
    return callback(null, user);
  });
}));

/**
 * Use Passport's JWT Strategy for token-based authentication.
 * @param {object} jwtPayload - The decoded JWT payload.
 * @param {function} callback - A callback to be executed after authentication attempt.
 */
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
   // authentication logic 
  return Users.findById(jwtPayload._id)
    .then((user) => {
      return callback(null, user);
    })
    .catch((error) => {
      return callback(error)
    });
}));

