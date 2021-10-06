import React from 'react';

const Select = ({ ...props }) => {
  const { id, label, error, options, hint, ...rest } = props;

  return (
    <>
      {label && (
        <label className='label' htmlFor={id}>
          {label}
        </label>
      )}
      {error && <div className='input-error'>{error}</div>}
      <div className='input-group'>
        <select id={id} name={id} className='select input' {...rest}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.text}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

Select.defaultProps = {
  error: null,
  options: [{ value: '', text: 'Select' }],
  hint: null,
};

export default Select;
