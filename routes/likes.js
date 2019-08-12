var express = require('express');
var router = express.Router();
const Likes = require('../models/likes');

router.post('/like', function (req, res, next) {
    // let body = JSON.parse(req.body);
    console.log(typeof req.body);
    Likes.like(req.body, (r, err) => {
        if (!err) {
            console.log(r);
            res.status(200).json({
                message: 'success!',
                recipient_id: req.body.recipient_id
            })
        } else {
            console.log(err)
        }
    })
});

router.delete('/like', function (req, res, next) {
    let body = JSON.parse(JSON.stringify(req.body));
    Likes.dislike(body, (queryRes, err) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).json({
                message: 'success!'
            })
        }
    })
});


router.get('/mylikes/:id', function (req, res, next) {
    // let body = JSON.parse(JSON.stringify(req.body));
    // console.log('id', req.params.id);
    Likes.myLikes(req.params.id)
        .then((likes) => {
                // console.log('likes', JSON.stringify(likes));
                res.status(200).json({
                    message: 'success!',
                    likes: JSON.stringify(likes)
                })
            }
        );
});

router.get('/commonlikes/:id', function (req, res, next) {
    // let body = JSON.parse(JSON.stringify(req.body));
    // console.log('id', req.params.id);
    Likes.commonLikes(req.params.id)
        .then((likes) => {
                console.log('likes', JSON.stringify(likes));
                res.status(200).json({
                    message: 'success!',
                    likes: JSON.stringify(likes)
                })
            }
        );
});

router.get('/likesize/:id', function (req, res, next) {
    // let body = JSON.parse(JSON.stringify(req.body));
    // console.log('id', req.params.id);
    Likes.commonLikes(req.params.id)
        .then((commonLikes) => {
            Likes.likesMe(req.params.id)
                .then((likes) => {
                    console.log('likes', JSON.stringify(likes));
                    res.status(200).json({
                        message: 'success!',
                        likes: JSON.stringify(likes.length),
                        commonLikes: JSON.stringify(commonLikes.length)
                    })
                })

            }
        );
});

router.get('/:id', function (req, res, next) {
    // let body = JSON.parse(JSON.stringify(req.body));
    // console.log('id', req.params.id);
    Likes.likesMe(req.params.id)
        .then((likes) => {
                console.log('likesMe', JSON.stringify(likes));
                res.status(200).json({
                    message: 'success!',
                    likes: JSON.stringify(likes)
                })
            }
        );
});

module.exports = router;
