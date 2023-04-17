const allowedCors = 'http://localhost:3000'//1'https://getaway.nomoredomains.work';

const corsOptions = {
  credentials: true,
  origin: allowedCors,
};

module.exports = corsOptions;
