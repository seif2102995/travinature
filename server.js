const express = require('express')
const apps = express()

//Read the current directory name

const hostname = "127.0.0.1";
const port = 3000;
const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('login');
  });

  app.get('/home', function(req, res) {
    res.render('home');
  });

  app.get('/admin', function(req, res) {
    res.render('admin');
  });


  app.listen(3000);