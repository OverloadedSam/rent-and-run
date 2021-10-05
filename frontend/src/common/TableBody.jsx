import React from 'react';

const TableBody = ({ ...props }) => {
  const { columns, data } = props;

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return item[column.path];
  };

  const createKey = (item, column) => item.id + (column.path || column.key);

  return (
    <tbody>
      {data.map((item) => (
        <tr className='table__row' key={item.id}>
          {columns.map((column) => (
            <td className='table__cell' key={createKey(item, column)}>
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
