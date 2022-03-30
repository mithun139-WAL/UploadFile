var express = require('express');
var router = express.Router();

router.get('/setcookie/:name/:age/:city', function (req, res) {
  res.cookie(req.params.user, req.params.city);
  res.send(
    `cookie with name ${req.params.city} and user ${req.params.user} is set`
  );
});
router.get('/viewcookies', function (req, res) {
  res.send(req.cookies);
});
router.get('/delete/:city', function (req, res) {
  res.clearCookie(req.params.city);
  res.send(`cookies with name ${req.params.city} is deleted`);
});
module.exports = router;
