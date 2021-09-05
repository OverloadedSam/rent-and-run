import React from 'react';

const Grid = ({ ...props }) => (
  <div className={`grid ${props.layout}`}>{props.children}</div>
);
Grid.defaultProps = { layout: '' };

export default Grid;
