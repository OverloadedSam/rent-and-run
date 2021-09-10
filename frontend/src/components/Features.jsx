import React from 'react';
import { Container, Grid } from '../common';

const Features = () => {
  const features = [
    {
      heading: 'Heading 1',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi veniam delectus sed, quia incidunt accusamus ipsam illo iure beataesaepe, numquam inventore doloribus ab totam quo dignissimos ipsumeveniet quidem atque? Optio, quasi earum.',
      imageUrl: 'https://source.unsplash.com/random/500x300',
    },
    {
      heading: 'Heading 2',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi veniam delectus sed, quia incidunt accusamus ipsam illo iure beataesaepe, numquam inventore doloribus ab totam quo dignissimos ipsumeveniet quidem atque? Optio, quasi earum.',
      imageUrl: 'https://source.unsplash.com/random/500x300',
    },
    {
      heading: 'Heading 3',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi veniam delectus sed, quia incidunt accusamus ipsam illo iure beataesaepe, numquam inventore doloribus ab totam quo dignissimos ipsumeveniet quidem atque? Optio, quasi earum.',
      imageUrl: 'https://source.unsplash.com/random/500x300',
    },
    {
      heading: 'Heading 4',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi veniam delectus sed, quia incidunt accusamus ipsam illo iure beataesaepe, numquam inventore doloribus ab totam quo dignissimos ipsumeveniet quidem atque? Optio, quasi earum.',
      imageUrl: 'https://source.unsplash.com/random/500x300',
    },
  ];

  return (
    <Container className='block'>
      <header className='block__header'>
        <h2 className='blok__heading'>Block Heading 0e4ac2</h2>
        <p className='block__content'>
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </p>
      </header>

      {features.map((feature, idx) => (
        <Grid layout='grid--1x2' className='feature' key={feature.heading}>
          <div className='feature__content'>
            <h3 className='feature__heading'>{feature.heading}</h3>
            <p>{feature.text}</p>
          </div>
          <img
            src={`${feature.imageUrl}?${idx + 1}`}
            alt='unsplash'
            className='feature__image'
          />
        </Grid>
      ))}
    </Container>
  );
};

export default Features;
