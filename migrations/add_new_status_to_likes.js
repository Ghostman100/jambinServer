const pool = require('../database');


pool.getConnection(function (err, connection) {
    if (err)
        console.log(err);
    let changeUser = 'ALTER TABLE likes ' +
        'ADD new_status BOOLEAN default 1';
    connection.query(changeUser, function (error, results, fields) {
        console.log(error, results, fields);
    });
    connection.release();
});
