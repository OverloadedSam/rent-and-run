const config = require('config');

const validateOrigin = (req, res, next) => {
  const requestOrigin = req.get('origin');
  const ORIGIN_1 = config.get('ORIGIN_1');
  const ORIGIN_2 = config.get('ORIGIN_2');

  if (ORIGIN_1 === requestOrigin || ORIGIN_2 === requestOrigin) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  }
};

module.exports = validateOrigin;
