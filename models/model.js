const db = require('../db/db')

const postPlace = async (name, city, address) => {
    await db("place").insert({
      name,
      city,
      address,
    });
}

const deleteSearch = async (name, city) => {
    await db("place")
      .where({
        name,
        city,
      })
      .del();
}

module.exports = {
    getPlace: db.select().from("place"),
    delPlace: db('place').del(),
    postPlace,
    deleteSearch,
}