import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '../common';

const Hero = () => (
  <section className='hero'>
    <div className='block hero__overlay'>
      <Grid layout='grid--1x2' className='container'>
        <header className='block__header hero__content'>
          <h1 className='block__heading hero__headline'>
            Ride it Like You Own it!
          </h1>
          <p className='hero__tagline'>
            Your satisfaction is our main aim, We make your drive memorable.
            Enjoy your holidays and trips with our wheels. Just Rent and Run!
          </p>
          <Button variant='accent' as={Link} to='/vehicles'>
            See Vehicles
          </Button>
        </header>
        <div />
      </Grid>
    </div>
  </section>
);

export default Hero;
