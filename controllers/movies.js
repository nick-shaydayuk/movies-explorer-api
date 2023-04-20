const Movie = require('../models/movie');

const BadRequestError = require('../errors/badRequest');
const NotFoundError = require('../errors/notFoundError');
const NOT_FOUND_MOVIE = require('../utils/constants');

module.exports.getAllMovies = (req, res, next) => {
  console.log(req.user._id);
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      console.log(movies);
      res.send(movies);
    })
    .catch(next);
};
//{owner: req.user._id}
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  console.log(req.user._id);

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    owner: req.user._id,
    movieId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(NOT_FOUND_MOVIE));
        return;
      }
      movie
        .remove()
        .then(() => res.send({ message: movie }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(NON_CORRECT_ID));
        return;
      }
      next(err);
    });
};
