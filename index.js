const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");

const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

const PORT = process.env.PORT || 4000;

db.defaults({ books: [] }).write();

const app = express();

app.db = db;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
