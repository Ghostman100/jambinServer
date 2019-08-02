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

    static getDialogs(user_id, cb) {
        // let query = 'SELECT * from messages where id in (SELECT DISTINCT id from messages where  '
        // db.query(query, user_id, cb)
    }

}

module.exports = Dialog;
