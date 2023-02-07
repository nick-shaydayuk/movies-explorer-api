const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { URL_REGEX } = require('../utils/constants');

const {
  getAllMovies,
  deleteMovieById,
  createMovie,
} = require('../controllers/movies');

router.get('/movies', getAllMovies);
router.delete(
  '/movies/:movieId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      MovieId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteMovieById
);
router.post(
  '/movies',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(URL_REGEX),
      trailer: Joi.string().required().regex(URL_REGEX),
      thumbnail: Joi.string().required().regex(URL_REGEX),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie
);
// router.put(
//   '/:movieId/likes',
//   celebrate({
//     [Segments.PARAMS]: Joi.object().keys({
//       MovieId: Joi.string().length(24).hex().required(),
//     }),
//   }),
//   likeMovie
// );
// router.delete(
//   '/:movieId/likes',
//   celebrate({
//     [Segments.PARAMS]: Joi.object().keys({
//       MovieId: Joi.string().length(24).hex().required(),
//     }),
//   }),
//   unlikeMovie
// );

module.exports = router;
