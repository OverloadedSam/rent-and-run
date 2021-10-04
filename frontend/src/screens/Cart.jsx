import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions as actions } from '../redux/actions';
import { Container, Grid } from '../common';
import { CartProduct } from '../components';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const { vehicleId } = useParams();
  const [searchParams] = useSearchParams();

  const bookingDate = searchParams.get('bookingDate');
  const returningDate = searchParams.get('returningDate');

  const handleDeleteItem = (id) => {
    dispatch(actions.deleteItemFromCart({ id }));
  };

  useEffect(() => {
    if (bookingDate && returningDate && vehicleId) {
      const payload = { vehicleId, bookingDate, returningDate };
      dispatch(actions.addToCart(payload));
    }
  }, [bookingDate, returningDate, vehicleId]);

  return (
    <Container className='block block-cart'>
      <header className='block__header'>
        <h2 className='block__heading'>Cart</h2>
      </header>

      <Grid layout='grid--1x2'>
        {cartItems.map((item) => (
          <CartProduct
            key={item.id}
            deleteItemHandler={handleDeleteItem}
            {...item}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default Cart;
