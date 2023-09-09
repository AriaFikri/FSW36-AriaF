const express = require("express");
const route = express.Router();
const control = require('../controllers/controller')
const db = require('../db/db')

// VIEW
route.get('/', (req, res) => {
    res.render('index.ejs')
})
route.get("/get", (req, res) => {
  res.render("get.ejs");
});
route.get("/post", (req, res) => {
  res.render("post.ejs");
});
route.get("/patch", (req, res) => {
  res.render("patch.ejs");
});
route.get("/delete", (req, res) => {
  res.render("delete.ejs");
});
route.get("/put", (req, res) => {
  res.render("put.ejs");
});
// GET (READ)
route.get("/all", control.getAll);
route.get("/search", control.getSearch);

// POST(CREATE)
route.post("/new", control.postData);

// DELETE (DEL)
route.delete("/delete", control.deleteAll);
route.delete("/search", control.deleteSearch);

// PUT DAN PATCH
route.put("/update/:city/:name", control.updatePut);
route.patch("/patch/:city/:name", control.updatePatch);

module.exports = route;
