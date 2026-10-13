// Lab 07 — Assignment: Book Management REST API (Node.js + Express)
// Runs on port 3001 so it can run alongside server.js (port 3000).
// Endpoints:
//   GET    /books        -> all books
//   GET    /books/:id    -> one book (404 if missing)
//   POST   /books        -> create (201, 400 on bad input)
//   PUT    /books/:id    -> update (404 if missing, 400 on bad input)
//   DELETE /books/:id    -> delete (404 if missing)
// Changes are persisted back to books.json after every write.
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3001;
const DATA_FILE = "books.json";

app.use(express.json());

let books = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

// Persist the in-memory array back to the JSON file.
function saveBooks() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2), "utf8");
}

function validBookInput(body) {
  return (
    body &&
    typeof body.title === "string" &&
    body.title.trim() &&
    typeof body.author === "string" &&
    body.author.trim() &&
    typeof body.price === "number" &&
    body.price > 0
  );
}

// GET: retrieve all books
app.get("/books", (req, res) => {
  res.status(200).json(books);
});

// GET: retrieve one book by ID
app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((item) => item.id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  return res.status(200).json(book);
});

// POST: create a book
app.post("/books", (req, res) => {
  if (!validBookInput(req.body)) {
    return res.status(400).json({
      message: "title, author (non-empty strings) and price (positive number) are required",
    });
  }
  const newId = books.length
    ? Math.max(...books.map((item) => item.id)) + 1
    : 1;
  const newBook = {
    id: newId,
    title: req.body.title.trim(),
    author: req.body.author.trim(),
    price: req.body.price,
  };
  books.push(newBook);
  saveBooks();
  return res.status(201).json(newBook);
});

// PUT: update a book
app.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((item) => item.id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  if (!validBookInput(req.body)) {
    return res.status(400).json({
      message: "title, author (non-empty strings) and price (positive number) are required",
    });
  }
  book.title = req.body.title.trim();
  book.author = req.body.author.trim();
  book.price = req.body.price;
  saveBooks();
  return res.status(200).json(book);
});

// DELETE: remove a book
app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }
  const [deletedBook] = books.splice(index, 1);
  saveBooks();
  return res.status(200).json({
    message: "Book deleted successfully",
    book: deletedBook,
  });
});

app.listen(PORT, () => {
  console.log(`Book API running at http://localhost:${PORT}`);
});
