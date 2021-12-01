import React from 'react';
import { Badge, Card } from '../common';

const TeamMemberCard = (props) => {
  const { image, name, designation, socials, description } = props;
  return (
    <Card className='team-member'>
      <Card.Header>
        <div className='team-member__image'>
          <img src={image} alt={name} />
        </div>
      </Card.Header>
      <Card.Body>
        <h3 className='team-member__name'>{name}</h3>
        <span className='team-member__designation'>
          <Badge variant='badge--primary'>{designation}</Badge>
        </span>

        <div className='team-member__socials'>
          <a href={socials.facebook} target='_blank' rel='noreferrer'>
            <svg className='icon icon--secondary'>
              <use href='/assets/icons/sprite.svg#facebook' />
            </svg>
          </a>
          <a href={socials.twitter} target='_blank' rel='noreferrer'>
            <svg className='icon icon--secondary'>
              <use href='/assets/icons/sprite.svg#twitter' />
            </svg>
          </a>
          <a href={socials.instagram} target='_blank' rel='noreferrer'>
            <svg className='icon icon--secondary'>
              <use href='/assets/icons/sprite.svg#instagram' />
            </svg>
          </a>
        </div>
        <p className='team-member__description'>{description}</p>
      </Card.Body>
    </Card>
  );
};

TeamMemberCard.defaultProps = {
  socials: {
    facebook: 'https://fb.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
  },
};

export default TeamMemberCard;
