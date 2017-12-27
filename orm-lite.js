//var query = require('./query');
var Sequelize = require('sequelize');

class Ormdata{
  constructor(tableName, connectionString, columns){
    this.tableName = tableName;
    this.sequelize = this.initiate(connectionString);
    this.table = this.createTable(columns);
  }
  initiate(conn){
    return new Sequelize(conn);
  }
  createTable(cols){
    for(var key in cols){
      cols[key] = Sequelize[cols[key]]
    }
    // store the table object in the class properties, where this.table will represent the table instance, i.e. a table named 'hats' will be stored as this.hats
    return this.sequelize.define(this.tableName, cols);
  }
  insertIntoTable(values, callback){
    var tableRef = this.table;
    this.table.sync().then(function(){
      tableRef.create({
        firstname: 'jackson',
        lastname: 'pollock'
      });
      tableRef.create({
        firstname: 'sylvia',
        lastname: 'plath'
      });
      tableRef.create({
        firstname: 'daenerys',
        lastname: 'targaryen'
      });
      callback();
    });
  }
  getAll(callback){
    this.table.findAll().then(function(rows) {
      var all_users = [];
      for(var i = 0; i < rows.length; i++) {
        all_users.push(rows[i].dataValues);
      }
      return callback(all_users);
    });
  }
  findById(id, callback){
    this.table.findAll({
      where: {
        id: id
      }
    }).then(function(rows) {
      var all_users = [];
      for(var i = 0; i < rows.length; i++) {
        all_users.push(rows[i].dataValues);
      }
       return callback(all_users);
    });
  }
}

// var test_user = sequelize.define('test_user', {
//   id: Sequelize.STRING,
//   firstname: Sequelize.STRING,
//   lastname: Sequelize.STRING
// });

// test_user.sync().then(function(){
  // test_user.create({
  //   firstname: 'jackson',
  //   lastname: 'pollock'
  // });
  // test_user.create({
  //   firstname: 'sylvia',
  //   lastname: 'plath'
  // });
  // test_user.create({
  //   firstname: 'daenerys',
  //   lastname: 'targaryen'
  // });
// });

// function getAll(test_user){
//   app.get('/', function(req, res){
//     ORM.findAll().then(function(rows) {
//       var all_users = [];
//       for(var i = 0; i < rows.length; i++) {
//         all_users.push(rows[i].dataValues);
//       }
//       res.render('index',{
//         usersdata: all_users
//       });
//     });
//   });
// };
//
// function findById(){
//   app.get('/page2', function(req, res){
//     ORM.findAll({
//       where:{
//         id: id
//       }
//     }).then(function(rows) {
//       var all_users = [];
//       for(var i = 0; i < rows.length; i++) {
//         all_users.push(rows[i].dataValues);
//       }
//       res.render('page2',{
//         users: all_users
//       });
//     });
//   });
// };

module.exports = Ormdata;
