const express = require('express'),
app = express(),
morgan = require('morgan'),
bodyParser = require('body-parser'),
fs = require('fs'), // import built in node modules fs and path
uuid = require('uuid'),
path = require('path');

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
app.use(bodyParser.json());
app.use(morgan('common'));

let users = [
  {
    id: 1,
    name: 'Jessica',
    favouriteMovies: []
  },
  {
    id: 2,
    name: 'Ben',
    favouriteMovies: ['First Movie']
  }
];

let movies = [
  {
    'Title': 'First Movie',
    'Description': 'First description.',
    'Genre': {
      'Name': 'Drama',
      'Description': 'Drama description'
    },
    'Director': {
      'Name': 'First Director',
      'Bio' : '1',
      "Birth" : 4568,
    },

    'Featured' : false
  },
  {
    'Title': 'Second Movie',
    'Description': 'Second description.',
    'Genre': {
      'Name': 'Drama',
      'Description': 'Drama description'
    },
    'Director': {
      'Name': 'Second Director',
      'Bio' : '2',
      "Birth" : 4569,
    },

    'Featured' : false
  },
  {
    'Title': 'Third Movie',
    'Description': 'Third description.',
    'Genre': {
      'Name': 'Drama',
      'Description': 'Drama description'
    },
    'Director': {
      'Name': 'Third Director',
      'Bio' : '3',
      "Birth" : 4570,
    },

    'Featured' : false
  },
];

//READ
app.get ('/movies', (req,res) => {
  res.status(200).json(movies);
});

//READ
app.get ('/movies/:title', (req,res ) => {
  const { title } = req.params;
  const movie = movies.find ( movie => movie.Title === title);

  if (movie) {
    res.status (200).json(movie);
  } else {
    res.status (404).send ('no such movie');
  }

});

//READ
app.get ('/movies/genre/:genreName', (req,res ) => {
  const { genreName } = req.params;
  const genre = movies.find ( movie => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("no such genre")
  }
});

app.get ('/movies/director/:directorName', (req,res ) => {
  const { directorName } = req.params;
  const director = movies.find ( movie => movie.Director.Name === directorName).Director;

  if (director) {
    res.status (200).json(director);
  } else {
    res.status (404).send ('no such director')
  }

});
// Gets the list of data about ALL users

app.get('/users', (req, res) => {
  res.json(users);
});
// Gets the data about a single user, by name

app.get('/users/:name', (req, res) => {
  res.json(users.find((userst) =>
  { return users.name === req.params.name }));
});

// Adds data for a new users.
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = 'Missing name in request body';
    res.status(404).send(message);
  } else {
    newUser.id = uuid.v4();
    Users.push(newUser);
    res.status(200).send(newUser);
  }
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});
