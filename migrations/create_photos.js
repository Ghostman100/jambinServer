const pool = require('../database');


pool.getConnection(function (err, connection) {
    if (err)
        console.log(err);
    let createPhotos = 'CREATE TABLE photos (' +
        'id int NOT NULL AUTO_INCREMENT,' +
        'user_id int,' +
        'path varchar(100),' +
        'created_at timestamp, ' +
        'PRIMARY KEY(id))';

    connection.query(createPhotos, function (error, results, fields) {
        console.log(error, results, fields);
    });
    connection.release();
});
