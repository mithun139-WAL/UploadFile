var express = require('express');
var router = express.Router();
const connector = require('../poolconnect');
router.get('/createtable', function (req, res) {
  const sqlQuery = `CREATE TABLE users(id int AUTO_INCREMENT PRIMARY KEY, username VARCHAR(25), password VARCHAR(100), date_of_creation DATE)`;
  connector.query(sqlQuery, function (err, results, fields) {
    res.json(results);
  });
});
router.get('/', function (req, res) {
  const sqlQuery = `SELECT * FROM users`;
  connector.query(sqlQuery, function (err, results) {
    if (err) {
      res.json({err});
    } else {
      res.json({results});
    }
  });
});
router.post('/', function (req, res) {
  const {id, username, password} = req.body;
  let date_of_creation = new Date();
  checkForUsernameQuery = `SELECT * FROM users WHERE username = "${username}"`;
  connector.query(checkForUsernameQuery, function (err, results, fields) {
    if (err) {
      res.json({err});
    } else {
      if (results.length > 0) {
        res.json({status: 0, debug_data: 'username already exists'});
      } else {
        const sqlQuery = `INSERT INTO users (id, username, password, date_of_creation) VALUES(?,?,?,?)`;
        connector.query(
          sqlQuery,
          [id, username, password, date_of_creation],
          function (err, results, fields) {
            if (err) {
              res.json(err);
            } else {
              res.json({status: 1, data: 'user created'});
            }
          }
        );
      }
    }
  });
});
router.put('/:id', function (req, res) {
  let id = req.params.id;
  const {username, password} = req.body;
  const sqlQuery = `UPDATE users SET username="${username}", password="${password}" where id=${id}`;
  connector.query(sqlQuery, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      res.json('user details updated');
    }
  });
});
router.delete('/:id', function (req, res) {
  const sqlQuery = `DELETE FROM users WHERE id=${req.params.id}`;
  connector.query(sqlQuery, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      res.json('Deleted user');
    }
  });
});
router.get('/:id', function (req, res) {
  let id = req.params.id;
  const sqlQuery = `SELECT username, password FROM users WHERE id=${req.params.id}`;
  connector.query(sqlQuery, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      res.json(results);
    }
  });
});
router.get('/checklogin/:username/:password', function (req, res) {
  let username = req.params.username;
  let password = req.params.password;
  const sqlQuery = `SELECT * FROM users WHERE username = "${username}" and password = "${password}"`;
  connector.query(sqlQuery, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      if (results.length == 0) {
        req.session['isLoggedIn'] = 0;
        res.json({status: 0, data: 'incorrect login details'});
      } else {
        req.session['isLoggedIn'] = 1;
        req.session['username'] = username;
        res.json(`{status:1, data:${username}}`);
      }
    }
  });
});
module.exports = router;
