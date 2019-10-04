const pool = require('../database');


pool.getConnection(function (err, connection) {
    if (err)
        console.log(err);
    let changePlaces = 'ALTER TABLE places ' +
        'ADD removed boolean not null default 0 ';
    connection.query(changePlaces, function (error, results, fields) {
        console.log(error, results, fields);
    });
    connection.release();
});
