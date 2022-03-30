var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const {writeFile, readFile} = require('fs');

router.get('/createfile', function (req, res) {
  writeFile('file.txt', 'Writing contents to the file using fs', (err) => {
    if (err) {
      throw err;
    } else {
      res.send('file created/ modified');
    }
  });
});
router.get('/readfile/:fileName', function (req, res) {
  const filePath = path.join(__dirname, '../', req.params.fileName);
  console.log(filePath);
  readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      res.json(err);
    } else {
      res.send(content);
    }
  });
});

router.get('/readdirectory', function (req, res) {
  fs.readdir(__dirname, (err, files) => {
    if (err) res.json(err);
    console.log(files);
    res.send(files);
  });
});

router.get('/deletefile/:filename', function (req, res) {
  const filePath = path.join(__dirname, '../', req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) res.json(err);
    res.send(`file with name ${req.params.filename} is deleted`);
  });
});
router.get('/addcontent/:fileName', function (req, res) {
  const filePath = path.join(__dirname, '../', req.params.fileName);
  const data = '\n line 1 \n line 2 \n line 3 \n line 4 \n line 5 \n ';
  fs.appendFile(filePath, data, (err) => {
    if (err) res.json(err);
    res.send(
      `Conents in the file with name ${req.params.fileName} is appended`
    );
  });
});
module.exports = router;
