import React from 'react';
import { Card, Button } from '../common';

const ProductCard = ({ ...props }) => {
  const { brand, model_name, images, daily_rental_rate } = props;

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
        <Button variant='accent' size='small'>
          Book Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
