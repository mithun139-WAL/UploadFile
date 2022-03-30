var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const {writeFile, readFile} = require('fs');

router.get('/createfile/:filename/:filecontent', function (req, res) {
  fs.mkdir('./files', (err) => {
    if (err) {
      if (err.code == 'EEXIST') {
        const filePath = path.join(__dirname, '../files', req.params.filename);
        fs.writeFile(filePath, req.params.filecontent, (error) => {
          if (error) {
            throw error;
          } else {
            res.send('file created');
          }
        });
      } else {
        res.json(err);
      }
    } else {
      const filePath = path.join(__dirname, '../files', req.params.filename);
      fs.writeFile(filePath, req.params.filecontent, (err) => {
        if (err) {
          throw err;
        } else {
          res.send('file created');
        }
      });
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
router.get('/addcontent/:fileName/:filecontent', function (req, res) {
  const filePath = path.join(__dirname, '../files', req.params.fileName);
  fs.appendFile(filePath, req.params.filecontent, (err) => {
    if (err) res.json(err);
    res.send(`file with name ${req.params.fileName} added`);
  });
});
router.get('/foldercontents', function (req, res) {
  const folderPath = path.join(__dirname, '../files/');
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      res.json(err);
    } else {
      res.send(files);
    }
  });
});
router.get('/createfolder/:foldername', function (req, res) {
  const filePath = path.join(__dirname, '../files', req.params.foldername);
  fs.mkdir(filePath, (err) => {
    if (err) {
      if (err.code == 'EEXIST') {
        res.send('Folder already Exist');
      } else {
        res.json(err);
      }
    } else {
      res.json('Folder created');
    }
  });
});
router.get('/deletefile/:filename', function (req, res) {
  const filePath = path.join(__dirname, '../files', req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) res.json(err);
    res.send(`file with name ${req.params.filename} is deleted`);
  });
});
router.get('/readfile/:fileName', function (req, res) {
  const filePath = path.join(__dirname, '../files', req.params.fileName);
  console.log(filePath);
  readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      res.json(err);
    } else {
      res.send(content);
    }
  });
});
router.get('/modifyfile/:filename/:filecontent', function (req, res) {
  const filePath = path.join(__dirname, '../files', req.params.filename);
  fs.writeFile(filePath, req.params.filecontent, (err) => {
    if (err) {
      res.json(err);
    } else {
      res.json('File contents modified');
    }
  });
});
module.exports = router;
