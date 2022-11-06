    const express = require('express'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

    const morgan = require ("morgan");
    const app = express();
    const mongoose = require('mongoose');
    const Models = require('./models.js');

    const Movies = Models.Movie;
    const Users = Models.User;

    app.use(express.json());

    mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

    // log requests to server
    app.use(morgan('common'));

    app.get ("/", (req, res) => {
      res.send ("Welcome to myFlixDB");
    });

      //READ
     app.get('/movies', (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
    });

     // Get all users
    app.get('/users', function (req, res) {
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
    });

    //READ
    app.get ('/movies/:Title', (req,res ) => {
      Movies.findOne ({Title: req.params.Title})
     .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
    });

    // Get a user by username
    app.get('/users/:Username', (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
    });

  //GET movie by a genre
  app.get('/movies/genres/:genreName', (req, res) => {
    Movies.findOne ({'Genre.Name': req.params.genreName })
      .then((movie) => {
        res.json(movie.Genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

  //GET movies by a director
  app.get('/movies/directors/:directorName', (req, res) => {
    Movies.findOne ({'Director.Name': req.params.directorName })
      .then((movie) => {
        res.json(movie.Director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }); 

    //Add a user
    /* We’ll expect JSON in this format
    {
    Username: String,
    Password: String,
    Email: String,
    Birthday: Date
    }*/
    app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users.create({
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user);
             })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
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
    app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
    });

    // Add a movie to a user's list of favorites
    app.post('/users/:Username/movies/:MovieID', (req, res) => {
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

    // Delete a movie to a user's list of favorites
  app.delete('/users/:Username/movies/:MovieID', (req, res) => {
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

    // Delete a user by username
    app.delete('/users/:Username', (req, res) => {
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

    app.use(express.static('public'));

    app.listen(8080, () => {
      console.log('Your app is listening on port 8080');
    });
