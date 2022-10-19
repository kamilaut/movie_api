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
    "Genre": {
      "Name": "Drama",
      "Description": "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
    },
    "Director":{
      "Name": "Edward Yang",
      "Bio": "some Bio",
      "Birth" : 1947,
      "Year": 2000,
    }
    "Featured" : false
    },
    {
      "Title": "The Seventh Seal",
      "Description": 'A knight returning to Sweden after the Crusades seeks answers about life, death, and the existence of God as he plays chess against the Grim Reaper during the Black Plague.',
      "Genre":  {
        "Name": "Drama",
        "Description": "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.",
      },
      "Director":{
        "Name": "Ingmar Bergman"
        "Bio": "Ernst Ingmar Bergman was born July 14, 1918, the son of a priest. The film and T.V. series, The Best Intentions (1992) is biographical and shows the early marriage of his parents. The film Sunday's Children (1992) depicts a bicycle journey with his father. In the miniseries Private Confessions (1996) is the trilogy closed.",
        "Birth" : 1918,
        "Year": 1957,
      }
      "Featured" : false
},
      {
        "Title": "Dead Man's Letters",
        "Description": 'In the aftermath of nuclear holocaust, a group of intellectuals crave to find hope in the pale and colorless new world. Among them, a history teacher tries to contact via letters his missing son.',
        "Genre":  {
          "Name": "Drama",
          "Description": "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.",
        },
        "Director": {
          "Name":  "Konstantin Lopushanskiy"
          "Bio" :  "He is a director and writer, known for The Ugly Swans (2006), Visitor of a Museum (1989) and Dead Man's Letters (1986).",
          "Birth" : 1947,
          "Year": 1986,
        }
        "Featured" : false
        },
        {
          "Title": "Citizen Kane",
          "Description": 'Following the death of publishing tycoon Charles Foster Kane, reporters scramble to uncover the meaning of his final utterance: Rosebud.',
          "Genre":  {
            "Name": "Drama",
            "Description": "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.",
          },
          "Director": {
            "Name": "Orson Welles",
            "Bio" :  "Orson Welles was gifted in many arts (magic, piano, painting) as a child. When his mother died in 1924 (when he was nine) he traveled the world with his father.",
            "Birth" : 1915,
            "Year": 1941,
          }
          "Featured" : false
          },
          {
            "Title": "Leviathan",
            "Description": 'In a Russian coastal town, Kolya is forced to fight the corrupt mayor when he is told that his house will be demolished. He recruits a lawyer friend to help, but the mans arrival brings further misfortune for Kolya and his family.',
            "Genre":  {
              "Name": "Drama",
              "Description": "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.",
            },
            "Director": {
              "Name": "Andrey Zvyagintsev"
              "Bio" : "Director and screenwriter Andrey Zvyagintsev is the winner of the Venice Film Festival (2003) and the Cannes Film Festival (2011, 2014, 2017). Two-time the Academy Awards and the BAFTA Awards nominee. Winner or the Golden Globe Awards (2015) for his film "Leviathan". In 2018, his latest work "Loveless" was awarded Best Foreign Film by the César Academy, France.",
              "Birth" : 1964,
              "Year": 2014,
            }
            "Featured" : false
            },
            {
              "Title": "Autumn Sonata",
              "Description": 'A devoted wife is visited by her mother, a successful concert pianist who had little time for her when she was young.',
              "Genre":  {
                "Name": "Drama",
                "Description": "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
              },
              "Director": {
                "Name": "Ingmar Bergman"
                "Bio": "Ernst Ingmar Bergman was born July 14, 1918, the son of a priest. The film and T.V. series, The Best Intentions (1992) is biographical and shows the early marriage of his parents. The film Sunday's Children (1992) depicts a bicycle journey with his father. In the miniseries Private Confessions (1996) is the trilogy closed."
                "Birth" :  1918,
                "Year": 1978,
              }
              "Featured" : false
              },
              {
                "Title": "The Banishment",
                "Description": 'A trip to the pastoral countryside reveals a dark, sinister reality for a family from the city.',
                "Genre":  {
                  "Name": "Drama",
                  "Description": "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
                }
                },
                "Director": {
                  "Name": "Andrey Zvyagintsev"
                  "Bio" : "Director and screenwriter Andrey Zvyagintsev is the winner of the Venice Film Festival (2003) and the Cannes Film Festival (2011, 2014, 2017). Two-time the Academy Awards and the BAFTA Awards nominee. Winner or the Golden Globe Awards (2015) for his film "Leviathan". In 2018, his latest work "Loveless" was awarded Best Foreign Film by the César Academy, France.",
                  "Birth" : 1964,
                  "Year": 2007,
                }
                "Featured" : false
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
                const genre = movies.find ( movie => movie.Genre.Name === genreName).Genre;

                if (genre) {
                  res.status (200).json(genre);
                } else {
                  res.status (404).send ("no such genre")
                }

              });

              app.get ("/movies/director/:directorName", (req,res ) => {
                const { directorName } = req.params;
                const director = movies.find ( movie => movie.Director.Name === directorName).Director;

                if (director) {
                  res.status (200).json(director);
                } else {
                  res.status (404).send ("no such director")
                }

              });

              app.listen(8080, () => {
                console.log('Your app is listening on port 8080');
              });
