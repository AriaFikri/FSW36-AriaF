const db = require('../db/db')
const model = require('../models/model')
const express = require('express')
const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

module.exports = {
    getAll: async (req, res) => {
        const data = await model.getPlace

        res.json({
        data,
        });
    },

    getSearch: async (req, res) => {
        const { city } = req.query;

        const data = await db("place")
          .where({
            city,
          })
          .select()
          .catch((error) => {
            console.error(error)
          });

        res.json({
        data
        });
    },

  postData: async (req, res) => {
        const { name, address, city } = req.body;

        await db("place")
        .insert({
            name,
            city,
            address,
        })
        .catch((error) => {
            console.error(`${error}`);
        });

        res.json({
        message: "Post processed",
        });
    },

  deleteAll: async (req, res) => {
        await model.delPlace;

        const data = await model.getPlace;

        res.json({
        data
        });
    },

  deleteSearch: async (req, res) => {
        const { name, city } = req.body;

        await db("place")
        .where({
            name,
            city,
        })
        .del()
        .catch((error) => {
            console.error(error)
        });

        const data = await model.getPlace;

        res.json({
        data,
        });
    },

  updatePut: async (req, res) => {
        const passedCity = req.params.city;
        const passedName = req.params.name;
        const { name, city, address } = req.body;

        const data = await db("place")
            .where({
            name: passedName,
            city: passedCity,
            })
            .update(
            {
                name,
                city,
                address,
            },
            ["name", "city", "address"]
            )
            .catch((error) => {
                console.error(error)
            });

            res.json({
                data,
            });
    },

  updatePatch:  async (req, res) => {
        const passedName = req.params.name;
        const passedCity = req.params.city;
        const { name, city, address } = req.body;
        let namePointer = passedName;
        let cityPointer = passedCity;

        if (city) {
            cityPointer = city;
            await db("place")
            .where({ name: namePointer, city: cityPointer })
            .update({ city });
        }
        if (name) {
            namePointer = name;
            await db("place")
            .where({ name: namePointer, city: cityPointer })
            .update({ name });
        }
        if (address) {
            await db("place")
            .where({ name: namePointer, city: cityPointer })
            .update({ address });
        }

        const data = await db("place")
            .where({ name: namePointer, city: cityPointer })
            .select(["name", "city", "address"]);

        res.json({
            data,
        });
    }
};