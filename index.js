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
app.get ('/movies/genres/:genreName', (req,res ) => {
  const { genreName } = req.params;
  const movie = movies.find ( movie => movie.Genre.Name === genreName);

  if (movie) {
    res.status(200).json(movie.Genre);
  } else {
    res.status(400).send("no such genre")
  }
});

app.get ('/movies/directors/:directorName', (req,res ) => {
  const { directorName } = req.params;
  const movie = movies.find ( movie => movie.Director.Name === directorName);

  if (movie) {
    res.status (200).json(movie.Director);
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
  res.json(users.find((users) =>
  { return user.name === req.params.name }));
});

// CREATE
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status (201).json(newUser)
  } else {
    res.status(400).send('users need names');
  }

});

//update

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updateUser = req.body;

  let user = users.find (user => user.id == id );

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('no such user')
  }

});

//update

app.put('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle} = req.params;

  let user = users.find (user => user.id == id );

  if (user) {
    user.favouriteMovies.push(movieTitle);
    res.status(200).send ('${movieTitle} has been added to user ${id} array' );
  } else {
    res.status(400).send('no such user')
  }

});

//delete

app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle} = req.params;

  let user = users.find (user => user.id == id );

  if (user) {
    user.favouriteMovies = user.favouriteMovies.filter (title => title !== movieTitle);
    res.status(200).send ('${movieTitle} has been removed from user ${id} array' );
  } else {
    res.status(400).send('no such user')
  }

});

//delete

app.delete('/users/:id', (req, res) => {
  const { id} = req.params;

  let user = users.find (user => user.id == id );

  if (user) {
    users = users.filter (user => user.id != id);
    res.status(200).send ('user ${id} has been deleted' );
  } else {
    res.status(400).send('no such user')
  }

});

app.use(express.static('public'));

app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});
