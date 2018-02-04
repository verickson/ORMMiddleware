var express = require('express');
var app = express();
var orm = require('./orm-lite');
var pg = require('pg');

var tableColumns = {
  //id: 'STRING',
  firstname: 'STRING',
  lastname: 'STRING'
};

//linking to the hat db that we already created
var Users = new orm('users','postgres://root:root@localhost/orm', tableColumns);
app.use(express.urlencoded());
app.set('view engine', 'pug');

app.get('/', function(req, res){
  Users.getAll(function(data) {
    res.render('index',{
      data: data,
    });
  });
});

// app.get('/page2', function(req, res){
//     Users.findById(function(data) {
//       res.render('page2',{
//         data: data
//       });
//     });
// });


app.get('/form', function(req, res){
  res.render('form',{
     title: 'Add a user:'
  });
});

app.post('/add', function(req, res){
  Users.insertIntoTable({
    firstname: req.body.firstname,
    lastname: req.body.lastname
  }, function(){
    res.redirect('/');
  });
})

app.get('/user/*', function(req, res){
  var requestSegments = req.path.split('/');
  console.log(requestSegments[requestSegments.length - 1]);
  Users.findById(requestSegments[requestSegments.length - 1], function(data){
    console.log(data);
    res.render('user',{
       data: data[0]
    });
  });
});

//error message for other pages
app.get('*', function(req, res){
  res.status(404).send('page not found!');
});

//server location
var server = app.listen(4332, function(){
  console.log('open http://localhost:4332 in the browser');
});
