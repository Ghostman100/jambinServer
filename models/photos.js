var db = require('../pool');

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
}

module.exports = Photos;

