import React from 'react';
import { Container, Card, Grid, Quote } from '../common';

const Testimonial = () => (
  <section className='block'>
    <header className='block__header'>
      <h2 className='block__heading'>Our Customer Stories</h2>
      <p className='block__content'>Customer Service, We Make it Better!</p>
    </header>

    <Container>
      <Card className='testimonial'>
        <Grid layout='grid--1x2'>
          <div className='testimonial__image'>
            <img src='/assets/testimonial.jpg' alt='customer' />
            <span className='icon-container icon-container--accent'>
              <svg className='icon'>
                <use href='/assets/icons/quotes.svg#quote' />
              </svg>
            </span>
          </div>

          <Quote author='Chris Morris' organization='Traveller Guide'>
            Rent & Run is the best vehicle rental service. They have every type
            of vehicles to rent. Rental services way too good, best suited for
            road trips and holidays.
          </Quote>
        </Grid>
      </Card>
    </Container>
  </section>
);

export default Testimonial;
