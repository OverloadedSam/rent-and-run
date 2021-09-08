import React from 'react';
import { Container, Collapsible } from '../common';

const Footer = () => (
  <footer className='block footer'>
    <Container>
      <div className='footer__sections'>
        <section className='footer__section'>
          <Collapsible heading='Services' expanded>
            <ul className='list'>
              <li>
                <a href='/vehicles'>Rent Vehicles</a>
              </li>
              <li>
                <a href='/'>Buy & Sell Vehicles</a>
              </li>
              <li>
                <a href='/'>Vehicle Care</a>
              </li>
            </ul>
          </Collapsible>
        </section>
        <section className='footer__section'>
          <Collapsible heading='Products'>
            <ul className='list'>
              <li>
                <a href='/'>Car Accessories</a>
              </li>
              <li>
                <a href='/'>Bike Riding Gears</a>
              </li>
              <li>
                <a href='/'>Customizations</a>
              </li>
            </ul>
          </Collapsible>
        </section>
        <section className='footer__section'>
          <Collapsible heading='Company'>
            <ul className='list'>
              <li>
                <a href='/'>About</a>
              </li>
              <li>
                <a href='/'>Affiliates</a>
              </li>
              <li>
                <a href='/'>Policy</a>
              </li>
              <li>
                <a href='/'>Careers</a>
              </li>
            </ul>
          </Collapsible>
        </section>
        <section className='footer__section'>
          <Collapsible heading='Support'>
            <ul className='list'>
              <li>
                <a href='/'>FAQs</a>
              </li>
              <li>
                <a href='/'>Contact</a>
              </li>
              <li>
                <a href='/'>Forums</a>
              </li>
              <li>
                <a href='/'>Report A Problem</a>
              </li>
            </ul>
          </Collapsible>
        </section>
        <section className='footer__brand'>
          <img src='/assets/logo.png' alt='Rent and run' />
          <p className='footer__copyright'>&copy; Copyright 2021 Rent & Run.</p>
        </section>
      </div>
    </Container>
  </footer>
);

export default Footer;
