var express = require('express');
var router = express.Router();
const Users = require('../models/user');
const multer = require('multer');
// const bodyParser = require('body-parser');
// router.use(bodyParser.json());

const Storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './public/images')
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    },
});

const upload = multer({storage: Storage});

router.post('/create', upload.single('photo'), function (req, res, next) {
    let body = JSON.parse(JSON.stringify(req.body));
    body['photoPath'] = req.file.filename;
    body['phoneNumber'] = body.phone;
    body['birthday'] = new Date(body.birthday.replace(/"/gi, ''));
    delete body['phone'];
    Users.create(body, (id) => {
        res.status(200).json({
            message: 'success!',
            id: id,
        })
    });

});

router.get('/all', function (req, res, next) {
    // console.log('all');
    Users.all((users) => {
        // console.log('router', JSON.stringify(users));
        res.status(200).json(users)
    })
});

router.get('/sympathy/:id', function (req, res, next) {
    Users.find(req.params.id, (user) => {
        // console.log(JSON.stringify(user));
        res.status(200).json(user[0])
    })
});

router.get('/:id', function (req, res, next) {
    Users.find(req.params.id, (user) => {
        // console.log(JSON.stringify(user));
        res.status(200).json(user[0])
    })
});


module.exports = router;
