const db = require('../db/db')

module.exports = {
    getPlace: db.select().from("place"),
    delPlace: db('place').del()
}