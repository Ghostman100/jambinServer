var db = require('../pool');

class Likes {
    static like(params, cb) {
        const query = 'INSERT INTO likes set ?';
        db.query(query, params, cb)
    }

    static dislike(params, cb) {
        const query = 'DELETE FROM likes  where sender_id=' + params.sender_id + ' and recipient_ip=' + params.recipient_id;
        db.query(query, params, cb)
    }

    static myLikes(params, cb) {
        const query = 'SELECT recipient_id from likes where sender_id=?';
        db.query(query, params, cb)
    }
}

module.exports = Likes;