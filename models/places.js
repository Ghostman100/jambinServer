var db = require('../pool');

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
