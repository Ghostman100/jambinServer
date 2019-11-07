var db = require('../pool');
const boards = {latitude: 0.0012, longitude: 0.0021};

class Places {
    static all() {
        return new Promise(resolve => {
            const query = 'select p.*, count(u.place_id) size from places p left join user u on p.id = u.place_id where p.removed is false group by p.id;';
            db.query(query, null, (places, err) => {
                if (err) {
                    console.log(err)
                } else {
                    resolve(places)
                }
            })
        })
    }

    static findByPlace(place) {
        return new Promise(resolve => {
            const query = 'SELECT p.* from places p left join user u on p.id = u.place_id where (removed is FALSE) and (latitude between ' + (place.latitude - boards.latitude) + " AND " + (Number(place.latitude) + boards.latitude) +
                ") AND (" +
                "longitude BETWEEN " + (place.longitude - boards.longitude) + " AND " + (Number(place.longitude) + boards.longitude) + ")" +
                " group by p.id;";
            db.query(query, null, (places, err) => {
                if (err) {
                    console.log(err)
                } else {
                    resolve(places)
                }
            })
        })
    }

    static delete(ids) {
        console.log(ids);
        let params = '(';
        ids.forEach((id) => {
            params += id + ','
        });
        params = params.substr(0, params.length - 1) + ')';
        let query = 'update places set removed = 1 where id IN ' + params;
        return (new Promise(resolve => {
                    db.query(query, null, (place, err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(place);
                            resolve()
                        }
                    });

                }
            )
        )
    }

    static create(params) {
        let query = 'INSERT INTO places (name, address, city, kind, latitude, longitude) VALUES ';
        params.forEach((place) => {
            query += `("${place.name}", "${place.address}", "${place.city}", "${place.kind}", ${place.latitude}, ${place.longitude}),`
        });
        query = query.slice(0, -1);
        return (new Promise(resolve => {
                    db.query(query, null, (place, err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            resolve(place)
                        }
                    });

                }
            )
        )
    }
}

module.exports = Places;
