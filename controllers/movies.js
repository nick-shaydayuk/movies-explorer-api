const Movie = require('../models/movie');

const BadRequestError = require('../errors/badRequest');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');

const ok = 200;

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError(`Фильм с id: ${movieId} не найдена`);
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(movieId)
          .then(() => res.send(movie))
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new BadRequestError('Миша, фильм не очень, переделывай'));
            } else {
              next(err);
            }
          });
      } else {
        throw new ForbiddenError('Нельзя удалять чужие фильмы');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError(
            `Передан некорректны id: ${movieId} в методы удаления фильма`
          )
        );
      } else {
        next(err);
      }
    });
};

module.exports.likeMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('фильм потеряли'));
      } else {
        res.status(ok).send({ data: movie });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Миша, фильмы не очень, переделывай'));
      } else {
        next(err);
      }
    });
};

module.exports.unlikeMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('фильм потеряли'));
      } else {
        res.status(ok).send({ data: movie });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Миша, фильмы не очень, переделывай'));
      } else {
        next(err);
      }
    });
};
