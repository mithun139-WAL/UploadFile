var express = require('express');
var router = express.Router();
const connector = require('../poolconnect');
router.get('/createTable', function (req, res) {
  var sql =
    'CREATE TABLE cars(id int AUTO_INCREMENT PRIMARY KEY,name varchar(200),price int, color enum("black", "blue", "grey"), in_stock boolean)';
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
router.post('/', function (req, res) {
  const {id, name, price, color, in_stock} = req.body;
  var sql = `INSERT INTO cars (id, name, price, color, in_stock) VALUES (?,?,?,?,?)`;
  connector.query(
    sql,
    [id, name, price, color, in_stock],
    function (err, results, fields) {
      res.json({err, results, fields});
    }
  );
});
router.get('/', function (req, res) {
  var sql = 'SELECT * FROM cars';
  connector.query(sql, function (err, results) {
    res.json({err, results});
  });
});
router.get('/:id', function (req, res) {
  var sql = `SELECT * FROM cars WHERE id=${parseInt(req.params.id)}`;
  connector.query(sql, function (err, results) {
    res.json({err, results});
  });
});
router.delete('/:id', function (req, res) {
  const sql = `DELETE FROM cars WHERE id=${parseInt(req.params.id)}`;
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
router.delete('/', function (req, res) {
  const sql = `DELETE FROM cars`;
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
router.put('/:id', function (req, res) {
  const {name, price, color, in_stock} = req.body;
  var sql = `UPDATE cars SET name=?, price=?, color=?, in_stock=? WHERE id=${parseInt(
    req.params.id
  )}`;
  connector.query(
    sql,
    [name, price, color, in_stock],
    function (err, results, fields) {
      res.json({err, results, fields});
    }
  );
});
module.exports = router;
