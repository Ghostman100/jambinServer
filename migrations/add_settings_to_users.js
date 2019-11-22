const pool = require('../database');


pool.getConnection(function (err, connection) {
    if (err)
        console.log(err);
    let changePlaces = 'ALTER TABLE user ' +
        'ADD likes_push int default 1, ' +
        'ADD message_push BOOLEAN default 1, ' +
        'ADD common_likes_pushes BOOLEAN default 1,' +
        'ADD hide_age BOOLEAN default 0 ';
    connection.query(changePlaces, function (error, results, fields) {
        console.log(error, results, fields);
    });
    connection.release();
});
