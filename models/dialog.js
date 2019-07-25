var pool = require('../database');


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
                '((message.sender_id= :id1 and message.recipient_id = :id2) ' +
                'or ' +
                '(message.sender_id= :id1 and message.recipient_id = :id2))';
            connection.query(query,function (error, results, fields) {
                console.log(error, results);
                cb(results);
            });
            connection.on('error', function (err) {
                console.log('onerror', err);
                return;
            });
        })
    }

    static create(message, from, to, cb) {
        pool.getConnection((err, connection) => {
            if (err) {
                connection.release();
                throw err;
            }
            const query = 'INSERT INTO messages set ?';
            let set = {
              sender_id: from,
              recipient_id: to,
              created_at: + new Date(),
              text: message
            };
            connection.query(query, set, function (error, results, fields) {
                console.log(error, results);
                cb(results);
            });
            connection.on('error', function (err) {
                console.log('onerror', err);
                return;
            });
        })
    }

}

module.exports = Dialog;
