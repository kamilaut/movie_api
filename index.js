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
    favouriteMovies: ["The Seventh Seal"]
  }
];

let movies = [
  {
    "Title": "Yi Yi: A One and a Two...",
    "Description": 'Each member of a middle-class Taipei family seeks to reconcile past and present relationships within their daily lives.',
    "Genre": "Drama",
    "Director": "Edward Yang",
    "Year": "2000",
  },
  {
    "Title": "The Seventh Seal",
    "Description": 'A knight returning to Sweden after the Crusades seeks answers about life, death, and the existence of God as he plays chess against the Grim Reaper during the Black Plague.',
    "Genre": "Drama",
    "Director": "Ingmar Bergman",
    "Year": "1957",
  },
  {
    "Title": "Dead Man's Letters",
    "Description": 'In the aftermath of nuclear holocaust, a group of intellectuals crave to find hope in the pale and colorless new world. Among them, a history teacher tries to contact via letters his missing son.',
    "Genre": "Drama",
    "Director": "Konstantin Lopushanskiy",
    "Year": "1986",
  },
  {
    "Title": "Citizen Kane",
    "Description": 'Following the death of publishing tycoon Charles Foster Kane, reporters scramble to uncover the meaning of his final utterance: Rosebud.',
    "Genre": "Drama",
    "Director": "Orson Welles",
    "Year": "1941",
  },
  {
    "Title": "Leviathan",
    "Description": 'In a Russian coastal town, Kolya is forced to fight the corrupt mayor when he is told that his house will be demolished. He recruits a lawyer friend to help, but the mans arrival brings further misfortune for Kolya and his family.',
    "Genre": "Drama",
    "Director": "Andrey Zvyagintsev",
    "Year": "2014",
  },
  {
    "Title": "Autumn Sonata",
    "Description": 'A devoted wife is visited by her mother, a successful concert pianist who had little time for her when she was young.',
    "Genre": "Drama",
    "Director": "Ingmar Bergman",
    "Year": "1978",
  },
  {
    "Title": "The Banishment",
    "Description": 'A trip to the pastoral countryside reveals a dark, sinister reality for a family from the city.',
    "Genre": "Drama",
    "Director": "Andrey Zvyagintsev",
    "Year": "2007",
  },

];

//READ
app.get ("/movies", (req,res) => {
  res.status(200).json(movies);
});

//READ
app.get ("/movies/:title", (req,res ) => {
  const { title } = req.params;
  const movie = movies.find ( movie => movie.Title === title);

  if (movie) {
    res.status (200).json(movie);
  } else {
    res.status (404).send ("no such movie");
  }

});

//READ
app.get ("/movies/:genreName", (req,res ) => {
  const { genreName } = req.params;
  const genre = movies.find ( movie => movie.Genre.Name === genreName).Gerne;

  if (genre) {
    res.status (200).json(genre);
  } else {
    res.status (404).send ("no such genre")
  }

});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});
