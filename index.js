const express = require('express'),
morgan = require('morgan'),
fs = require('fs'), // import built in node modules fs and path
path = require('path');

const app = express();
// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})


let top10Movies = [
  {
    title: 'The Seventh Seal',
    director: 'Ingmar Bergman'
  },
  {
    title: 'Citizen Kane',
    director: 'Orson Welles'
  },
  {
    title: 'Autumn Sonata',
    director: 'Ingmar Bergman'
  },
  {
    title: 'Inland Empire',
    director: 'David Lynch'
  },
  {
    title: 'The Face of Another',
    director: 'Hiroshi Teshigahara'
  },
  {
    title: 'Songs from the Second Floor',
    director: 'Roy Andersson'
  },
  {
    title: 'The Conversation',
    director: 'Francis Ford Coppola'
  },
  {
    title: 'Stand by Me',
    director: 'Rob Reiner'
  },
  {
    title: 'Psycho',
    director: 'Alfred Hitchcock'
  },
  {
    title: 'Seconds',
    director: 'John Frankenheimer'
  }
];

// setup the logger
app.use(morgan('common', {stream: accessLogStream}));
app.use(express.static('public'));

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my top 10 Movies!');
});

app.get('/movies', (req, res) => {
  res.json(top10Movies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
