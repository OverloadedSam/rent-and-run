import React from 'react';
import { Card, Button } from '../common';

const ProductCard = ({ ...props }) => {
  const { id, brand, model_name, images, daily_rental_rate } = props;

  return (
    <div style={{ width: '33%', margin: '5rem' }}>
      <Card className='product' id={id}>
        <Card.Header>
          <div className='product__image'>
            <img src={`${images}`} alt={`${images}`} />
          </div>
          <span className='product__name'>{`${brand} ${model_name}`}</span>
        </Card.Header>
        <Card.Body className='product__body'>
          <span className='product__rate'>
            @{` ₹ ${daily_rental_rate}`}
            <span> /Day</span>
          </span>
          <Button variant='accent' size='small'>
            Book Now
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

ProductCard.defaultProps = {
  id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
  brand: 'Lamborghini',
  model_name: 'Huracan',
  images: 'https://source.unsplash.com/random',
  daily_rental_rate: 1234,
};

export default ProductCard;
