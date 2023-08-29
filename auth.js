/**
 * JWT Secret key for signing tokens.
 * @constant {string}
 */
const jwtSecret = 'your_jwt_secret'; // Replace with your actual JWT secret key

/**
 * JSON Web Token module.
 * @constant {object}
 */
const jwt = require('jsonwebtoken');

/**
 * Passport module for user authentication.
 * @constant {object}
 */
const passport = require('passport');

require('./passport'); // Include your local passport configuration

/**
 * Generates a JWT token for a user.
 * @function
 * @name generateJWTToken
 * @param {Object} user - The user object for whom to generate the token.
 * @returns {string} The generated JWT token.
 */
const generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // Username encoded in the JWT
    expiresIn: '7d', // Token expiration duration
    algorithm: 'HS256' // Algorithm for JWT encoding
  });
};

module.exports = (router) => {
 /**
 * @description Login route
 * @name POST /login
 * @function
 * @example
 * // Request data format
 * {
 *  "Username": "",
 *  "Password": ""
 * }
 * @example
 * // Response data format
 * {
 *  user: {
 *    "_id": "",
 *    "Username": "",
 *    "Password": "",
 *    "Email": "",
 *    "Birthday": "" ,
 *    "FavoriteMovies": []
 *  },
 *  token: ""
 * }
 * @param {authentication} - Basic HTTP authentication (Username, Password)
 * @param {Object} router - Express router object
 */
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};

