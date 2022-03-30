var express = require('express');
var router = express.Router();

router.get('/setcookie/:name/:age/:city', function (req, res) {
  var users = {
    name: req.params.name,
    age: parseInt(req.params.age),
    city: req.params.city,
  };
  const userdata = JSON.stringify(users);
  res.cookie('Usersdata', userdata);
  res.send(
    `cookie with name ${req.params.name} , age ${req.params.age} and city ${req.params.city} is set`
  );
});
router.get('/viewcookies', function (req, res) {
  res.send(req.cookies);
});
module.exports = router;
