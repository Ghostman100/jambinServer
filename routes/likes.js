var express = require('express');
var router = express.Router();
const Likes = require('../models/likes');

router.post('/like', function (req, res, next) {
    let body = JSON.parse(JSON.stringify(req.body));
    console.log(body);
    Likes.like(body, (r, err) => {
        if (!err) {
            console.log(r);
            res.status(200).json({
                message: 'success!'
            })
        } else {
            console.log(err)
        }
    })
});

router.delete('/like', function (req, res, next) {
    let body = JSON.parse(JSON.stringify(req.body));
    Likes.dislike(body, () => {
        res.status(200).json({
            message: 'success!'
        })
    })
});


router.get('/mylikes/:id', function (req, res, next) {
    // let body = JSON.parse(JSON.stringify(req.body));
    console.log(req.params.id);
    Likes.myLikes(req.params.id, (likes, err) => {
        if (!err) {
            console.log('likes', JSON.stringify(likes));
            res.status(200).json({
                message: 'success!',
                likes: JSON.stringify(likes)
            })
        } else {
            console.log(err)
        }
    })
});

module.exports = router;