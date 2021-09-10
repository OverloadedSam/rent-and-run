import React from 'react';
import { Grid, Media } from '../common';

const Showcase = () => (
  <section className='block block--dark block--skewed block-showcase'>
    <header className='block__header'>
      <h2 className='block__heading'>Lorem ipsum dolor sit amet.</h2>
    </header>

    <Grid layout='grid--1x2' className='container'>
      <picture className='block-showcase__image'>
        <img src='https://source.unsplash.com/random/500x500' alt='unsplash' />
      </picture>
      <ul className='list'>
        <li>
          <Media>
            <Media.Image>
              <img src='/assets/icons/chevron.svg' alt='' />
            </Media.Image>

            <Media.Body>
              <Media.Title>Title</Media.Title>
              <Media.Description>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
                dolorum doloribus eaque excepturi ea eveniet optio? Labore
                perferendis reiciendis tenetur.
              </Media.Description>
            </Media.Body>
          </Media>
        </li>
        <li>
          <Media>
            <Media.Image>
              <img src='/assets/icons/chevron.svg' alt='' />
            </Media.Image>

            <Media.Body>
              <Media.Title>Title</Media.Title>
              <Media.Description>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
                dolorum doloribus eaque excepturi ea eveniet optio? Labore
                perferendis reiciendis tenetur.
              </Media.Description>
            </Media.Body>
          </Media>
        </li>
        <li>
          <Media>
            <Media.Image>
              <img src='/assets/icons/chevron.svg' alt='' />
            </Media.Image>

            <Media.Body>
              <Media.Title>Title</Media.Title>
              <Media.Description>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
                dolorum doloribus eaque excepturi ea eveniet optio? Labore
                perferendis reiciendis tenetur.
              </Media.Description>
            </Media.Body>
          </Media>
        </li>
      </ul>
    </Grid>
  </section>
);

export default Showcase;
