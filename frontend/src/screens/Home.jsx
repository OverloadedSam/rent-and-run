import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '../common';
import { Hero, Features, Showcase, Testimonial, Callout } from '../components';

const Home = () => {
  const user = useSelector((state) => state.userLogin);
  const headline = 'Ride it Like You Own it!';
  const tagline =
    'Your satisfaction is our main aim, We make your drive memorable. Enjoy your holidays and trips with our wheels. Just Rent and Run!';

  return (
    <>
      <Hero
        headline={headline}
        tagline={tagline}
        renderElement={() => (
          <Button variant='accent' as={Link} to='/vehicles'>
            See Vehicles
          </Button>
        )}
      />
      <Features />
      <Showcase />
      <Testimonial />
      {!user.isLoggedIn && <Callout />}
    </>
  );
};
export default Home;
