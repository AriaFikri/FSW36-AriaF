const express = require('express')
const app = express();
const port = 3000;
const db = require('./db/db')

app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.get('/all', async (req, res) => {
    const data = await db.select().from('place');

    res.json({
        data
    })
})

app.get('/search', async (req, res) => {
    const { city } = req.query

    const data = await db('place').where({
        city
    }).select()

    res.json({
        data
    })
})

app.post('/', async (req, res) => {
    const { name, address, city} = req.body

    await db("place")
      .insert({
        name,
        city,
        address
      })
      .catch((error) => {
        console.error(`${error}`);
      });

    let data = await db.select().from("place");
    
    res.json({
        data,
    })
})

app.delete('/', async (req, res) => {
    await db('place').del()

    const data = await db.select().from("place");

    res.json({
        data
    })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})