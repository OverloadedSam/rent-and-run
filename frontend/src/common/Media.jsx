import React from 'react';

const Media = ({ ...props }) => (
  <div className={`media ${props.className || ''}`}>{props.children}</div>
);

const Image = ({ ...props }) => (
  <div className={`media__image ${props.className || ''}`}>
    {props.children}
  </div>
);

const Body = ({ ...props }) => (
  <div className={`media__body ${props.className || ''}`}>{props.children}</div>
);

const Title = ({ ...props }) => (
  <h3 className={`media__title ${props.className || ''}`}>{props.children}</h3>
);

const Description = ({ ...props }) => (
  <p className={`media__description ${props.className || ''}`}>
    {props.children}
  </p>
);

Media.Image = Image;
Media.Body = Body;
Media.Title = Title;
Media.Description = Description;

export default Media;
