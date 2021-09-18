import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dropdown = ({ ...props }) => {
  const { label, to, list } = props;

  const dropdown = useRef(null);
  const navigate = useNavigate();

  const handleExpand = (e) => {
    dropdown.current.classList.toggle('dropdown--expanded');
    e.target.classList.toggle('active');
  };

  const handleBlur = (e) => {
    if (dropdown.current.contains(e.relatedTarget)) {
      navigate(`${e.relatedTarget.getAttribute('href')}`);
    }
    e.target.classList.remove('active');
    return dropdown.current.classList.remove('dropdown--expanded');
  };

  const renderList = (links) => {
    const renderedList = links.map((link) => (
      <li key={link.label} className='dropdown__list-item'>
        {link.icon && (
          <div className='icon-container'>
            <svg className='icon'>
              <use href={`/assets/icons/${link.icon}`} />
            </svg>
          </div>
        )}
        <Link to={link.to}>{link.label}</Link>
      </li>
    ));
    return renderedList;
  };

  return (
    <div className='dropdown' ref={dropdown}>
      <Link
        to={to || '#'}
        className='dropdown__link'
        onClick={handleExpand}
        onBlur={handleBlur}
      >
        {label}
        <svg className='icon'>
          <use href='/assets/icons/triangle.svg#triangle' />
        </svg>
      </Link>

      {list && (
        <div className='dropdown__menu'>
          <ul className='dropdown__list'>{renderList(list)}</ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
