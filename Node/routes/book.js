var express = require('express');
var router = express.Router();
const bookController = require('../controllers/books');
router.get('/', bookController.getBooks);
router.post('/', bookController.createBooks);
router.get('/bookandauthor', bookController.getBookWithAuthor);
router.get('/bookwithcondition/:name', bookController.getBookWithCondition);
router.get('/isloggedin', function (req, res) {
  res.send(`
    username = ${req.session.username} and city = ${req.session.city} and hobby = ${req.session.hobby}
    `);
});
module.exports = router;
