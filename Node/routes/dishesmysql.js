var express = require('express');
var router = express.Router();
const connector = require('../poolconnect');
router.get('/createTable', function (req, res) {
  var sql =
    'CREATE TABLE dishes(name varchar(100),description text,dish_id int AUTO_INCREMENT PRIMARY KEY,categories_id int,price int, FOREIGN KEY (categories_id) REFERENCES categories(category_id) ON UPDATE CASCADE ON DELETE CASCADE)';
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
router.post('/', function (req, res) {
  const {name, description, dish_id, categories_id, price} = req.body;
  var sql = `INSERT INTO dishes (name, description, dish_id, categories_id, price) VALUES (?,?,?,?,?)`;
  connector.query(
    sql,
    [name, description, dish_id, categories_id, price],
    function (err, results, fields) {
      res.json({err, results, fields});
    }
  );
});
router.get('/', function (req, res) {
  var sql = 'SELECT * FROM dishes';
  connector.query(sql, function (err, results) {
    res.json({err, results});
  });
});
router.get('/:id', function (req, res) {
  var sql = `SELECT * FROM dishes WHERE dish_id=${parseInt(req.params.id)}`;
  connector.query(sql, function (err, results) {
    res.json({err, results});
  });
});
router.delete('/:id', function (req, res) {
  const sql = `DELETE FROM dishes WHERE dish_id=${parseInt(req.params.id)}`;
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
router.delete('/', function (req, res) {
  const sql = `DELETE FROM dishes`;
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
router.put('/:dish_id', function (req, res) {
  const {name, description, dish_id, categories_id, price} = req.body;
  var sql = `UPDATE dishes SET name=?, description=?, dish_id=?, categories_id=?, price=? WHERE dish_id=${parseInt(
    req.params.dish_id
  )}`;
  connector.query(
    sql,
    [name, description, dish_id, categories_id, price],
    function (err, results, fields) {
      res.json({err, results, fields});
    }
  );
});
module.exports = router;
