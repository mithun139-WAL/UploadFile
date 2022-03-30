var express = require('express');
var router = express.Router();

router.post(
  '/setcookie/:name1/:value1/:name2/:value2/:name3/:value3/:name4/:value4/',
  function (req, res) {
    res.cookie(req.params.name1, req.params.value1);
    res.cookie(req.params.name2, req.params.value2);
    res.cookie(req.params.name3, req.params.value3);
    res.cookie(req.params.name4, req.params.value4);
    res.send(
      `cookie with name ${req.params.name} and value ${req.params.value} set`
    );
  }
);

router.get('/viewcookies', function (req, res) {
  res.send(req.cookies);
});
router.get('/delete/:name', function (req, res) {
  res.clearCookie(req.params.name);
  res.send(`cookies with name ${req.params.name} is deleted`);
});
router.get('/setcookiewithtime/:name/:value/:time', function (req, res) {
  res.cookie(req.params.name, req.params.value, {
    maxAge: req.params.time * 60 * 1000,
  });
  res.send(
    `cookies with name ${req.params.name} and value is ${req.params.value} set and will expire in ${req.params.time} minutes`
  );
});
module.exports = router;
