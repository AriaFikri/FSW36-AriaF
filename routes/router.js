const express = require('express')
const app = express()
const route = express.Router()
const db = require('../db/db')

// app.use(express.json())
// app.use(express.urlencoded({ extended:false} ))

// GET (READ)
route.get("/all", async (req, res) => {
  const data = await db.select().from("place");

  res.json({
    data,
  });

});

route.get("/search", async (req, res) => {
  const { city } = req.query;

  const data = await db("place")
    .where({
      city,
    })
    .select();

  res.json({
    data,
  });

});

// POST(CREATE)
route.post("/new", async (req, res) => {
  const { name, address, city } = req.body;

  await db("place")
    .insert({
      name,
      city,
      address
    })
    .catch((error) => {
      console.error(`${error}`);
    });

  res.json({
    message: "Post processed"
  });

});

// DELETE (DEL)
route.delete("/delete", async (req, res) => {
  await db("place").del();

  const data = await db.select().from("place");

  res.json({
    data
  });

});

route.delete("/search", async (req, res) => {
    const { name, city } = req.body 

    await db('place').where({
        name,
        city
    }).del()

    const data = await db.select().from('place');

    res.json({
        data
    });

});

// PUT DAN PATCH

route.put("/update/:city/:name", async (req, res) => {
    const passedCity = req.params.city
    const passedName = req.params.name
    const { name, city, address } = req.body

    const data = await db('place').where({
        name: passedName,
        city: passedCity
    }).update({
        name,
        city,
        address
    },['name', 'city', 'address'])

    res.json({
        data
    })
})

route.patch("/patch/:name", async (req, res) => {
    const passedName = req.params.name
    const { name, city, address } = req.body
    
    if (city) await db("place").where({ name: passedName }).update({ city });
    if (name) await db('place').where({name:passedName}).update({ name })
    if (address) await db("place").where({ name: passedName }).update({ address })

    const data = await db('place').where({name}).select(['name','city','address'])

    res.json({
        data
    })
})

module.exports = route