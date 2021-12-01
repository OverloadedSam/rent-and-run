import React, { useRef } from 'react';

const Collapsible = ({ ...props }) => {
  const { expanded, heading, children, className } = props;

  const toggle = useRef(null);

  const handleToggle = () => {
    toggle.current.classList.toggle('collapsible--expanded');
  };

  return (
    <div
      ref={toggle}
      className={
        `collapsible ${expanded ? 'collapsible--expanded' : ''}` +
        ` ${className || ''}`
      }
    >
      <div className='collapsible__header'>
        <h2 className='collapsible__heading'>{heading}</h2>
        <div>
          <svg className='icon collapsible__toggler' onClick={handleToggle}>
            <use href='/assets/icons/sprite.svg#chevron' />
          </svg>
        </div>
      </div>
      <div className='collapsible__content'>{children}</div>
    </div>
  );
};

export default Collapsible;
