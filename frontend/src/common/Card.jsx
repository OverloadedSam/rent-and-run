import React from 'react';

const Card = ({ ...props }) => {
  let { variant, children } = props;
  variant = variant && `card--${variant}`;

  return <div className={`card ${variant}`}>{children}</div>;
};

const CardHeader = ({ children }) => (
  <header className='card__header'>{children}</header>
);

const CardBody = ({ children }) => <div className='card__body'>{children}</div>;

Card.Body = CardBody;
Card.Header = CardHeader;

Card.defaultProps = { variant: '' };

export default Card;
