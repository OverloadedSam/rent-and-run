import React from 'react';

const Badge = ({ variant, size, children }) => (
  <span className={`badge ${variant} ${size || ''}`}>{children}</span>
);

export default Badge;
