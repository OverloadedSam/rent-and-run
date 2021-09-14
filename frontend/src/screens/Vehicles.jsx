import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vehicleActions as action } from '../redux/actions';
import { Container, Grid, Loader, Error } from '../common';
import { ProductCard } from '../components';

const Vehicles = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector((state) => state.vehicles);
  const { loading, error, success, data } = vehicles;
  useEffect(() => {
    dispatch(action.getVehiclesList());
  }, []);

  return (
    <Container className='block block-vehicles'>
      <header className='block__header'>
        <h2 className='block__heading'>Vehicles To Rent</h2>
      </header>

      {loading ? (
        <Loader />
      ) : error ? (
        <Error {...error} />
      ) : success ? (
        <Grid layout='grid--1x3'>
          {data.map((vehicle) => (
            <ProductCard key={vehicle.id} {...vehicle} />
          ))}
        </Grid>
      ) : null}
    </Container>
  );
};

export default Vehicles;
