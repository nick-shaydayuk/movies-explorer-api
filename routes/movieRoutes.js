const movieRouter = require('express').Router();

const { validationCreateMovie, validationDeleteMovie } = require('../middlewares/validation');
const { createMovie, deleteMovieById, getAllMovies } = require('../controllers/movies');

movieRouter.get('/', getAllMovies);
movieRouter.post('/', validationCreateMovie, createMovie);
movieRouter.delete('/:movieId', validationDeleteMovie, deleteMovieById);

module.exports = movieRouter;
