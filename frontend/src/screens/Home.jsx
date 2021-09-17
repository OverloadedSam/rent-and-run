import React from 'react';
import { useSelector } from 'react-redux';
import { Hero, Features, Showcase, Testimonial, Callout } from '../components';

const Home = () => {
  const user = useSelector((state) => state.userLogin);

  return (
    <>
      <Hero />
      <Features />
      <Showcase />
      <Testimonial />
      {!user.isLoggedIn && <Callout />}
    </>
  );
};
export default Home;
