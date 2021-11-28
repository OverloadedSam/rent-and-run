import React from 'react';
import { Button, Badge, Container, Grid } from '../common';
import { Hero, TeamMemberCard } from '../components';

const About = () => {
  const headline = 'We Make Journey Easy';
  const tagline = 'Cars, Bikes, ATVs name it we have it...';

  const teamMembers = [
    {
      image: '/assets/images/team/teena.jpg',
      name: 'Teena Rohan',
      designation: 'Director',
      description:
        'To be a excellent director, you have to have good life experience. I am getting there day by day.',
    },
    {
      image: '/assets/images/team/harshit.jpg',
      name: 'Harshit Teja',
      designation: 'Brand Expert',
      description:
        'A brand for a company is like a reputation for a person. You earn reputation by trying to do hard things well.',
    },
    {
      image: '/assets/images/team/vikram.jpg',
      name: 'Vikram',
      designation: 'Quality analyst',
      description:
        'Quality means doing it right when no one is looking and I always improving the quality.',
    },
    {
      image: '/assets/images/team/naveen.jpg',
      name: 'Naveen Alex',
      designation: 'Service Advisor',
      description:
        'I like to listen. I have learned a great deal from listening carefully. I am keen to serve our customers.',
    },
    {
      image: '/assets/images/team/pragati.jpg',
      name: 'Pragati Sehgal',
      designation: 'CA',
      description:
        'I am involved in finance, which is fun and, sometimes, very painful. I make easy life of people with my finance knowledge',
    },
    {
      image: '/assets/images/team/sam.jpg',
      name: 'Sam',
      designation: 'Software Dev',
      description:
        ' The computer was born to solve problems that did not exist before. Solving problems with computers is my daily business.',
    },
  ];

  return (
    <>
      <Hero
        className='about'
        headline={headline}
        tagline={tagline}
        renderElement={() => (
          <Button as='a' variant='secondary' href='#about'>
            Scroll Down
          </Button>
        )}
      />

      <Container className='block block-about'>
        <header className='block__header' id='about'>
          <h2 className='block__heading'>About Us</h2>
          <p className='block__content'>
            This is our tiny little{' '}
            <Badge variant='badge--primary'>story</Badge>
          </p>
        </header>

        <Grid layout='grid--1x2'>
          <div>
            <p>
              Welcome to Rent & Run, your number one source for renting
              vehicles. We are dedicated to giving you the very best of vehicle
              renting services, with a focus on easy to book vehicles online.
            </p>
            <p>
              Founded in June 2018 by Sam, Rent & Run has come a long way from
              its beginnings in Delhi. When Sam first started out, their passion
              for solving problem of vehicle renting drove them to start their
              own business and as result of this Rent & Run was born.
            </p>
          </div>
          <div>
            <p>
              Today Rent & Run is providing its vehicle renting services all
              over delhi region. Here you will find almost any type of vehicle
              like bikes for off road biking, for casual drives, cars for picnic
              and luxury card for special moments of your life and even you will
              find mini buses or ATVs.
            </p>
            <p>
              We hope you enjoy our services as much as we enjoy offering them
              to you. If you have any questions or suggestions, please do not
              hesitate to contact us. We would love to listen from you!
            </p>
          </div>
        </Grid>
      </Container>

      <Container className='block block-team'>
        <header className='block__header'>
          <h2 className='block__heading'>Our Team</h2>
          <p className='block__content'>
            The team that is crazy about serving{' '}
            <Badge variant='badge--secondary'>you</Badge>
          </p>
        </header>

        <Grid layout='grid--1x2 grid--1x3'>
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.name + member.designation}
              image={member.image}
              name={member.name}
              designation={member.designation}
              description={member.description}
            />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default About;
