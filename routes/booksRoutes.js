const express = require('express');
const router = express.Router();
const Books = require('../models/books');
const { ObjectId } = require('mongodb');

// Rota para obter todos os livros
router.get('/', async (req, res) => {
  try {
    const books = await Books.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um livro por ID
router.get('/:id', getBooks, (req, res) => {
  res.json(res.Books);
});

// Rota para criar um livro contato
router.post('/', async (req, res) => {
  const books = new Books({
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    description: req.body.description,
    dateOfPublishment: req.body.dateOfPublishment,
    editor: req.body.editor,
    rating: req.body.rating,
    cover: req.body.cover,
  });

  try {
    const newBooks = await books.save();
    res.status(201).json(newBooks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um livro por ID
router.put('/:id', getBooks, async (req, res) => {
  if (req.body.title != null) {
    res.Books.title = req.body.title;
  }
  if (req.body.author != null) {
    res.Books.author = req.body.author;
  }
  if (req.body.pages != null) {
    res.Books.pages = req.body.pages;
  }
  if (req.body.description != null) {
    res.Books.description = req.body.description;
  }
  if (req.body.dateOfPublishment != null) {
    res.Books.dateOfPublishment = req.body.dateOfPublishment;
  }
  if (req.body.editor != null) {
    res.Books.editor = req.body.editor;
  }
  if (req.body.rating != null) {
    res.Books.rating = req.body.rating;
  }
  if (req.body.rating != null) {
    res.Books.cover = req.body.cover;
  }

  try {
    const updatedBooks = await res.Books.save();
    res.json(updatedBooks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para excluir um livro por ID
router.delete('/:id', getBooks, async (req, res) => {
  try {
    await res.Books.deleteOne();
    res.json({ message: 'Book deleted sucessfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getBooks(req, res, next) {
  try {
    const books = await Books.findById(ObjectId.createFromHexString(req.params.id));
    if (books == null) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.Books = books;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;