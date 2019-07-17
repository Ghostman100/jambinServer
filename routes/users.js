var express = require('express');
var router = express.Router();

const multer = require('multer');
// const bodyParser = require('body-parser');
// router.use(bodyParser.json());

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, '../public/images')
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  },
});

const upload = multer({ storage: Storage });

router.post('/create', upload.single('avatar'), function(req, res, next) {
  console.log('file', req.file);
  console.log('body', req.body);
  res.status(200).json({
    message: 'success!',
  })
});

module.exports = router;
