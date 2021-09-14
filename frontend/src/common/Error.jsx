import React from 'react';
import Container from './Container';

const Error = ({ ...props }) => (
  <Container className={`error ${props.className}`}>
    <h3 className='error__heading'>{props.errorHeading || 'Aw, Snap !!'} </h3>
    <p className='error__message'>
      {props.errorMessage || 'Something went wrong. Please try again later.'}
    </p>
  </Container>
);

export default Error;
