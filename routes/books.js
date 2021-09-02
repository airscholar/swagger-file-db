const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

/**
 * @swagger
 * components:
 *  schemas:
 *      Book:
 *          type: object
 *          required:
 *              - title
 *              - author
 *          properties:
 *              id:
 *                type: string
 *                description: The auto generated id of the book
 *              title:
 *                type: string
 *                description: The book title
 *              author:
 *                type: string
 *                description: The book author
 *          example:
 *              id: dEfz1_af3
 *              title: The beautiful turing
 *              description: Alexander Dewing
 */

const idLength = 8;
/**
 * @swagger
 * tags:
 *      name: Books
 *      description: The books managing API
 */

/**
 * @swagger
 * /books:
 *      get:
 *          tags: [Books]
 *          summary: Returns the list of books in the database
 *          responses:
 *              200:
 *                  description: The list of the books
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Book'
 */

router.get("/", (req, res) => {
  const books = req.app.db.get("books");
  res.send(books);
});

/**
 * @swagger
 * /books/{id}:
 *  get:
 *      tags: [Books]
 *      summary: Gets a specific book by its id
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The specific id of the book
 *            schema:
 *                type: string
 *            required: true
 *      responses:
 *          200:
 *              description: The book by its object id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Book'
 *          404:
 *              description: Book not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 */
router.get("/:id", (req, res) => {
  const book = req.app.db.get("books").find({ id: req.params.id });
  console.log(book.id);
  if (book.id === undefined) {
    return res.status(404).json({ message: `Book with id ${req.params.id} not found` });
  }

  res.send(book);
});

/**
 * @swagger
 * /books:
 *      post:
 *          summary: This route is used to create a new book
 *          tags: [Books]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Book'
 *          responses:
 *              201:
 *                  description: The book was created successfully!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Book'
 *              500:
 *                  description: Server error occurred.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 */

router.post("/", (req, res) => {
  try {
    const book = {
      id: nanoid(idLength),
      ...req.body,
    };
    req.app.db.get("books").push(book).write();
    res.status(201).json({ message: "Book added successfully", result: req.app.db.get("books").find({ id: book.id }) });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /books/{id}:
 *  put:
 *      tags: [Books]
 *      description: Route to update a book information in the database
 *      parameters:
 *          -   in: path
 *              name: id
 *              description: The ID of the specific book to be updated
 *              schema:
 *                  type: string
 *              required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Book'
 *      responses:
 *          200:
 *              description: The retrieved book by the ID
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Book'
 *          404:
 *              description: The specific book is not found
 *              content:
 *                  application/json:
 *                      
 *          500:
 *              description: Server error occurred
 */
router.put("/:id", (req, res) => {
  try {
    req.app.db.get("books").find({ id: req.params.id }).assign(req.body).write();

    res.send(req.app.db.get("books").find({ id: req.params.id }));
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.delete("/:id", (req, res) => {
  req.app.db.get("books").remove({ id: req.params.id }).write();
  res.status(200);
});
router.post;
module.exports = router;
