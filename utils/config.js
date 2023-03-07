require('dotenv').config();

const {
  NODE_ENV,
  PORT = 3001,
  MONGO_PORT = 'mongodb://localhost:27017/movies',
  JWT_SECRET = 'dev-secret',
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  MONGO_PORT,
  JWT_SECRET,
};