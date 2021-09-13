import React from 'react';
import PropType from 'prop-types';

const Button = (props) => {
  let {
    as: Component,
    children,
    type,
    variant,
    size,
    block,
    stretched,
    ...rest
  } = props;

  variant = variant && `btn--${variant}`;
  size = size && `btn--${size}`;
  block = block && 'btn--block';
  stretched = stretched && 'btn--stretched';

  return (
    <Component
      className={`btn ${variant} ${size} ${block} ${stretched}`}
      type={type}
      {...rest}
    >
      {children}
    </Component>
  );
};

Button.propTypes = {
  type: PropType.oneOf(['button', 'submit', 'reset']),
  variant: PropType.oneOf(['primary', 'secondary', 'accent', 'outline']),
  size: PropType.oneOf(['small', '']),
};

Button.defaultProps = {
  type: 'button',
  variant: 'primary',
  size: '',
  block: '',
  stretched: '',
  as: 'button',
};

export default Button;
