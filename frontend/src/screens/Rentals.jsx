import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { rentalActions as action } from '../redux/actions';
import { Container, Loader, Error, Table } from '../common';

const Rentals = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    success,
    data: rentals,
  } = useSelector((state) => state.rentals);

  const columns = [
    {
      label: 'Vehicle',
      key: 1,
      content: useCallback(
        (item) => (
          <Link to={`/vehicle/${item.vehicle_id}`}>
            {item.vehicle_brand} {item.vehicle_model_name}
          </Link>
        ),
        []
      ),
    },
    {
      label: 'Booking',
      key: 2,
      content: useCallback(
        (item) => new Date(item.booking_date).toString().slice(4, 21),
        []
      ),
    },
    {
      label: 'Returning',
      key: 3,
      content: useCallback(
        (item) => new Date(item.returning_date).toString().slice(4, 21),
        []
      ),
    },
    {
      label: 'Total Amount',
      key: 4,
      content: useCallback((item) => {
        const { rent_amount, discount_amount } = item;
        return `₹ ${Number(rent_amount) + Number(discount_amount)}`;
      }, []),
    },
    {
      label: 'Payment',
      key: 5,
      content: useCallback((item) => {
        const isPaid = /succeeded/gi.test(item.payment_status);
        return (
          <span title={item.payment_status}>
            <svg
              className={`icon icon--small icon--${
                isPaid ? 'success' : 'accent'
              }`}
            >
              <use
                href={`/assets/icons/${
                  isPaid ? 'check.svg#check' : 'cross.svg#cross'
                }`}
              />
            </svg>
          </span>
        );
      }, []),
    },
    {
      label: 'Info',
      key: 6,
      content: useCallback(
        (item) => (
          <Link title='More details' to={`/rental/${item.id}`}>
            <svg className='icon icon--headings'>
              <use href='/assets/icons/info.svg#info' />
            </svg>
          </Link>
        ),
        []
      ),
    },
  ];

  useEffect(() => {
    dispatch(action.getRentalsList());
  }, []);

  return (
    <Container className='block'>
      <header className='block__header'>
        <h2 className='block__heading'>All Your Rentals</h2>
      </header>

      {loading ? (
        <Loader />
      ) : error ? (
        <Error {...error} />
      ) : success ? (
        <section className='overflow-x'>
          <Table
            className='rentals-table'
            columns={columns}
            data={rentals}
            textCenter
            striped
            hover
          />
        </section>
      ) : null}
    </Container>
  );
};

export default Rentals;
