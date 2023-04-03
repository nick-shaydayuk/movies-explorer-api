const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/loginRoutes');
const corsOptions = require('./middlewares/cors');
const { PORT, MONGO_PORT } = require('./utils/config');

const app = express();

mongoose.connect(MONGO_PORT);

app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);
app.use(errorLogger);
app.use(errors());

app.listen(PORT, () => {
  console.log(`Приложение работает. Порт: ${PORT}`);
});
