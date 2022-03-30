const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({storage: storage});

app.use(cors());

app.post('/image', upload.single('file'), function (req, res) {
  res.json({});
});
app.post('/images', upload.array('file', 12), function (req, res) {
  res.json({});
});
app.get('/', function (req, res) {
  res.send('Server');
});
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
