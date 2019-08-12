var db = require('../pool');

class Places {
    static all(){
        return new Promise(resolve => {
            const query = 'select * from places';
            db.query(query, null, (places, err) => {
                if (err) {
                    console.log(err)
                } else {
                    resolve(places)
                }
            } )
        })
    }
}

module.exports = Places;
