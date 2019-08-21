const pool = require('../database');


pool.getConnection(function (err, connection) {
    if (err)
        console.log(err);
    let changePlaces = 'ALTER TABLE places ' +
        'ADD city varchar(100), ' +
        'ADD kind varchar(100)';
    connection.query(changePlaces, function (error, results, fields) {
        console.log(error, results, fields);
    });
    connection.release();
});
