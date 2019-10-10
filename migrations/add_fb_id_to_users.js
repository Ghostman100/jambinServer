const pool = require('../database');


pool.getConnection(function (err, connection) {
    if (err)
        console.log(err);
    let changeUser = 'ALTER TABLE user ' +
        'ADD fb_id varchar(20)';
    connection.query(changeUser, function (error, results, fields) {
        console.log(error, results, fields);
    });
    connection.release();
});
