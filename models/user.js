var pool = require('../database');
var db = require('../pool');

class User {
    static create(params, cb) {
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                throw err;
            }
        connection.query('INSERT INTO user SET ?', params, function (error, results, fields) {
            console.log(error, results);
            cb(results.insertId);
            connection.release();
        });
            connection.on('error', function (err) {
                throw err;
                return;
            });
        });
    }

    static update(id, params) {
        const query = 'UPDATE user set ? where id=' + id;
        return (new Promise((resolve => {
                db.query(query, params, (user, err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        resolve(user)
                    }
                })
            })
        ))
    }

    static find(id, cb, errorCb) {
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                errorCb(err);
                throw err;
            }
            connection.query('SELECT * from user where id=?', id, function (error, results, fields) {
                cb(results);
                connection.release();
            });
            connection.on('error', function (err) {
                errorCb(err);
                throw err;
            });
        });

    }

    static search(params) {
        console.log(params);
        const query = "SELECT * FROM user where name like '%" + params + "%' OR phoneNumber like '%" + params + "%'";
        return (new Promise((resolve => {
                db.query(query, params, (users, err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        resolve(users)
                    }
                })
            })
        ))
    }

    static all(cb) {
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                throw err;
            }
            connection.query('SELECT id, name, birthday, phoneNumber, photoPath, status, about, sex, preference, updated_at from user', function (error, results, fields) {
                // console.log(error, results);
                cb(results);
                connection.release();
            });
            connection.on('error', function (err) {
                console.log('onerror', err);
                return;
            });
        });
    }

}

module.exports = User;
