const pool = require('../database');
const sharp = require('sharp');


pool.getConnection(function (err, connection) {
    const query = 'SELECT photoPath, id from user';

    connection.query(query, function (error, results, fields) {
        // When done with the connection, release it.
        // console.log(error, results, fields);
        console.log(results[0].photoPath);
        let path = results[0].photoPath;

        results.forEach((path) => {
            // b = path.slice('/')
            let newPath = 'public/images/' + path.photoPath;
            sharp(newPath)
                .resize(600, 600)
                .toFile('public/images/large_' + path.photoPath, (err, info) => {
                    console.log(err, info);
                    connection.query('update user set ' + "photoPath= 'large_" + path.photoPath + "' where id=" + path.id, (error, res) => {
                        console.log(error, res )
                    })
                })
        })
    });
    connection.release();
});