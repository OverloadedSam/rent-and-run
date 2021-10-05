import React from 'react';

const Alert = (props) => {
  const { type, children } = props;
  return <p className={`alert alert--${type}`}>{children}</p>;
};

Alert.defaultProps = {
  children: 'Alert!',
  type: 'danger',
};

export default Alert;
