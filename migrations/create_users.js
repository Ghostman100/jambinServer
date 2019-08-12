
const pool = require('../database');


pool.getConnection(function (err, connection) {
    if (err)
        console.log(err);
    let query = 'CREATE TABLE user (' +
        'id int NOT NULL AUTO_INCREMENT,' +
        'name VARCHAR(40) NOT NULL,' +
        'birthday DATE,' +
        'sex CHAR(1),' +
        'preference CHAR(1),' +
        'about VARCHAR(200),' +
        'status VARCHAR(100),' +
        'phoneNumber VARCHAR(15),' +
        'photoPath VARCHAR(100),' +
        'PRIMARY KEY(id)' +
        ')';


    connection.query(query, function (error, results, fields) {
        // When done with the connection, release it.
        console.log(error, results, fields);
    });
});
