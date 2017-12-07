//var query = require('./query');

function initialize(){
  var express = require('express');
  var app = express();
  var pg = require('pg');
  var Sequelize = require('sequelize');
  //linnking to the hat db that we already created
  var sequelize = new Sequelize('postgres://root:root@localhost/ORM');
  app.set('view engine', 'pug');
};

var test_user = sequelize.define('test_user', {
  id: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING
});

test_user.sync().then(function(){
  test_user.create({
    firstname: 'jackson',
    lastname: 'pollock'
  });
  test_user.create({
    firstname: 'sylvia',
    lastname: 'plath'
  });
  test_user.create({
    firstname: 'daenerys',
    lastname: 'targaryen'
  });
});

function getAll(test_user){
  app.get('/', function(req, res){
    Hat.findAll().then(function(rows) {
      var all_users = [];
      for(var i = 0; i < rows.length; i++) {
        all_users.push(rows[i].dataValues);
      }
      res.render('index',{
        usersdata: all_users
      });
    });
  });
};

function findById(){
  app.get('/page2', function(req, res){
    Hat.findAll({
      where:{
        id: 1
      }
    }).then(function(rows) {
      var all_users = [];
      for(var i = 0; i < rows.length; i++) {
        all_users.push(rows[i].dataValues);
      }
      res.render('page2',{
        users: all_users
      });
    });
  });
};


initialize();
getAll(test_user);
findById();

//error message for other pages
app.get('*', function(req, res){
  res.status(404).send('page not found!');
});

//server location
var server = app.listen(4333, function(){
  console.log('open http://localhost:4333 in the browser');
});
