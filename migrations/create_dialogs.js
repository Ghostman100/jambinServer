const pool = require('../database');


pool.getConnection(function (err, connection) {
   let createDialog = 'CREATE TABLE dialog (' +
       'id int NOT NULL AUTO_INCREMENT,' +
       'user_id_1 int,' +
       'user_id_2 int,' +
       'PRIMARY KEY(id))';
   let createMessage = 'CREATE TABLE messages (' +
       'id int NOT NULL AUTO_INCREMENT,' +
       'sender_id int,' +
       'recipient_id int,' +
       'created_at timestamp,' +
       'text varchar(400)' +
       'PRIMARY KEY(id))';
    // connection.query(createDialog, function (error, results, fields) {
    //     // When done with the connection, release it.
    //     console.log(error, results, fields);
    // });
    connection.query(createMessage, function (error, results, fields) {
        // When done with the connection, release it.
        console.log(error, results, fields);
    });
});
