const express = require("express");
const app = express();
const port = 3000;
const db = require("./db/db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const route = require("./routes/router");
app.use(route);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
