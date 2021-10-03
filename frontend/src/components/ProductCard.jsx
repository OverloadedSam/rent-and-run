import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../common';

const ProductCard = ({ ...props }) => {
  const {
    id,
    brand,
    model_name,
    images,
    daily_rental_rate,
    bookingDate,
    returningDate,
  } = props;

  const url = `/vehicle/${id}${
    bookingDate && returningDate
      ? `?bookingDate=${bookingDate}&returningDate=${returningDate}`
      : ``
  }`;

  return (
    <Card className='product'>
      <Card.Header>
        <div className='product__image'>
          <img src={`/assets/images/vehicles/${images}`} alt={`${images}`} />
        </div>
        <span className='product__name'>{`${brand} ${model_name}`}</span>
      </Card.Header>
      <Card.Body className='product__body'>
        <span className='product__rate'>
          @{` ₹${daily_rental_rate}`}
          <span> /Day</span>
        </span>
        <Link to={url}>
          <Button variant='accent' size='small'>
            Book Now
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
