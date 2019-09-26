var db = require('../pool');
var User = require('./user');

class Photos {
    static find(id) {
        const query = 'SELECT path, id from photos where user_id=?';
        return (new Promise(resolve => {
                    db.query(query, id, (photos, err) => {
                        console.log(err, photos);
                        if (err) {
                            console.log(err)
                        } else {
                            resolve(photos)
                        }
                    });

                }
            )
        )
    }

    static add(params) {
        const query = 'INSERT INTO photos set ?';
        return (new Promise(resolve => {
                    db.query(query, params, (photos, err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            resolve(photos)
                        }
                    });

                }
            )
        )
    }

    static delete(id) {
        const query = 'DELETE FROM photos where id=' + id;
        return (new Promise(resolve => {
                    db.query(query, null, (photos, err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            resolve()
                        }
                    });

                }
            )
        )
    }

    static makeMain(params) {
        const query2 = "UPDATE user SET photoPath = '" + params.path + "' where id = " + params.user_id;
        return (new Promise(resolve => {
                this.add({user_id: params.user_id, path: params.mainPath})
                    .then(() => {
                        db.query(query2, null, (photos, err) => {
                            if (err) {
                                console.log(err)
                            }
                        })
                    })
                    .then(() => {
                        this.delete(params.id);
                        resolve();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        ))
    }

    static deleteMain(id) {
        return (new Promise(resolve => {
                Photos.find(id)
                    .then((photos) => {
                        User.update(id, {photoPath: photos[0].path});
                        this.delete(photos[0].id)
                    })
                    .then(() => {
                        resolve();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
        )
    }
}

module.exports = Photos;

