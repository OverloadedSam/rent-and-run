import React, { useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  vehicleActions,
  cartActions,
  rentalActions as action,
} from '../redux/actions';
import {
  Container,
  StepCounter,
  Loader,
  Error,
  Grid,
  Table,
  Alert,
  Button,
} from '../common';
import { SummaryCard } from '../components';
import { dateTime } from '../utils';

const PlaceRental = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    success,
    data: vehicle,
  } = useSelector((store) => store.vehicleDetails);
  const {
    error: rentalError,
    success: isRentalPlaced,
    data: rentalDetails,
  } = useSelector((store) => store.createRental);

  const { state } = location;
  if (!state) return <Navigate to='/' />;

  const { rentalIndex, coupon, drop_address, payment_method, discount_amount } =
    state;
  const rental = JSON.parse(localStorage.getItem('cartItems'))[rentalIndex];
  const { id, vehicleName, bookingDate, returningDate } = rental;

  const activeStepNumber = 3;
  const numberOfDays = dateTime.calculateNumberOfDays(
    bookingDate,
    returningDate
  );

  const columns = [
    {
      path: 'key',
      key: '1',
    },
    {
      path: 'value',
      key: '2',
    },
  ];

  const paymentCodes = {
    1: 'PayPal',
    2: 'RazorPay',
  };

  const data = [
    {
      id: '1',
      key: 'Vehicle ID',
      value: id,
    },
    {
      id: '2',
      key: 'Vehicle',
      value: vehicle ? `${vehicle.brand} ${vehicle.model_name}` : vehicleName,
    },
    {
      id: '3',
      key: 'Booking Date',
      value: new Date(bookingDate).toString().slice(0, 21),
    },
    {
      id: '4',
      key: 'Returning Date',
      value: new Date(returningDate).toString().slice(0, 21),
    },
    {
      id: '5',
      key: 'Days',
      value: numberOfDays,
    },
    {
      id: '6',
      key: 'Coupon',
      value: coupon.trim().toUpperCase() || 'N/A',
    },
    {
      id: '7',
      key: 'Drop Location',
      value: drop_address.trim() || 'N/A',
    },
  ];

  useEffect(() => {
    dispatch(action.resetCreateRental());
    dispatch(vehicleActions.getVehicleDetails(`vehicle/${id}`));
  }, []);

  useEffect(() => {
    if (isRentalPlaced) {
      toast('Rental placed!');
      navigate(`/rental/${rentalDetails.id}`, { replace: true });
      dispatch(action.resetCreateRental());
      dispatch(cartActions.deleteItemFromCart({ id }));
    }

    if (rentalError) {
      toast.error(rentalError.errorMessage);
      dispatch(action.resetCreateRental());
    }
  }, [rentalError, isRentalPlaced]);

  const handlePlaceRental = () => {
    dispatch(
      action.createRental({
        vehicle: id,
        coupon: coupon.trim(),
        drop_address,
        payment_method,
        booking_date: bookingDate,
        returning_date: returningDate,
      })
    );
  };

  return (
    <Container className='block block-checkout block-rental-details'>
      <StepCounter totalSteps={3} activeStepNumber={activeStepNumber} />
      <header className='block__header'>
        <h2 className='block__heading'>Review and Place Rental</h2>
      </header>

      {loading ? (
        <Loader />
      ) : error ? (
        <Error {...error} />
      ) : success ? (
        <Grid layout='grid--1x2'>
          <div>
            <h3>Rental Details</h3>
            <Table
              className='rental-details-table'
              omitHeader
              columns={columns}
              data={data}
            />
            <h3>Payment Status</h3>
            <Table
              className='payment-method-table'
              columns={[
                { label: 'Payment Method' },
                { label: paymentCodes[payment_method] },
              ]}
              data={[]}
            />
            <Alert type='danger'>
              {rentalError ? rentalError.errorMessage : 'Place rental to pay.'}
            </Alert>
          </div>

          <SummaryCard
            dailyRentalRate={vehicle.daily_rental_rate}
            daysOfRental={numberOfDays}
            securityDeposit={vehicle.security_amount}
            couponDiscountAmount={discount_amount}
            renderButton={() => (
              <Button variant='secondary' block onClick={handlePlaceRental}>
                Place Rental
              </Button>
            )}
          />
        </Grid>
      ) : null}
    </Container>
  );
};

export default PlaceRental;
