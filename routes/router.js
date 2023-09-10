const express = require("express");
const route = express.Router();
const control = require("../controllers/controller");
const db = require("../db/db");

// VIEW
route.get("/", control.indexPage);
route.get("/get", control.getPage);
route.get("/post", control.postPage);
route.get("/patch", control.patchPage);
route.get("/delete", control.deletePage);
route.get("/put", control.putPage);
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
