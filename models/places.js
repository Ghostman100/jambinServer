var db = require('../pool');
const boards = {latitude: 0.0012, longitude: 0.0021};

class Places {
    static all() {
        return new Promise(resolve => {
            const query = 'select * from places';
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
            const query = 'SELECT * from places where (latitude between ' + (place.latitude - boards.latitude) + " AND " + (Number(place.latitude) + boards.latitude) +
                ") AND (" +
                "longitude BETWEEN " + (place.longitude - boards.longitude) + " AND " + (Number(place.longitude) + boards.longitude) + ")";
            db.query(query, null, (places, err) => {
                if (err) {
                    console.log(err)
                } else {
                    resolve(places)
                }
            })
        })
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
