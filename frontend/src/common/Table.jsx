import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = ({ ...props }) => {
  const {
    data,
    columns,
    omitHeader,
    striped,
    hover,
    compact,
    textCenter,
    className,
  } = props;
  const stripe = striped ? 'table--striped' : '';
  const hoverEffect = hover ? 'table--hover' : '';
  const compactTable = compact ? 'table--compact' : '';
  const textAlignment = textCenter ? 'table--text-center' : 'table--text-left';

  const tableClassName = `table ${stripe} ${hoverEffect} ${compactTable} ${textAlignment} ${className}`;

  return (
    <table className={tableClassName}>
      <TableHeader omitHeader={omitHeader} columns={columns} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
