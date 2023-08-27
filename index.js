const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');
const { check, validationResult } = require('express-validator');

const morgan = require("morgan");
const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');
/**
 * @file index.js
 * @description This file includes the main server logic for the movie API.
 * @requires express
 * @requires body-parser
 * @requires uuid
 * @requires express-validator
 * @requires morgan
 * @requires mongoose
 * @requires ./models.js
 * @requires cors
 * @requires ./auth
 * @requires passport
 * @requires ./passport
 */

//mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// log requests to server
app.use(morgan('common'));

app.get("/", (req, res) => {
  res.send("Welcome to the mirror stage");
});
/**
 * Get all movies
 * @function
 * @name getAllMovies
 * @description Endpoint to get all movies.
 * @route {GET} /movies
 * @param {authentication} - Bearer token (JWT)
 * @returns {Array<Object>} Array of movie objects.
 */
//READ
app.get("/movies", passport.authenticate('jwt', { session: false }), function (req, res) {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});


/**
 * Get all users
 * @function
 * @name getAllUsers
 * @description Endpoint to get all users.
 * @route {GET} /users
 * @param {authentication} - Bearer token (JWT)
 * @returns {Array<Object>} Array of user objects.
 */
// Get all users
app.get('/users', passport.authenticate('jwt', { session: false }), function (req, res) {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * Get a movie by title
 * @function
 * @name getMovieByTitle
 * @description Endpoint to get a movie by title.
 * @route {GET} /movies/:Title
 * @param {string} Title - Title of the movie.
 * @param {authentication} - Bearer token (JWT)
 * @returns {Object} Movie object.
 */
//READ
app.get(
  "/movies/:Title", passport.authenticate("jwt", { session: false }), (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * Get a user's favorite movies
 * @function
 * @name getUserFavoriteMovies
 * @description Endpoint to get a user's favorite movies.
 * @route {GET} /users/:Username/favorites
 * @param {string} Username - Username of the user.
 * @param {authentication} - Bearer token (JWT)
 * @returns {Array<Object>} Array of favorite movie objects.
 */
// Get a user's favorite movies
app.get('/users/:Username/favorites', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User not found');
      }
      // Get the list of favorite movie IDs from the user document
      const favoriteMovieIDs = user.FavoriteMovies;

      // Get the details of favorite movies based on their IDs
      Movies.find({ _id: { $in: favoriteMovieIDs } })
        .then((favoriteMovies) => {
          res.json(favoriteMovies);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Error: ' + err);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
/**
 * Get a user by username
 * @function
 * @name getUserByUsername
 * @description Endpoint to get a user by username.
 * @route {GET} /users/:Username
 * @param {string} Username - Username of the user.
 * @param {authentication} - Bearer token (JWT)
 * @returns {Object} User object.
 */
// Get a user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * Get a movie by genre
 * @function
 * @name getMovieByGenre
 * @description Endpoint to get a movie by genre.
 * @route {GET} /movies/genres/:genreName
 * @param {string} genreName - Name of the genre.
 * @param {authentication} - Bearer token (JWT)
 * @returns {Object} Genre object of the movie.
 */
//GET movie by a genre
app.get('/movies/genres/:genreName', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.genreName })
    .then((movie) => {
      res.json(movie.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * Get movies by a director
 * @function
 * @name getMoviesByDirector
 * @description Endpoint to get movies by a director.
 * @route {GET} /movies/directors/:directorName
 * @param {string} directorName - Name of the director.
 * @param {authentication} - Bearer token (JWT)
 * @returns {Object} Director object of the movie.
 */
//GET movies by a director
app.get('/movies/directors/:directorName', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.directorName })
    .then((movie) => {
      res.json(movie.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * Add a user
 * @function
 * @name addUser
 * @description Endpoint to add a user.
 * @route {POST} /users
 * @param {string} Username - Username of the user.
 * @param {string} Password - Password of the user.
 * @param {string} Email - Email of the user.
 * @param {Date} Birthday - Birthday of the user.
 * @returns {Object} Created user object.
 */
//Add a user
/* We’ll expect JSON in this format
{
Username: String,
Password: String,
Email: String,
Birthday: Date
}*/
app.post('/users',
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], (req, res) => {

    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) => { res.status(201).json(user) })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

// Update a user's info, by username
/* We’ll expect JSON in this format
{
Username: String,
(required)
Password: String,
(required)
Email: String,
(required)
Birthday: Date
}*/

/**
 * Update a user's info by username
 * @function
 * @name updateUserByUsername
 * @description Endpoint to update a user's info by username.
 * @route {PUT} /users/:Username
 * @param {string} Username - Username of the user.
 * @param {string} Password - Password of the user.
 * @param {string} Email - Email of the user.
 * @param {Date} Birthday - Birthday of the user.
 * @param {authentication} - Bearer token (JWT)
 * @returns {Object} Updated user object.
 */
app.put(
  '/users/:Username',
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check(
      'Username',
      'Username contains non alphanumeric characters - not allowed.'
    ).isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
    passport.authenticate('jwt', { session: false }),
  ],
  (req, res) => {
    // check validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }


    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

/**
 * Add a movie to a user's favorite list
 * @function
 * @name addMovieToFavorites
 * @description Endpoint to add a movie to a user's favorite list.
 * @route {POST} /users/:Username/movies/:MovieID
 * @param {string} Username - Username of the user.
 * @param {string} MovieID - ID of the movie to be added to favorites.
 * @param {authentication} - Bearer token (JWT)
 * @returns {Object} Updated user object with the added movie.
 */
// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

/**
 * Delete a movie from a user's favorite list
 * @function
 * @name deleteMovieFromFavorites
 * @description Endpoint to delete a movie from a user's favorite list.
 * @route {DELETE} /users/:Username/movies/:MovieID
 * @param {string} Username - Username of the user.
 * @param {string} MovieID - ID of the movie to be deleted from favorites.
 * @param {authentication} - Bearer token (JWT)
 * @returns {Object} Updated user object with the removed movie.
 */
// Delete a movie to a user's list of favorites
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $pull: { FavoriteMovies: req.params.MovieID }
  },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

/**
 * Delete a user by username
 * @function
 * @name deleteUserByUsername
 * @description Endpoint to delete a user by username.
 * @route {DELETE} /users/:Username
 * @param {string} Username - Username of the user to be deleted.
 * @param {authentication} - Bearer token (JWT)
 * @returns {string} Deletion success message.
 */
// Delete a user by username
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
/**
 * Start the server
 * @function
 * @name startServer
 * @description Starts the server on the specified port.
 * @param {number} port - Port number to listen on.
 */
app.use(express.static('public'));

//App listen with changing port
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});
