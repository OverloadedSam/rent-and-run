import React from 'react';

const Button = ({ ...props }) => {
  let { type, variant, size, block, stretched } = props;

  variant = variant && `btn--${variant}`;
  size = size && `btn--${size}`;
  block = block && 'btn--block';
  stretched = stretched && 'btn--stretched';

  return (
    <button
      className={`btn ${variant} ${size} ${block} ${stretched}`}
      type={type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  variant: 'btn--primary',
  size: '',
  block: '',
  stretched: '',
};

export default Button;
