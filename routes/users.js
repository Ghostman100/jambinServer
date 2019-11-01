var express = require('express');
var router = express.Router();
const Users = require('../models/user');
const multer = require('multer');
const Photos = require('../models/photos');
const sharp = require('sharp');

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
    const path = 'public/images/' + req.file.filename;
    sharp(path)
        .resize(200)
        .toFile('public/images/s_' + req.file.filename, (err, info) => {
            console.log(err, info);
        });
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

router.post('/delete', (req, res, next) => {
    console.log(req.body);
   Users.delete(req.body.id)
       .then(() => {
           res.status(200).json({
               status: "success"
           })
           }
       )
});

router.get('/where', (req, res, next) => {
    // console.log(req.query);
    Users.where(req.query.key, req.query.value)
        .then((users) => {
                res.status(200).json(users)
            }
        )
});

router.get('/search', (req, res, next) => {
    // console.log(req.query);
    Users.search(req.query.q)
        .then((users) => {
                res.status(200).json(users)
            }
        )
});

router.post('/photo/delete', (req, res, next) => {
    Photos.delete(req.body.id)
        .then(() => {
            res.status(200).json({
                status: "success"
            })
        })
});

router.post('/photo/delete_main', (req, res, next) => {
    Photos.deleteMain(req.body.id)
        .then(() => {
            res.status(200).json({
                status: "success"
            })
        })

});

router.post('/photo/make_main', (req, res, next) => {
    Photos.makeMain(req.body)
        .then(() => {
            res.status(200).json({
                status: "success"
            })
        })
});

router.post('/photo', upload.single('photo'), function (req, res, next) {
    let body = JSON.parse(JSON.stringify(req.body));
    body['path'] = req.file.filename;
    const path = 'public/images/' + req.file.filename;
    sharp(path)
        .resize(200)
        .toFile('public/images/s_' + req.file.filename, (err, info) => {
            console.log(err, info);
        });
    Photos.add(body)
        .then((photos) => {
            console.log(JSON.stringify(photos));
            res.status(200).json({
                message: 'success!',
                path: body.path,
                id: photos.insertId
            })
        })
});

router.get('/age', (req, res, next) => {
    console.log(req.query);
    Users.age(req.query.start, req.query.end)
        .then((users) => {
                res.status(200).json(users)
            }
        )
});

router.get('/all', function (req, res, next) {
    // console.log('all');
    Users.all((users) => {
        // console.log('router', JSON.stringify(users));
        res.status(200).json(users)
    })
});

router.get('/photo/:id', function (req, res, next) {
    Photos.find(req.params.id)
        .then((photos) => {
            // console.log(JSON.stringify(user));
            res.status(200).json(photos)
        })
});

router.get('/sympathy/:id', function (req, res, next) {
    Users.find(req.params.id, (user) => {
        // console.log(JSON.stringify(user));
        res.status(200).json(user[0])
    })
});

router.put('/:id', function (req, res, next) {
    console.log(req.body);
    Users.update(req.params.id, req.body)
        .then((profile) => {
            res.status(200).json({
                status: "success"
            })
        })
});

router.get('/:id', function (req, res, next) {
    Users.find(req.params.id, (user) => {
            console.log(JSON.stringify(user));
            res.status(200).json(user[0])
        },
        (err) => res.status(400))
});


module.exports = router;
