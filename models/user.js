var pool = require('../database');
var db = require('../pool');
const {Expo} = require('expo-server-sdk');

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

    static reports(type) {
        let dop;
        if (type) {
            dop = " and reports.type = '" + type + "'";
        } else {
            dop = '';
        }
        const query = 'select reports.*, user.name, user.sex, user.birthday from user, reports where reports.reported_id = user.id' + dop;
        return (new Promise((resolve => {
                db.query(query, null, (reports, err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        resolve(reports)
                    }
                })
            })
        ))
    }

    static report(params) {
        const query = 'INSERT INTO reports set ?';
        return (new Promise((resolve => {
                db.query(query, params, (user, err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        resolve()
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

    static delete(id) {
        const query = 'DELETE FROM user where id = ' + id;
        return (new Promise((resolve => {
                db.query(query, null, (users, err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        resolve(users)
                    }
                })
            })
        ))
    }

    static age(start, end) {
        let date = new Date();
        let startDate = date.setFullYear(date.getFullYear() - start);
        startDate = new Date(startDate);
        startDate = startDate.getFullYear() + '-' + (startDate.getMonth()) + '-' + startDate.getDate();
        let endDate = date.setFullYear(date.getFullYear() - Number(end) + Number(start));
        endDate = new Date(endDate);
        endDate = endDate.getFullYear() + '-' + (endDate.getMonth()) + '-' + endDate.getDate();

        const query = "SELECT * from user where birthday BETWEEN '" + endDate + "' AND '" + startDate + "'";
        console.log(query);
        return (new Promise((resolve => {
                db.query(query, null, (users, err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        resolve(users)
                    }
                })
            })
        ))
    }

    static where(key, value) {
        const query = "SELECT * FROM user where " + key + ' = ' + value;
        console.log('aaa', "SELECT * FROM user where " + key + ' = ' + value);
        return (new Promise((resolve => {
                db.query(query, null, (users, err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        resolve(users)
                    }
                })
            })
        ))
    }

    static pushNotification(id, type, text ) {
        const query = 'SELECT push_token, likes_push, message_push, common_likes_pushes from user WHERE id = ' + id;
        db.query(query, null, (user, err) => {
            if (err) {
                console.log(err)
            } else {
                if((type === 'message' && !user[0].message_push) ||
                    (type === 'like' && !user[0].likes_push) ||
                    (type === 'common_like' && !user[0].common_likes_pushes)
                ) {
                    return;
                }
                console.log(user[0].push_token);
                let expo = new Expo();
                if (!Expo.isExpoPushToken(user[0].push_token)) {
                    console.error(`Push token ${user[0].push_token} is not a valid Expo push token`);
                    return;
                }
                let message = [{
                    to: user[0].push_token,
                    // title: 'JS sa',
                    sound: 'default',
                    body: text,
                    data: { withSome: 'data' },
                }];
                let chunks = expo.chunkPushNotifications(message);
                (async () => {
                    for (let chunk of chunks) {
                        try {
                            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                            console.log(ticketChunk);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                })();
            }
        })
    }

    static search(params) {
        // console.log(params);
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
