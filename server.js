const express = require('express')
const path=require('path')

//Read the current directory name

const hostname = "127.0.0.1";
const port = 3000;
const app = express();
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static('public/js'));
app.use(express.static('public/resources'));
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
  app.get('/signup', function(req, res) {
    res.render('signup');
  });
  app.get('/argentina', function(req, res) {
    res.render('argentina');
  });
  app.get('/eg', function(req, res) {
    res.render('eg');
  });



  app.listen(3000);