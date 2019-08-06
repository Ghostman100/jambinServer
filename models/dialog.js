var pool = require('../database');
var db = require('../pool');

class Dialog {

    static getMessages(id1, id2, cb)
    {
        pool.getConnection((err, connection) => {
            if (err) {
                connection.release();
                throw err;
            }
            const query = 'SELECT * ' +
                'from messages ' +
                'where ' +
                '(messages.sender_id = ' + id1 + ' and messages.recipient_id = ' + id2 +
                ' or ' +
                'messages.sender_id = ' + id2 + ' and messages.recipient_id = ' + id1 + ')';
            connection.query(query, {id1: id1, id2: id2}, function (error, results, fields) {
                console.log(error, results);
                cb(results);
                connection.release();
            });
            connection.on('error', function (err) {
                console.log('onerror', err);
                return;
            });
        })
    }

    static create(from, to, message, cb) {
        pool.getConnection((err, connection) => {
            if (err) {
                connection.release();
                throw err;
            }
            const query = 'INSERT INTO messages set ?';
            let set = {
              sender_id: from,
              recipient_id: to,
              text: message
            };
            connection.query(query, set, function (error, results, fields) {
                console.log(error, results);
                cb(results);
                connection.release();

            });
            connection.on('error', function (err) {
                console.log('onerror', err);
                return;
            });
        })
    }

    static getDialogs(user_id) {
        let query = 'SELECT ' +
            'messages.*, user.id as user_id, user.name, user.photoPath ' +
            'FROM ' +
            'messages, user ' +
            'WHERE ' +
            'messages.id IN ( ' +
            '    SELECT ' +
            'MAX(id) ' +
            'FROM ' +
            '(SELECT ' +
            'IF(m.sender_id =' + user_id + ', m.recipient_id, m.sender_id) as other_user_id, ' +
            '    m.id ' +
            'FROM ' +
            'messages m ' +
            'WHERE ' +
            'm.recipient_id = ' + user_id + ' OR m.sender_id = ' + user_id + ') me ' +
            'GROUP BY ' +
            'other_user_id ' +
            ') ' +
            'and user.id = IF(messages.sender_id = ' + user_id + ', messages.recipient_id, messages.sender_id) ' +
            'ORDER BY ' +
            'messages.id DESC';
        return (new Promise((resolve => {
                db.query(query, user_id, (users, err) => {
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

module.exports = Dialog;
