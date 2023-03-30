const URL_REGEX =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/i;

const SCHEMA_VALIDATION_REQUIRED = 'Поле {PATH} обязательно.';
const SCHEMA_VALIDATION_URL = 'Формат ссылки не верен.';
const SCHEMA_VALIDATION_EMAIL = 'Формат почты не верен.';
const UNAUTHORIZED_ERROR_MESSAGE = 'Неправельные почта или пароль.';
const NOT_FOUND_PAGE = 'Страница не найдена.';
const NOT_FOUND_USER = 'Пользователь с таким ID не найден.';
const NOT_FOUND_MOVIE = 'Фильм с таким ID не найден.';
const EMAIL_REGISTERED = 'Пользователь с таким Email уже зарегистрирован.';
const SUCCESSFUL_AUTHORIZACION = 'Вы успешно авторизировались.';
const NON_CORRECT_ID = 'Не корректный ID.';
const SIGN_OUT = 'Вы вышли из аккаунта.';
const SERVER_ERROR = 'На сервере произошла ошибка.';
const FORBIDDEN_ERROR_MOVIE = 'Вы можете удалять только свои фильмы.';
const RATE_LIMIT = 'Превышен лимит подключений с данного IP-адреса';

module.exports = {
  URL_REGEX,
  SCHEMA_VALIDATION_REQUIRED,
  SCHEMA_VALIDATION_URL,
  SCHEMA_VALIDATION_EMAIL,
  UNAUTHORIZED_ERROR_MESSAGE,
  NOT_FOUND_PAGE,
  EMAIL_REGISTERED,
  SUCCESSFUL_AUTHORIZACION,
  NOT_FOUND_USER,
  NON_CORRECT_ID,
  SIGN_OUT,
  SERVER_ERROR,
  NOT_FOUND_MOVIE,
  FORBIDDEN_ERROR_MOVIE,
  RATE_LIMIT,
};
