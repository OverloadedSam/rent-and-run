import React from 'react';
import { Grid } from '../common';

const Hero = ({ headline, tagline, renderElement, className }) => (
  <section className={`hero ${className || ''}`}>
    <div className='block hero__overlay'>
      <Grid layout='grid--1x2' className='container'>
        <header className='block__header hero__content'>
          <h1 className='block__heading hero__headline'>{headline}</h1>
          <p className='hero__tagline'>{tagline}</p>
          {renderElement ? renderElement() : null}
        </header>
        <div />
      </Grid>
    </div>
  </section>
);

export default Hero;
