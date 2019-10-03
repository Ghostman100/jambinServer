const pool = require('../database');


pool.getConnection(function (err, connection) {
    if (err)
        console.log(err);
    let changePlaces = 'ALTER TABLE user ' +
        'ADD created_at TIMESTAMP, ' +
        'ADD updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()';
    connection.query(changePlaces, function (error, results, fields) {
        console.log(error, results, fields);
    });
    connection.release();
});
