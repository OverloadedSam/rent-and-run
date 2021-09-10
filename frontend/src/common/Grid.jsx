import React from 'react';

const Grid = ({ ...props }) => (
  <div className={`grid ${props.layout} ${props.className}`}>
    {props.children}
  </div>
);

Grid.defaultProps = { layout: '', className: '' };

export default Grid;
