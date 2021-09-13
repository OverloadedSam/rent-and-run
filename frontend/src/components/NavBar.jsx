import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const hamburger = useRef(null);

  const handleToggle = () => {
    hamburger.current.classList.toggle('nav--expanded');
  };

  return (
    <nav ref={hamburger} className='navbar'>
      <NavLink className='nav__brand' to='/'>
        <img src='assets/logo.png' alt='Rent and run' />
      </NavLink>

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
          <NavLink to='/'>Home</NavLink>
        </li>
        <li className='nav__item'>
          <NavLink to='/about'>About</NavLink>
        </li>
        <li className='nav__item'>
          <NavLink to='/vehicles'>Vehicles</NavLink>
        </li>
        <li className='nav__item'>
          <NavLink to='/policy'>Policy</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
