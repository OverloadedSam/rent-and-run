import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../common';
import { dateTime } from '../utils';

const CartProduct = ({ ...props }) => {
  const {
    id,
    vehicleName,
    vehicleImage,
    bookingDate,
    returningDate,
    dailyRentalRate,
    deleteItemHandler,
    rentalIndex,
  } = props;

  const rentalAmount = (
    dailyRentalRate * dateTime.calculateNumberOfDays(bookingDate, returningDate)
  ).toFixed(2);

  return (
    <Card className='cart-product'>
      <Card.Body>
        <div className='cart-product__image'>
          <img src={`/assets/images/vehicles/${vehicleImage}`} alt='nexon' />
        </div>

        <h3 className='cart-product__name'>
          <Link to={`/vehicle/${id}`}>{vehicleName}</Link>
        </h3>

        <ul className='list'>
          <li className='list-item'>Booking Date</li>
          <li className='list-item'>
            {new Date(bookingDate).toString().slice(0, 21)}
          </li>
          <li className='list-item'>Returning Date</li>
          <li className='list-item'>
            {new Date(returningDate).toString().slice(0, 21)}
          </li>
        </ul>
        <ul className='list'>
          <li className='list-item'>Rental Amount</li>
          <li className='list-item'>₹ {rentalAmount}</li>
        </ul>
        <div className='cart-product__button-container'>
          <Button
            as={Link}
            to='/checkout/coupon'
            state={{ rentalIndex }}
            variant='primary'
          >
            Checkout
          </Button>
          <svg
            className='icon icon--accent icon--small'
            onClick={(e) => deleteItemHandler(id, e)}
          >
            <use href='/assets/icons/delete.svg#delete' />
          </svg>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CartProduct;
