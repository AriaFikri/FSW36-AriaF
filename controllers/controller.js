const db = require('../db/db')
const model = require('../models/model')

module.exports = {
    getAll: async (req, res) => {
        try {
        const data = await model.getPlace

        res.json({
          data
        })

        } catch (error) {
            res.json({
                error: error.message
            })
        }
    },

    getSearch: async (req, res) => {
        const { city } = req.query;
        try {
            const data = await db("place").where({city}).select('*');

            res.json({
              data
            })
        } catch (error) {
            res.json({
                error: error.message
            })
        }
    },

  postData: async (req, res) => {
        const { name, city, address } = req.body;

        try {

        await model.postPlace(name, city, address); 
        const data = await model.getPlace

        res.json({
        message: "Post processed",
        data
        })

        } catch (error) {
            res.json ({
                error: error.message
            })
        }
    },

  deleteAll: async (req, res) => {
        try {

        await model.delPlace;
        const data = await model.getPlace;

        res.json({
        data
        })

        } catch (error) {
            res.json({
                error: error.message
            })
        }
    },

  deleteSearch: async (req, res) => {
        const { name, city } = req.body;

        await model.deleteSearch(name, city)

        const data = await model.getPlace;

        res.json({
        data
        });
    },

  updatePut: async (req, res) => {
        const passedCity = req.params.city;
        const passedName = req.params.name;
        const { name, city, address } = req.body;

        try {
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

            res.json({
                message: "data updated",
                data
            })

        } catch (error) {
            res.json({
                error: error.message
            })
        }
    },

  updatePatch:  async (req, res) => {
        const passedName = req.params.name;
        const passedCity = req.params.city;
        const { name, city, address } = req.body;
        let namePointer = passedName;
        let cityPointer = passedCity;

        try {
        if (city) {
            await db("place")
            .where({ name: namePointer, city: cityPointer })
            .update({ city });
            cityPointer = city;
        }
        if (name) {
            await db("place")
            .where({ name: namePointer, city: cityPointer })
            .update({ name });
            namePointer = name;
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
        } catch (error) {
            res.json({
                error: error.message
            })
        }
    }
};