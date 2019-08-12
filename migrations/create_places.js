const pool = require('../database');


pool.getConnection(function (err, connection) {

    let createPlaces = 'CREATE TABLE places (' +
        'id int NOT NULL AUTO_INCREMENT, ' +
        'name varchar(100), ' +
        'address varchar(100),' +
        'latitude FLOAT(7, 5),' +
        'longitude FLOAT(8, 5),' +
        'PRIMARY KEY(id)' +
        ')';

    connection.query(createPlaces, function (error, results, fields) {
        // When done with the connection, release it.
        console.log(error, results, fields);
    });
    connection.release();
});
