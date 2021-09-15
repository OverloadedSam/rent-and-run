import React from 'react';

const Input = (props) => {
  const { id, label, error, groupElement, hint, ...rest } = props;
  return (
    <>
      {label && (
        <label className='label' htmlFor={id}>
          {label}
        </label>
      )}
      {error && <div className='input-error'>{error}</div>}
      <div className='input-group'>
        {groupElement && groupElement.left}
        <input id={id} name={id} className='input' {...rest} />
        {groupElement && groupElement.right}
      </div>
    </>
  );
};

Input.defaultProps = {
  groupElement: {
    left: null,
    right: null,
  },
  error: null,
  placeholder: '',
  type: 'text',
  hint: null,
};

export default Input;
