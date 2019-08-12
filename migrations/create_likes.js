const pool = require('../database');


pool.getConnection(function (err, connection) {
    if (err)
        console.log(err);
    let createLikes = 'CREATE TABLE likes (' +
        'id int NOT NULL AUTO_INCREMENT,' +
        'sender_id int,' +
        'recipient_id int,' +
        'created_at timestamp, ' +
        'PRIMARY KEY(id))';

    // connection.query(createDialog, function (error, results, fields) {
    //     // When done with the connection, release it.
    //     console.log(error, results, fields);
    // });
    connection.query(createLikes, function (error, results, fields) {
        // When done with the connection, release it.
        console.log(error, results, fields);
    });
    connection.release();
});
