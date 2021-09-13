import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Collapsible } from '../common';

const Footer = () => (
  <footer className='block footer'>
    <Container>
      <div className='footer__sections'>
        <section className='footer__section'>
          <Collapsible heading='Services' expanded>
            <ul className='list'>
              <li>
                <Link to='/vehicles'>Rent Vehicles</Link>
              </li>
              <li>
                <Link to='/'>Buy & Sell Vehicles</Link>
              </li>
              <li>
                <Link to='/'>Vehicle Care</Link>
              </li>
            </ul>
          </Collapsible>
        </section>
        <section className='footer__section'>
          <Collapsible heading='Products'>
            <ul className='list'>
              <li>
                <Link to='/'>Car Accessories</Link>
              </li>
              <li>
                <Link to='/'>Bike Riding Gears</Link>
              </li>
              <li>
                <Link to='/'>Customizations</Link>
              </li>
            </ul>
          </Collapsible>
        </section>
        <section className='footer__section'>
          <Collapsible heading='Company'>
            <ul className='list'>
              <li>
                <Link to='/about'>About</Link>
              </li>
              <li>
                <Link to='/'>Affiliates</Link>
              </li>
              <li>
                <Link to='/policy'>Policy</Link>
              </li>
              <li>
                <Link to='/'>Careers</Link>
              </li>
            </ul>
          </Collapsible>
        </section>
        <section className='footer__section'>
          <Collapsible heading='Support'>
            <ul className='list'>
              <li>
                <Link to='/'>FAQs</Link>
              </li>
              <li>
                <Link to='/'>Contact</Link>
              </li>
              <li>
                <Link to='/'>Forums</Link>
              </li>
              <li>
                <Link to='/'>Report A Problem</Link>
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
