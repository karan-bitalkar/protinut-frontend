import React, { useEffect } from 'react';
import AboutUs from '../AboutUs';
import WhyProtinut from '../WhyProtinut';
import Testimonials from '../Testimonials';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="about-page">
      <AboutUs />
      <WhyProtinut />
      <Testimonials />
    </div>
  );
};

export default AboutPage;
