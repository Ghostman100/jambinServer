const pool = require('../database');


pool.getConnection(function (err, connection) {
    if (err)
        console.log(err);
    let changePlaces = 'ALTER TABLE user ' +
        'ADD place_id int ';
    connection.query(changePlaces, function (error, results, fields) {
        console.log(error, results, fields);
    });
    connection.release();
});
