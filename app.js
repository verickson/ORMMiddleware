var express = require('express');
var app = express();
var orm = require('./orm-lite');
var pg = require('pg');

var test_user = {
  id: 'STRING',
  firstname: 'STRING',
  lastname: 'STRING'
};

//linnking to the hat db that we already created
var Person = new orm('users','postgres://root:root@localhost/ORM2', test_user);
app.use(express.urlencoded());
app.set('view engine', 'pug');


app.get('/', function(req, res){
  Person.getAll(function(rows) {
    res.render('index',{
      usersdata: all_users,
    });
  });
});

app.get('/page2', function(req, res){
    Person.findById(function(rows) {
      res.render('page2',{
        usersdata: all_users
      });
    });
});


//error message for other pages
app.get('*', function(req, res){
  res.status(404).send('page not found!');
});

//server location
var server = app.listen(4333, function(){
  console.log('open http://localhost:4333 in the browser');
});
