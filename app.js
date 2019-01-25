const path = require('path');
const express = require('express');
const lectures = require('./lectures');

// Skilgreina hvaða js skrá á að nota
const content = require('./content');
const app = express();

app.locals.setContent = content;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', lectures);

// Villumeðhöndlun
// 404 villa 
function notFoundHandler(req, res, next) {
  const title = 'Síða fannst ekki';
  const message = 'Efnið fannst ekki';
  res.status(404).render('error', { title, message });
}

// 500 villa
function errorHandler(req, res, next) {
  const title = 'Villa';
  const message = 'Það kom upp villa við keyrslu';
  res.status(500).render('error', { title, message });
}

app.use(notFoundHandler);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
