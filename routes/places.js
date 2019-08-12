var express = require('express');
var router = express.Router();
var Places = require('../models/places');

router.get('/all', function (req, res, next) {
    Places.all()
        .then((places) => {
            console.log('places', JSON.stringify(places));
            res.status(200).json(JSON.stringify(places))
        } )
});

module.exports = router;
