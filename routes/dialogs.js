var express = require('express');
var router = express.Router();
const Dialog = require('../models/dialog');

router.get('/:id', function (req, res, next) {
    // console.log(req.params.id);
    Dialog.getDialogs(req.params.id)
        .then((result) => {
            // console.log('dialogs', result);
            res.status(200).json({
                message: 'success!',
                dialogs: JSON.stringify(result)
            })
        })
});

router.post('/delete', function (req, res, next) {
   Dialog.deleteDialog(req.body.id1, req.body.id2)
       .then(() => {
           res.status(200).json({
               message: 'success!'
           })
       })
});


module.exports = router;
