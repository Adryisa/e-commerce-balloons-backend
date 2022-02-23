const express = require('express');
const { json, urlencoded } = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnection = require('./config/dbConnection');
const balloonsRouter = require('./routes/balloons.routes');
const cartRouter = require('./routes/cart.routes');
const usersRouter = require('./routes/user.routes');
const logRoute = require('./routes/login.routes');

dotenv.config();

// create express server
const app = express();
dbConnection();

// config middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// config routes

app.use('/api/balloons', balloonsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', logRoute);

app.use('/**', (req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

// error handler
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// server listening
const port = process.env.PORT;

const appServer = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});

module.exports = { app, appServer };
