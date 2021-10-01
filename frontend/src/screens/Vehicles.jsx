import React, { useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { vehicleActions as action } from '../redux/actions';
import { Container, Grid, Loader, Error } from '../common';
import { VehicleSearch, ProductCard } from '../components';

const Vehicles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const dispatch = useDispatch();
  const vehicles = useSelector((state) => state.vehicles);
  const { loading, error, success, data } = vehicles;

  useEffect(() => {
    dispatch(action.getVehiclesList(location.search));
  }, [location]);

  return (
    <Container className='block block-vehicles'>
      <header className='block__header'>
        <h2 className='block__heading'>Vehicles To Rent</h2>
      </header>

      <VehicleSearch
        bookingDate={searchParams.get('bookingDate')}
        returningDate={searchParams.get('returningDate')}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        loading={loading}
      />

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
