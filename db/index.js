const { MongoClient } = require("mongodb");

let myDb

module.exports = {
    connectDb: (cb) => {
        MongoClient.connect('mongodb://localhost:27017/users')
            .then(client => {
                myDb = client.db()
                return cb()
            })
            .catch(err => cb(err))
    },

    getDb: () => myDb
}

