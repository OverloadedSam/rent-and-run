import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { rentalActions as action } from '../redux/actions';
import {
  Container,
  Loader,
  Error,
  Grid,
  Table,
  Alert,
  Button,
} from '../common';
import { RazorpayButton, SummaryCard } from '../components';
import { dateTime } from '../utils';

const RentalDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    success,
    data: rental,
  } = useSelector((state) => state.rentalDetails);
  const {
    loading: completeRentalLoading,
    error: completeRentalFailed,
    success: completeRentalSuccess,
  } = useSelector((state) => state.completeRental);

  const {
    id,
    vehicle_brand,
    vehicle_model_name,
    vehicle_daily_rental_rate,
    vehicle_security_amount,
    booking_date,
    returning_date,
    rental_completion_date,
    coupon_code,
    discount_amount,
    drop_address,
    payment_method,
    payment_status,
    payment_id,
    transaction_update_time,
  } = rental || {};

  const numberOfDays = dateTime.calculateNumberOfDays(
    booking_date,
    returning_date
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

  const rentalTableData = useMemo(
    () => [
      {
        id: '1',
        key: 'Rental ID',
        value: id,
      },
      {
        id: '2',
        key: 'Vehicle',
        value: `${vehicle_brand} ${vehicle_model_name}`,
      },
      {
        id: '3',
        key: 'Booking Date',
        value: new Date(booking_date).toString().slice(0, 21),
      },
      {
        id: '4',
        key: 'Returning Date',
        value: new Date(returning_date).toString().slice(0, 21),
      },
      {
        id: '5',
        key: 'Days',
        value: numberOfDays,
      },
      {
        id: '6',
        key: 'Coupon',
        value: coupon_code || 'N/A',
      },
      {
        id: '7',
        key: 'Drop Location',
        value: drop_address || 'N/A',
      },
      {
        id: '8',
        key: 'Completion Status',
        value: rental_completion_date ? (
          <span title='Rental is completed'>
            <svg className='icon icon--small icon--success'>
              <use href='/assets/icons/sprite.svg#check' />
            </svg>
          </span>
        ) : (
          <span title='Rental is not completed'>
            <svg className='icon icon--small icon--accent'>
              <use href='/assets/icons/sprite.svg#cross' />
            </svg>
          </span>
        ),
      },
    ],
    [rental]
  );

  let paymentTableData = [
    {
      id: payment_method,
      key: 'Payment Method',
      value: payment_method,
    },
    {
      id: payment_status,
      key: 'Status',
      value: payment_status,
    },
    {
      id: payment_id,
      key: 'Payment ID',
      value: payment_id,
    },
    {
      id: transaction_update_time,
      key: 'Last Updated',
      value: transaction_update_time
        ? new Date(transaction_update_time).toString().slice(0, 21)
        : null,
    },
  ];

  paymentTableData = useMemo(
    () => paymentTableData.filter((item) => item.value),
    [payment_method, payment_status, payment_id, transaction_update_time]
  );

  useEffect(() => {
    dispatch(action.getRentalDetails({ id: params.id }));
  }, []);

  useEffect(() => {
    if (completeRentalSuccess) {
      toast.success('This rental is now completed!');
      dispatch(action.getRentalDetails({ id }));
      dispatch(action.resetCompleteRental());
    }

    if (completeRentalFailed) {
      toast.error(completeRentalFailed.errorMessage);
    }
  }, [completeRentalSuccess, completeRentalFailed]);

  return (
    <Container className='block block-rental-details'>
      <header className='block__header'>
        <h2 className='block__heading'>Rental Details</h2>
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
              data={rentalTableData}
            />
            <h3>Payment Status</h3>
            <Table
              className='payment-method-table'
              omitHeader
              columns={columns}
              data={paymentTableData}
            />

            {error ? (
              <Alert type='danger'> error.errorMessage </Alert>
            ) : !/succeeded/gi.test(payment_status) ? (
              <Alert type='danger'>Pay here for your rental.</Alert>
            ) : (
              <Alert type='success'>
                This rental has been successfully paid.
              </Alert>
            )}
          </div>

          <SummaryCard
            dailyRentalRate={vehicle_daily_rental_rate}
            daysOfRental={numberOfDays}
            securityDeposit={vehicle_security_amount}
            couponDiscountAmount={discount_amount}
            renderButton={({ amount }) => {
              if (!/succeeded/gi.test(payment_status)) {
                return <RazorpayButton amountInInr={amount} />;
              }

              const todayDateTime = new Date();
              if (
                todayDateTime > new Date(booking_date) &&
                !rental_completion_date
              ) {
                return (
                  <Button
                    variant='accent'
                    title='Complete rental'
                    block
                    disabled={completeRentalLoading}
                    onClick={() => dispatch(action.completeRental({ id }))}
                  >
                    Return Vehicle
                  </Button>
                );
              }
              return null; // Render nothing if payment is succeeded and rental is completed.
            }}
          />
        </Grid>
      ) : null}
    </Container>
  );
};

export default RentalDetails;
