var db = require('../pool');
const Users = require('./user');

class Likes {
    static like(params, cb) {
        const query = 'INSERT INTO likes set ?';
        db.query(query, params, cb);
        Users.pushNotification(params.recipient_id, "К вам проявлена симпатия")
    }

    static dislike(params, cb) {
        const query = 'DELETE FROM likes  where sender_id=' + params.sender_id + ' and recipient_id=' + params.recipient_id;
        db.query(query, params, cb)
    }

    static myLikes(params) {
        const query = 'SELECT recipient_id from likes where sender_id=?';
        return (new Promise(resolve => {
                    db.query(query, params, (ids, err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let ar = ids.map((id) => {
                                return (id.recipient_id)
                            });
                            resolve(ar)
                        }
                    });

                }
            )
        )
    }

    static likesMe(params) {
        const query = 'SELECT * from user where id in (SELECT sender_id from likes where recipient_id=?)';
        return (new Promise((resolve => {
                db.query(query, params, (users, err) => {
                    if (err) {
                        console.log(err)
                    } else {
                       resolve(users)
                    }
                })
            })
        ))
    }

    static commonLikes(params) {
        const a = 'SELECT sender_id from likes where recipient_id=' + params;
        const b = 'SELECT recipient_id from likes where sender_id=' + params + ' and recipient_id in (' + a + ')';
        const query = 'SELECT * from user where id in (' + b + ')';

        return (new Promise((resolve => {
                db.query(query, params, (users, err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        resolve(users)
                    }
                })
            })
        ))
    }
}

module.exports = Likes;
