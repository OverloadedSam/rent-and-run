const Razorpay = require('razorpay');
const config = require('config');
const { nanoid } = require('nanoid');
const { asyncHandler } = require('../middlewares');
const { Rental, Vehicle, Payment } = require('../models');
const { ErrorResponse, DateTime } = require('../utils');

// @route   POST /api/v1/createRazorpayOrder/:rental_id
// @access  PROTECTED
// @desc    Create order of razorpay to pay the rental.
const createOrder = asyncHandler(async (req, res, next) => {
  const rentalId = req.params.rental_id;

  const [[rentalData]] = await Rental.getRentalById(rentalId);
  if (rentalData.length === 0) {
    const message = `Rental not found for the id ${rentalId}`;
    return next(new ErrorResponse(404, message));
  }
  const {
    vehicle_id,
    vehicle_brand,
    vehicle_model_name,
    booking_date,
    returning_date,
    rent_amount,
    vehicle_security_amount,
    discount_amount,
    payment_method,
  } = rentalData[0];

  if (!/Razorpay/gi.test(payment_method)) {
    return next(new ErrorResponse(400, 'Invalid payment method!'));
  }

  if (DateTime.validateDateRange(booking_date, returning_date)) {
    return next(new ErrorResponse(422, 'Booking/Returning date is invalid!'));
  }

  // Check for vehicle availability at the time of creating order.
  const [[{ available_count }]] = await Vehicle.getAvailableVehicleCountOnDate(
    vehicle_id,
    booking_date,
    returning_date
  );
  if (available_count <= 0) {
    const message = 'Vehicle is not available on given date!';
    return next(new ErrorResponse(400, message));
  }

  const key_id = config.get('RAZORPAY_KEY_ID');
  const key_secret = config.get('RAZORPAY_KEY_SECRET');
  const razorpay = new Razorpay({ key_id, key_secret });

  const totalPayableAmount = Number(rent_amount) - Number(discount_amount);
  const InrSubunit = 100;

  const options = {
    amount: totalPayableAmount * InrSubunit,
    currency: 'INR',
    receipt: nanoid(),
    notes: {
      User: req.user.id,
      'Vehicle ID': vehicle_id,
      'Vehicle Name': `${vehicle_brand} ${vehicle_model_name}`,
      'Vehicle Security Deposit': vehicle_security_amount,
      'Discount Amount': discount_amount,
      'Booking Date': `${new Date(booking_date)}`,
      'Returning Date': `${new Date(returning_date)}`,
    },
  };

  const data = await razorpay.orders.create(options);
  data.key = key_id;

  return res.status(201).json({
    success: true,
    status: 201,
    data,
  });
});

// @route   POST /api/v1/payment/:rental_id
// @access  PROTECTEDs
// @desc    Create payment as successful.
const createPayment = asyncHandler(async (req, res, next) => {
  const { transactionDetails } = { ...req.body };
  const { razorpay_order_id, razorpay_payment_id } = transactionDetails;
  const rentalId = req.params.rental_id;

  const [[rentalData]] = await Rental.getRentalById(rentalId);
  if (rentalData.length === 0) {
    const message = `Rental not found for the id ${rentalId}`;
    return next(new ErrorResponse(404, message));
  }

  const razorpay = new Razorpay({
    key_id: config.get('RAZORPAY_KEY_ID'),
    key_secret: config.get('RAZORPAY_KEY_SECRET'),
  });

  const { order_id, status } = await razorpay.payments.fetch(
    razorpay_payment_id
  );

  if (!(order_id === razorpay_order_id) || status !== 'captured') {
    const message =
      'Order has not been paid yet or the transaction data is invalid!';
    return next(new ErrorResponse(401, message));
  }

  const payment = new Payment();
  transactionDetails.statusCode = 1; // Set payment status as Succeeded.
  await payment.createPayment(rentalData[0], transactionDetails);

  return res.status(201).json({
    success: true,
    status: 201,
    data: { ...payment.payment, transactionDetails },
  });
});

module.exports = { createOrder, createPayment };
