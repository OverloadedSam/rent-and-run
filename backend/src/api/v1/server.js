const express = require('express');
const config = require('config');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares');

const server = express();

if (server.get('env') !== 'production') {
  server.use(morgan('tiny'));
}

// Custom error handler
server.use(errorHandler);

const port = config.get('PORT');
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[PORT:${port}] | The server is up and running...`);
});
