var express = require('express');
var router = express.Router();
var Places = require('../models/places');

router.get('/all', function (req, res, next) {
    Places.all()
        .then((places) => {
            console.log('places', JSON.stringify(places));
            res.status(200).json(JSON.stringify(places))
        })
});

router.get('', (req, res) => {
    console.log(req.query);
   Places.findByPlace({latitude: req.query.latitude, longitude: req.query.longitude})
       .then((places) => {
           console.log('places', JSON.stringify(places));
           res.status(200).json(JSON.stringify(places))
       })});

router.post('/create', function (req, res, next) {
    // let body = JSON.parse(JSON.stringify(req.body));
    console.log(req.body);
    Places.create(req.body)
        .then((places) => {
            console.log('places', JSON.stringify(places));
            res.status(200).json({
                message: 'success!'
            })
        })
        .catch(() => res.status(500))
});

module.exports = router;
