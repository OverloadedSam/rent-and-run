import React from 'react';
import { Container, Grid } from '../common';

const Features = () => {
  const features = [
    {
      heading: 'Jaw Dropping Rates',
      text: 'Book car and bikes on rent in Delhi. We have the best daily rental rates. Our two wheeler vehicles start at just ₹ 500 /day.',
      icon: '/assets/icons/sprite.svg#money',
      image: {
        webp: ['/assets/images/rates.webp', '/assets/images/rates@2x.webp'],
        default: ['/assets/images/rates.jpg', '/assets/images/rates@2x.jpg'],
      },
    },
    {
      heading: 'Easy To Use',
      text: 'Renting made easy with Rent & Run. We design the application by keeping users in focus all the time. Every age of people can easily operate Rent & Run and can rent vehicles of their choices.',
      icon: '/assets/icons/sprite.svg#easy',
      image: {
        webp: ['/assets/images/easy.webp', '/assets/images/easy@2x.webp'],
        default: ['/assets/images/easy.jpg', '/assets/images/easy@2x.jpg'],
      },
    },
    {
      heading: 'Drop Anywhere',
      text: 'After you finished with your trip, You can choose a drop location in Delhi from where we can pick our vehicle and you do not need to worry about dropping vehicle at our place.',
      icon: '/assets/icons/sprite.svg#handover',
      image: {
        webp: [
          '/assets/images/handover.webp',
          '/assets/images/handover@2x.webp',
        ],
        default: [
          '/assets/images/handover.jpg',
          '/assets/images/handover@2x.jpg',
        ],
      },
    },
    {
      heading: '24x7 Support',
      text: 'We never let down any customer. We see our customers as invited guests to a party, and we are the hosts. It is our job to make the customer experience a little bit better.',
      icon: '/assets/icons/sprite.svg#support',
      image: {
        webp: ['/assets/images/support.webp', '/assets/images/support@2x.webp'],
        default: [
          '/assets/images/support.jpg',
          '/assets/images/support@2x.jpg',
        ],
      },
    },
  ];

  return (
    <Container className='block'>
      <header className='block__header'>
        <h2 className='block__heading'>Let&apos;s Change Travelling</h2>
        <p className='block__content'>
          Free yourself from the hassle of all those taxis and public
          transports.
        </p>
      </header>

      {features.map((feature) => (
        <Grid layout='grid--1x2' className='feature' key={feature.heading}>
          <div className='feature__content'>
            <div className='icon-container'>
              <svg className='icon icon--primary'>
                <use href={`${feature.icon}`} />
              </svg>
            </div>
            <h3 className='feature__heading'>{feature.heading}</h3>
            <p>{feature.text}</p>
          </div>
          <picture>
            <source
              type='image/webp'
              srcSet={`${feature.image.webp[0]} 1x, ${feature.image.webp[1]} 2x`}
            />
            <source
              type='image/jpg'
              srcSet={`${feature.image.default[0]} 1x, ${feature.image.default[1]} 2x`}
            />
            <img
              src={`${feature.image.default[0]}`}
              alt=''
              className='feature__image'
            />
          </picture>
        </Grid>
      ))}
    </Container>
  );
};

export default Features;
