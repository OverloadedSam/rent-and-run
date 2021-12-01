import React from 'react';
import PropTypes from 'prop-types';
import Media from './Media';

const Quote = ({ ...props }) => (
  <blockquote className='quote'>
    <p className='quote__text'>{props.children}</p>
    <Media>
      <Media.Image className='quote__image'>
        <svg className='icon icon--primary'>
          <use href='/assets/icons/sprite.svg#line' />
        </svg>
      </Media.Image>
      <Media.Body>
        <Media.Title className='quote__author'>{props.author}</Media.Title>
        <Media.Description className='quote__organization'>
          {props.organization}
        </Media.Description>
      </Media.Body>
    </Media>
  </blockquote>
);

Quote.defaultProps = {
  children: '',
  author: '',
  organization: '',
};

Quote.propTypes = {
  children: PropTypes.string,
  author: PropTypes.string,
  organization: PropTypes.string,
};

export default Quote;
