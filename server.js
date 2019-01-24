const path = require('path');
const express = require('express');

var myParser = require("body-parser");


const app = express();

app.use(myParser.json());
app.use(myParser.urlencoded({extended : true}));

const fs = require('fs');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  console.log("recebi");
  res.render('index', {user: "null"});
});

app.get('/user/:userId', function(req, res) {
  console.log("recebi com params");
  let users = JSON.parse(fs.readFileSync('./database/users.json', 'utf-8'));
  console.log(req.params.userId);

  users.users.forEach(user => {
    // console.log(user.name);
    if(user.name == req.params.userId){
      res.render('index', {user: user});
    }
  });
  
  if(!res)
    res.send("404"); 
});

app.get('/contact-us', function(req, res) {
  res.render('partials/contact-us');
});

app.get('/about-us', function(req, res) {
  res.render('partials/about-us');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.get('/branches', function (req, res) {
  let branches = JSON.parse(fs.readFileSync('./database/branches.json', 'utf-8'));
  res.render('partials/branches', {branches: branches} );
});

app.get('/users', function (req, res) {
  let users = JSON.parse(fs.readFileSync('./database/users.json', 'utf-8'));
  res.render('partials/users', {users: users} );
});

app.get('/catalog', function (req, res) {
  let flowers = JSON.parse(fs.readFileSync('./database/flowers.json', 'utf-8'));
  res.render('partials/catalog', {flowers: flowers} );
});


app.post('/login', function (req, res) {
  console.log("POST");
  console.log("\n=====================\n");
  let data = req.body;
  console.log(data.email);
  console.log(data.password);
  console.log("\n=====================\n");

  let users = JSON.parse(fs.readFileSync('./database/users.json', 'utf-8'));
  
  users.users.forEach(user => {
    if(user.email == data.email && user.password == data.password){
      res.json(user);
    }
  });

  if(!res)
    res.send("Failure");
  
});


app.listen(8080, ()=>{console.log('8080 is the magic port');});
