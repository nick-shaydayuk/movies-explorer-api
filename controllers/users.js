const bcrypt = require('bcryptjs');
const User = require('../models/user');

const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequest');
const ExistError = require('../errors/existError');

const created = 201;

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Такого пользователя нет');
      } else {
        res.send(users);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Ошибка в запросе'));
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(() => {
      throw new NotFoundError(`Пользователь c id: ${_id} не найден`);
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        email,
        password: hash,
        name,
      })
    )
    .then((data) => {
      res.status(created).send({
        _id: data._id,
        email: data.email,
        name: data.name,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ExistError('existing'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(' ')}`
          )
        );
        return;
      }
      next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь с id: ${req.user._id} не найден`);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(NON_CORRECT_ID));
        return;
      }
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные в методы обновления профиля'
          )
        );
        return;
      }

      if (err.code === 11000) {
        next(new ExistError('Этот юзер уже часть базы'));
        return;
      }
      next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь с id: ${req.user._id} не найден`);
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные в методы обновления аватара пользователя'
          )
        );
      } else {
        next(err);
      }
    });
};

module.exports.signOut = (req, res) => {
  res.clearCookie('token').send({ message: 'маты - бан' });
};
