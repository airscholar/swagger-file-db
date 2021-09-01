const express = require("express");
const router = express.Router();
const nanoid = require("nanoid");

const idLength = 8;

router.get("/", (req, res) => {
  const books = req.app.db.get("books");
  res.send(books);
});

router.get("/:id", (req, res) => {
  const book = req.app.db.get("books").find({ id: req.params.id });

  res.send(book);
});

router.post
module.exports = router;
