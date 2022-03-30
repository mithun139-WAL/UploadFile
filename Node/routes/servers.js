const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const port = 3000;
const cors = require('cors');

// const MongoClient = require('mongodb').MongoClient;
// ObjectId = require('mongodb').ObjectId;

// const myurl = 'mongodb://localhost:27017';
router.use(cors());
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

var upload = multer({storage: storage});

// router.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

// upload single file

router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }

  res.send(file);
});

//Uploading multiple files

router.post(
  '/uploadmultiple',
  upload.array('myFiles', 12),
  (req, res, next) => {
    const files = req.files;
    if (!files) {
      const error = new Error('Please choose files');
      error.httpStatusCode = 400;
      return next(error);
    }

    res.send(files);
  }
);

// router.post('/uploadphoto', upload.single('picture'), (req, res) => {
//   var img = fs.readFileSync(req.file.path);
//   var encode_image = img.toString('base64');
//   // Define a JSONobject for the image attributes for saving to database

//   var finalImg = {
//     contentType: req.file.mimetype,
//     image: new Buffer(encode_image, 'base64'),
//   };
//   db.collection('mycollection').insertOne(finalImg, (err, result) => {
//     console.log(result);

//     if (err) return console.log(err);

//     console.log('saved to database');
//     res.redirect('/');
//   });
// });

// router.get('/photos', (req, res) => {
//   db.collection('mycollection')
//     .find()
//     .toArray((err, result) => {
//       const imgArray = result.map((element) => element._id);
//       console.log(imgArray);

//       if (err) return console.log(err);
//       res.send(imgArray);
//     });
// });

// router.get('/photo/:id', (req, res) => {
//   var filename = req.params.id;

//   db.collection('mycollection').findOne(
//     {_id: ObjectId(filename)},
//     (err, result) => {
//       if (err) return console.log(err);

//       res.contentType('image/jpeg');
//       res.send(result.image.buffer);
//     }
//   );
// });

module.exports = router;
