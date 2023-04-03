const allowedCors = 'https://getaway.nomoredomains.work' //'http://localhost:3000'//1;

const corsOptions = {
  credentials: true,
  origin: allowedCors,
};

module.exports = corsOptions;
