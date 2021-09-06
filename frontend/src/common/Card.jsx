import React from 'react';

const Card = ({ ...props }) => {
  let { variant, children } = props;
  variant = variant && `card--${variant}`;

  return (
    <div className={`card ${variant} ${props.className || ''}`}>{children}</div>
  );
};

const CardHeader = ({ ...props }) => (
  <header className={`card__header ${props.className || ''}`}>
    {props.children}
  </header>
);

const CardBody = ({ ...props }) => (
  <div className={`card__body ${props.className || ''}`}>{props.children}</div>
);

Card.Body = CardBody;
Card.Header = CardHeader;

Card.defaultProps = { variant: '' };

export default Card;
