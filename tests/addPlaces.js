const pool = require('../database');


pool.getConnection(function (err, connection) {
   const query1 = "INSERT INTO places set latitude=55.75222, longitude= 37.61556, address='Moscow', name='Москва'";
   const query2 = "INSERT INTO places set latitude =55.75322, longitude= 37.61656, address='Moscow2', name='Москва2'";

    connection.query(query1, function (error, results, fields) {
        // When done with the connection, release it.
        console.log(error, results, fields);
    });

    connection.query(query2, function (error, results, fields) {
        // When done with the connection, release it.
        console.log(error, results, fields);
    });
    connection.release();
});
