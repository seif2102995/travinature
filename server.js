const express = require('express')
const path=require('path')
const signup_model2 = require('./models/signupschema')

//Read the current directory name

const hostname = "127.0.0.1";
const port = 8080;
const app = express();
const mongoose = require('mongoose');

app.use(express.static(path.join(__dirname,'public')))
app.use(express.static('public/js'));
app.use(express.static('public/resources'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true})); // for post method 
mongoose.connect("mongodb+srv://seif2102995:travi231@travinature.3akvybv.mongodb.net/")
  .then( (result) => {
    app.listen(3010);
    console.log('connected to db successfully');
  })
  .catch( (err) => {
    console.log(err);
  }); 



app.get('/', function(req, res) {
    res.render('home');
  });

  app.get('/book', function(req, res) {
    res.render('map');
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
  app.get('/reports-admin',(req,res)=>{
    res.render('reports-admin');
  })

  app.post('/signup', (req,res)=>{
    // const fst = document.getElementsByClassName("firstNext");
    // const sec = document.getElementsByClassName("next-1");
    // const trd = document.getElementsByClassName("next-2");
    // if(fst.clicked==true){
    //   if(sec.clicked==true){
    //     if(trd.clicked==true){
    //       if(document.getElementsByClassName('submit').clicked==true){
      const signup_data = new signup_model2(req.body);
      // console.log("555555");
              // console.log('clicked');
              // console.log('firstname ' +   req.body.firstname)
            const obj = req.body;
            let count =0;
            for (const key in req.body) {
                if(obj[key]!==""){
                  count++;
                }
              // console.log(`${key}: ${req.body[key]}   + mn for each`);
          }
          console.log('count = ' + count )
          if(count==8){
              signup_data.save().then(()=>{console.log('saved to db')}).catch(()=>{console.log('error')});
          }
              console.log(req.body);  
            // }else{
            //   console.log("bbbbbb");
            // }
    //     }
    //   }
    // }
    
  });



// connecting to database

  

  app.listen(8080);
  console.log("listening on port " +port);