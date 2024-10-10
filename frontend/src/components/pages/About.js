import React from 'react';
import './Styles.css';
import AboutImageList from '../pages-content/AboutImageList';

export const About = () => {
  return (
    <div className="aboutContainer">
      <div className="aboutInfo">
        <div className="aboutTitle">
          <h1>About </h1>
        </div>
        <div className="aboutContent">
          <p>
            Cooking should be enjoyable and accessible to everyone, regardless of their measurement
            preferences.
          </p>
          <p>
            Our web app is designed with a single focus: to help you convert measurement types for
            recipes effortlessly.
          </p>
          <p>
            Our team is passionate about cooking and believes that good food brings people together.
            We aim to bridge the gap between different measurement systems, ensuring that you can
            find comfort in your favorite recipes, no matter where you are in the world.
          </p>
        </div>
      </div>
      <div className='aboutImageList'>
        <AboutImageList />
      </div>
    </div>
  );
};
