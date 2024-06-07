const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateOfPublishment: {
    type: Date,
    required: true,
  },
  editor:{
    type: String,
    required: true,
  },
  rating:{
    type: Number,
    required: true,
  },
});

const Books = mongoose.model('Books', bookSchema);

module.exports = Books;
