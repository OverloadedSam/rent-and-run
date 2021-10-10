import React from 'react';
import { Container, StepCounter, Grid, Table, Alert } from '../common';
import SummaryCard from '../components/SummaryCard';

const PlaceRental = () => {
  const activeStepNumber = 3;
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

  const data = [
    {
      id: '1',
      key: 'Order Id',
      value: '1awe-687a-de5c-fa87-566a-ba78',
    },
    {
      id: '2',
      key: 'Vehicle',
      value: 'Royal Enfield Meteor 350',
    },
    {
      id: '3',
      key: 'Booking Date',
      value: 'Sun May 01 2021 20:53',
    },
    {
      id: '4',
      key: 'Returning Date',
      value: 'Sun May 06 2021 09:00',
    },
    {
      id: '5',
      key: 'Days',
      value: '3 Days',
    },
    {
      id: '6',
      key: 'Coupon',
      value: 'RIDER500',
    },
    {
      id: '7',
      key: 'Drop Location',
      value: 'Old Delhi street no.2, Near by shine Electronics, PIN - 110006',
    },
  ];

  return (
    <Container className='block block-checkout block-rental-details'>
      <StepCounter totalSteps={3} activeStepNumber={activeStepNumber} />
      <header className='block__header'>
        <h2 className='block__heading'>Review and Place Rental</h2>
      </header>

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
            columns={[{ label: 'Payment Method' }, { label: 'PayPal' }]}
            data={[]}
          />
          <Alert type='danger'>Payment is pending.</Alert>
          <Alert type='success'>Paid At Sun May 04 2022 09:00</Alert>
        </div>

        <SummaryCard />
      </Grid>
    </Container>
  );
};

export default PlaceRental;
