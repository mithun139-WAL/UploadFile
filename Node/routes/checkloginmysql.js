var express = require('express');
var router = express.Router();
const connector = require('../poolconnect');

router.get('/', function (req, res) {
  console.log(req.session['isLoggedIn']);
  if ((req.session['isLoggedIn'] = 1 && req.session['username'])) {
    let username = req.session['username'];
    const sqlQuery = `SELECT * FROM users WHERE username = "${username}"`;
    connector.query(sqlQuery, function (error, results) {
      if (error) {
        res.json({error});
      } else {
        res.json({results});
      }
    });
  } else {
    res.json('Not LoggedIn');
  }
  req.session['isLoggedIn'] = 0;
  req.session['username'] = '';
});
module.exports = router;
