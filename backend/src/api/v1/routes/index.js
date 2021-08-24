const userRoutes = require('./users');
const vehicleRoutes = require('./vehicles');
const roleRoutes = require('./roles');
const vehicleTypeRoutes = require('./vehicleTypes');
const fuelTypeRoutes = require('./fuelTypes');
const paymentMethodRoutes = require('./paymentMethods');
const paymentStatusRoutes = require('./paymentStatuses');
const couponRoutes = require('./coupons');

module.exports = {
  userRoutes,
  vehicleRoutes,
  roleRoutes,
  vehicleTypeRoutes,
  fuelTypeRoutes,
  paymentMethodRoutes,
  paymentStatusRoutes,
  couponRoutes,
};
