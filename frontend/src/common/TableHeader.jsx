import React from 'react';

const TableHeader = ({ ...props }) => {
  const { columns, omitHeader } = props;

  if (omitHeader) return null;
  return (
    <thead className='table__header'>
      <tr className='table__row'>
        {columns.map((column) => (
          <th className='table__cell' key={column.label || column.key}>
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
