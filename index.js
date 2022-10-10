const express = require('express');
const app = express();

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my book club!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/books', (req, res) => {
  res.json(topBooks);
});


// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
