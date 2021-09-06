import React, { useRef } from 'react';

const NavBar = () => {
  const hamburger = useRef(null);

  const handleToggle = () => {
    hamburger.current.classList.toggle('nav--expanded');
  };

  return (
    <nav ref={hamburger} className='navbar'>
      <a className='nav__brand' href='/'>
        <img src='assets/logo.png' alt='Rent and run' />
      </a>

      <div
        className='nav__toggler'
        onClick={handleToggle}
        role='menuitem'
        tabIndex={0}
      >
        <span />
        <span />
        <span />
        <span />
      </div>

      <ul className='list nav__list'>
        <li className='nav__item'>
          <a href='/'>Home</a>
        </li>
        <li className='nav__item'>
          <a href='/about'>About</a>
        </li>
        <li className='nav__item'>
          <a href='/vehicles'>Vehicles</a>
        </li>
        <li className='nav__item'>
          <a href='/policy'>Policy</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
