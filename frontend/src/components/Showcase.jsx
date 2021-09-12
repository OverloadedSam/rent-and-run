import React from 'react';
import { Grid, Media } from '../common';

const Showcase = () => (
  <section className='block block--dark block--skewed block-showcase'>
    <header className='block__header'>
      <h2 className='block__heading'>User-friendly Control Panel</h2>
    </header>

    <Grid layout='grid--1x2' className='container'>
      <picture className='block-showcase__image'>
        <source
          type='image/webp'
          srcSet='/assets/images/macbook.webp 1x, /assets/images/macbook@2x.webp 2x'
        />
        <source
          type='image/png'
          srcSet='/assets/images/macbook.png 1x, /assets/images/macbook@2x.png 2x'
        />
        <img src='/assets/images/macbook.png' alt='' />
      </picture>
      <ul className='list'>
        <li>
          <Media>
            <Media.Image>
              <svg className='icon icon--primary'>
                <use href='/assets/icons/crown.svg#crown' />
              </svg>
            </Media.Image>

            <Media.Body>
              <Media.Title>Luxury Cars</Media.Title>
              <Media.Description>
                We have wide range of luxury cars. Think about it and you will
                find it here.
              </Media.Description>
            </Media.Body>
          </Media>
        </li>
        <li>
          <Media>
            <Media.Image>
              <svg className='icon icon--primary'>
                <use href='/assets/icons/card.svg#card' />
              </svg>
            </Media.Image>

            <Media.Body>
              <Media.Title>Multiple Payment Methods</Media.Title>
              <Media.Description>
                Don&apos;t have a particular payment method? We accepts payments
                in multiple methods.
              </Media.Description>
            </Media.Body>
          </Media>
        </li>
        <li>
          <Media>
            <Media.Image>
              <svg className='icon icon--primary'>
                <use href='/assets/icons/coupon.svg#coupon' />
              </svg>
            </Media.Image>

            <Media.Body>
              <Media.Title>Coupon & More</Media.Title>
              <Media.Description>
                Time to time we release discount coupons. Have a coupon? Feel
                free to apply it.
              </Media.Description>
            </Media.Body>
          </Media>
        </li>
      </ul>
    </Grid>
  </section>
);

export default Showcase;
