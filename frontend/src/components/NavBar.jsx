import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Dropdown } from '../common';

const NavBar = () => {
  const hamburger = useRef(null);
  const user = useSelector((state) => state.userLogin);

  const dropdownList = [
    {
      label: 'My Profile',
      to: '/profile',
      icon: 'profile.svg#user',
    },
    {
      label: 'Cart',
      to: '/cart',
      icon: 'cart.svg#cart',
    },
    {
      label: 'Log out',
      to: '/logout',
      icon: 'logout.svg#logout',
    },
  ];

  const handleToggle = () => {
    hamburger.current.classList.toggle('nav--expanded');
  };

  return (
    <nav ref={hamburger} className='navbar'>
      <NavLink className='nav__brand' to='/'>
        <img src='/assets/logo.png' alt='Rent and run' />
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
        {!user.isLoggedIn && (
          <li className='nav__item'>
            <NavLink to='/signin'>
              <Button variant='secondary' size='small'>
                Sign In
              </Button>
            </NavLink>
          </li>
        )}
        {user.isLoggedIn && (
          <li className='nav__item user-profile-btn'>
            <Dropdown label='More' list={dropdownList} />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
