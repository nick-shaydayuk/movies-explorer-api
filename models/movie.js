const mongoose = require('mongoose');

const { URL_REGEX } = require('../utils/constants');

const userMovie = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    match: [URL_REGEX, 'Некорректный формат ссылки'],
  },
  trailerLink: {
    type: String,
    required: true,
    match: [URL_REGEX, 'Некорректный формат ссылки'],
  },
  thumbnail: {
    type: String,
    required: true,
    match: [URL_REGEX, 'Некорректный формат ссылки'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('card', userMovie);
