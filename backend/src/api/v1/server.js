const express = require('express');
const config = require('config');
const morgan = require('morgan');
const routes = require('./routes');
const { errorHandler } = require('./middlewares');

const server = express();

if (server.get('env') !== 'production') {
  server.use(morgan('tiny'));
}

server.use(express.json({ extended: true }));

const apiUrl = config.get('API_URL');

// Routes
server.use(apiUrl, routes.userRoutes);
server.use(apiUrl, routes.roleRoutes);
server.use(apiUrl, routes.vehicleTypeRoutes);
server.use(apiUrl, routes.fuelTypeRoutes);

// Custom error handler
server.use(errorHandler);

const port = config.get('PORT');
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[PORT:${port}] | The server is up and running...`);
});
