const express = require('express')
const path=require('path')

//Read the current directory name

const hostname = "127.0.0.1";
const port = 8080;
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
  app.get('/about', function(req, res) {
    res.render('about');
  });
  app.get('/login', function(req, res) {
    res.render('login');
  });
// connecting to database
const mongoose = require('mongoose');
 
mongoose.connect("mongodb+srv://seif2102995:travi231@travinature.3akvybv.mongodb.net/")
  .then( (result) => {
    app.listen(3010);
    console.log('connected to db successfully');
  })
  .catch( (err) => {
    console.log(err);
  }); 
  
  


  app.listen(8080);
  console.log("listening on port " +port);