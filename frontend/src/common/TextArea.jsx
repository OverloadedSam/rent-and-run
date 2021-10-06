import React from 'react';

const TextArea = (props) => {
  const { id, label, cols, rows, error, hint, ...rest } = props;
  return (
    <>
      {label && (
        <label className='label' htmlFor={id}>
          {label}
        </label>
      )}
      {error && <div className='input-error'>{error}</div>}
      <div className='input-group'>
        <textarea
          name={id}
          id={id}
          cols={cols || '30'}
          rows={rows || '10'}
          className='textarea input'
          {...rest}
        />
      </div>
    </>
  );
};

TextArea.defaultProps = {
  error: null,
  hint: null,
  placeholder: '',
};

export default TextArea;
