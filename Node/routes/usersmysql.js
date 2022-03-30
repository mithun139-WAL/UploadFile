var express = require('express');
var router = express.Router();
const connector = require('../poolconnect');
router.get('/createTable', function (req, res) {
  var sql =
    'CREATE TABLE users(id int AUTO_INCREMENT PRIMARY KEY,email varchar(100),password varchar(100),user_info text,dob date)';
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
router.post('/', function (req, res) {
  const {email, password, user_info, dob} = req.body;
  var sql = `INSERT INTO users (email, password, user_info, dob) VALUES ("${email}", "${password}", "${user_info}", "${dob}")`;
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
router.get('/', function (req, res) {
  var sql = 'SELECT * FROM users';
  connector.query(sql, function (err, results) {
    res.json({err, results});
  });
});
router.get('/:id', function (req, res) {
  var sql = `SELECT * FROM users WHERE id=${parseInt(req.params.id)}`;
  connector.query(sql, function (err, results) {
    res.json({err, results});
  });
});
router.delete('/:id', function (req, res) {
  const sql = `DELETE FROM users WHERE id=${parseInt(req.params.id)}`;
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
router.delete('/', function (req, res) {
  const sql = `DROP TABLE users`;
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
router.put('/:id', function (req, res) {
  const {email, password, user_info, dob} = req.body;
  var sql = `UPDATE users SET email="${email}", password="${password}", user_info="${user_info}", dob="${dob}" WHERE id=${parseInt(
    req.params.id
  )}`;
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
module.exports = router;
