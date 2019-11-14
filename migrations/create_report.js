const pool = require('../database');


pool.getConnection(function (err, connection) {

    let createPlaces = 'CREATE TABLE reports (' +
        'id int NOT NULL AUTO_INCREMENT, ' +
        'reported_id int, ' +
        'user_id int,' +
        'created_at timestamp,' +
        'type varchar(100),' +
        'PRIMARY KEY(id)' +
        ')';

    connection.query(createPlaces, function (error, results, fields) {
        // When done with the connection, release it.
        console.log(error, results, fields);
    });
    connection.release();
});
