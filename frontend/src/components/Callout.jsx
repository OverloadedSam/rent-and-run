import React from 'react';
import { Container, Grid, Button } from '../common';

const Callout = () => (
  <Container className='callout'>
    <Grid layout='grid--1x2'>
      <div className='callout__content'>
        <h2 className='callout__heading'>Ready To Get Started?</h2>
        <p>
          Sign up now to get 10% off on your first rental. Easily rent bikes and
          cars of your own choice at decent rental rates. Hurry up! the offer
          will be valid for short period.
        </p>
      </div>
      <Button variant='secondary' type='button' stretched>
        Sign Up
      </Button>
    </Grid>
  </Container>
);
export default Callout;
